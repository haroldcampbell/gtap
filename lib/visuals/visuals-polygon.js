import {
    path,
    pointNode,
} from '../nodes/gtap-nodes';

import {
    actionsRunner,
    createVisual,
} from './create-visual'

/**
 *  Creates a polygon with a series of points.
 *
 *  The Polygon is a group of  points radiating from the center.
 *  The radius or span can be represented by the data.
 *
 *  Note: The style intents don't currently work on this visual.
 *
 *  @typedef {Object} $polygon
 *
 *  @param {Object} data
 *  @param {Array} actionsArray - array of actions
 *  @param {Object} options
 *          Parameters include:
 *              {Number} curveLength - controls the size of the curve; 0 is the default.
 *              {Boolean} isClosed - true to connect the last point of the polygon to the first
 *              {String} style - css config string
 *              {Boolean} isSmooth - true to use a bezier path, otherwise just connects the points; true is the default.
 *                  When set to false, the curveLength and isClosed have no effect.
 *              {Boolean} isDiscontinuous - true to allow chart to be discontinuous; false is the default.
 *                  This only works when isSmooth is false.
 *              {Array} pointNodeActions - list of actions to be run after the path has been rendered using the points within the path
 *
 *  @return {Object}
 */
export const $polygon = function (data, actionsArray, options = { curveLength: 0 }) {
    /** @type {path} */
    let pathNode;
    let pointNodes = [];
    let visual = createVisual();


    // #TODO: This is a hack.
    visual.getPointNodes = () => pointNodes;

    // change the shape creator for the visual to a custom shape creator
    // that exits if the data has less than 3 data points.
    visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
        const data = visual.getData();

        if (data.activeDataItems().length < 3) {
            return;
        }

        data.activeDataItems().forEach((d, index) => {
            const rawDataItem = data.rawDataItem(index);
            let svgShape = visual.__createSVGShapeCallback(visual.container);

            visual.__saveSVGShape(svgShape);
            visual.__saveSVGShapeData(svgShape, index, d, rawDataItem);
            pointNodes.push(svgShape);
        });

        pathNode = path(visual.container);
    });

    visual.onFinalizeRender = () => {
        const curveLength = options.curveLength || 0;
        const isClosed = options.isClosed || false;
        const style = options.style || "";
        const isSmooth = options.isSmooth === undefined ? true : options.isSmooth;
        const isDiscontinuous = options.isDiscontinuous === undefined ? false : options.isDiscontinuous;

        const data = visual.getData();

        // TODO: Figure out how I can replace v.__arcStart() with v.$toPoint() so that the visuals is more aligned to the $lines visual
        const points = visual.shapeNodes.map(v => v.__arcStart());

        const smoothPath = () => isClosed ? pathNode.$bezierPathClosed(points, curveLength) : pathNode.$bezierPathOpen(points, curveLength);
        const connectedPointsPath = () => pathNode.$connectedPointsOnly(points, isDiscontinuous, data)

        const _path = isSmooth ? smoothPath() : connectedPointsPath();

        pathNode.$d(_path);
        pathNode.$class("polygon");
        pathNode.$style(style);

        visual.shapeNodes = [pathNode];

        const pointActions = options.pointActions || []

        actionsRunner(visual, pointNodes, pointActions);
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