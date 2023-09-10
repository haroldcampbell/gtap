import {
    pointNode,
    line,
} from '../nodes/gtap-nodes';

import {
    actionsRunner,
    createVisual,
} from './create-visual'

import {
    $collectTuples
} from '../data/data-utils'

export const $lines = function (data, actionsArray, options = {}) {
    let lineNodes = [];
    let pointNodes = [];
    let visual = createVisual();

    const pointConnector = {
        true: () => createConnectedLines(visual.container, lineNodes, pointNodes),
        false: () => lineNodes.map((lineSVGShape, index) => createLines(lineSVGShape, pointNodes[index])),
    };

    const isDrawingConnectedLines = (options) => {
        if (options == undefined) return false;
        return options.isConnected == undefined ? false : options.isConnected;
    }

    // #TODO: This is a hack.
    visual.getPointNodes = () => pointNodes;

    // change the shape creator for the visual to a custom shape creator
    // that exits if the data has less than 3 data points.
    visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
        const data = visual.getData();
        const maxConnectedItems = data.activeDataItems().length - 1;

        data.activeDataItems().forEach((d, index) => {
            const rawDataItem = data.rawDataItem(index);
            let svgShape = visual.__createSVGShapeCallback(visual.container);

            visual.__saveSVGShape(svgShape);
            visual.__saveSVGShapeData(svgShape, index, d, rawDataItem);

            pointNodes.push(svgShape);

            if (isDrawingConnectedLines(options) && index >= maxConnectedItems) {
                return; // Only create n-1 for connected items
            }

            const lineSVGShape = line(svgShape.$parentElm)
            lineSVGShape.$class('line')
            lineNodes.push(lineSVGShape);
        });
    });

    visual.onFinalizeRender = () => {
        visual.shapeNodes = pointConnector[isDrawingConnectedLines(options)]();
        if (options.pointActions != undefined) actionsRunner(visual, pointNodes, options.pointActions || []);
    };

    visual.withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            const node = pointNode(container);
            /* We only need the point nodes so that we can
            apply the calculations based on the effects. */
            node.$x(0);
            node.$y(0);

            return node
        });

    return visual;
}

function createConnectedLines(container, lineNodes, pointNodes) {
    const tuples = $collectTuples(pointNodes, 2, (item, index) => {
        return {
            pointNode: item,
            point: item.$toPoint(),
            index: index,
        }
    })


    return tuples.map((tupleNodes, index) => {
        const point1 = tupleNodes[0].pointNode.$toPoint();
        const point2 = tupleNodes[1].pointNode.$toPoint();
        const lineNode = lineNodes[index];

        lineNode.$point1(point1.x, point1.y);
        lineNode.$point2(point2.x, point2.y);

        return lineNode;
    });
}

function createLines(lineNode, pointNode) {
    lineNode.$x1(pointNode.$x());
    lineNode.$y1(pointNode.$y());
    lineNode.$x2(pointNode.$x() + pointNode.$width());
    lineNode.$y2(pointNode.$y() + pointNode.$height());

    return lineNode;
}