import {
    arc,
} from "./../../nodes/nodes-arc"
import {
    ellipse,
} from "./../../nodes/nodes-ellipse"

import * as nodeUtils from "./../../nodes/nodes-utils"

export const tickPosition = (node, offset, positionConfig) => {
    const radialOffset = nodeUtils.configValue(positionConfig, "radialOffset");
    const startAngleOffset = nodeUtils.configValue(positionConfig, "startAngleOffset");

    const newPos = nodeUtils.__radialCenter(node.$x(), node.$y(), offset + radialOffset, node.$startAngle() + startAngleOffset);
    const xMargin = nodeUtils.configValue(positionConfig, "xMargin");
    const yMargin = nodeUtils.configValue(positionConfig, "yMargin");

    return {
        x: xMargin + newPos.x,
        y: yMargin + newPos.y
    };
}

export const defaultTicks = (node, newPos, offset, index, style, numberOfTicks, positionConfig) => {
    const radialOffset = nodeUtils.configValue(positionConfig, "radialOffset");
    const startAngleOffset = nodeUtils.configValue(positionConfig, "startAngleOffset");

    const tick = arc(node.$parentElm)
    const arcSpan = nodeUtils.calcTheta(offset + radialOffset, 5);

    tick.$x(newPos.x)
    tick.$y(newPos.y);
    tick.$style(style);
    // #TODO: This is a hack. The ticks are not perfectly being drawn perpendicularly to the radial line.
    // To see the bug, increase the length of the arc e.g.  getTheta(offset, 180)
    tick.$startAngle(startAngleOffset + node.$startAngle() - arcSpan / 2.0);
    tick.$arcSpan(arcSpan);
    tick.$radius(offset + radialOffset);
    tick.__renderPath();
}

export const ellipseTicks = (defaultTickStyle, lastTickStyle = null) => {
    return (node, newPos, offset, index, style, numberOfTicks, positionConfig) => {
        let e = ellipse(node.$parentElm);

        e.$cxy(newPos.x, newPos.y);
        e.$rxy(2, 2);
        e.$style(defaultTickStyle);

        if (lastTickStyle != null && index == (numberOfTicks - 1)) {
            e.$rxy(4, 4);
            e.$style(lastTickStyle);
        }
    }
}

function addTickMarks(node, numberOfTicks, spaceBetweenTicks, style, configCallback, positionConfig) {
    let offset = spaceBetweenTicks;

    for (let index = 0; index < numberOfTicks; index++) {
        const newPos = tickPosition(node, offset, positionConfig);

        configCallback(node, newPos, offset, index, style, numberOfTicks, positionConfig);

        offset += spaceBetweenTicks
    }
}

/**
 * Adds tick marks along a line
 * #TODO: Make this work for horizontal and vertical lines, also for ticks along an arc would be nice
 *
 * @function $tickMarks
 *
 * @param {Number} numberOfTicks - specifies how many ticks to draw
 * @param {Number} spaceBetweenTicks - sets the space between the ticks
 * @param {Function} configCallback - function callback used to create a tick mark at a specific point.
 *      The default value creates an arc tick mark that needs to be style
 * @param {String} style - the styling for the tick marks
 * @param {Object} positionConfig - additional config options for controlling the spacing of the ticks.
 *  Options include:
 *      {Number} xMargin - shifts everything along the x-Axis
 *      {Number} yMargin - shifts everything along the y-Axis
 *      {Number} radialOffset - shifts everything along the startAngle
 *      {Number} startAngleOffset - rotates everything by a fixed amount
 *
 * @return {Object} Intent meta-data
 */
export function $tickMarks(numberOfTicks = 10, spaceBetweenTicks = 10, configCallback = defaultTicks, style = "fill: #444; stroke:1;", positionConfig = {}) {
    return {
        name: "tickMarks",
        numberOfTicks,
        spaceBetweenTicks,
        noAnimate: true,

        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                // I'm assuming that each shape is a line of some sort
                if (v.$startAngle) {
                    addTickMarks(v, this.numberOfTicks, this.spaceBetweenTicks, style, configCallback, positionConfig);
                }
            });
        }
    };
}

// TODO: Use the code here to draw tick mark lines that aren't curved
export const lineTicks = () => {
    // let offset = axisConfig.spaceBetweenTicks;
    // const [node, nodeIndex, numAxes, axisAngles] = [axisData.node, axisData.nodeIndex, axisData.numAxes, axisData.axisAngles];
    // const alignLabel = (label, xy) => label.$xy(xy.x, xy.y);

    // const x = node.$x();
    // const y = node.$y();
    // const altAngle = 90;
    // const axisAngle = axisAngles[nodeIndex];
    // let tickAngle = axisAngle + altAngle;

    // const isOppositeAxis = (nodeIndex >= numAxes / 2);

    // if (isOppositeAxis) {
    //     // Adjust angle to the same as the paired opposite angle
    //     // This assumes that the axes are equi-distant apart.
    //     const oppositeAxisIndex = nodeIndex - numAxes / 2;
    //     tickAngle = axisAngles[oppositeAxisIndex] + altAngle;
    // }
    // console.log("addTextAlongRadial>>", `nodeIndex>>${nodeIndex}`, `axisAngle>>${axisAngle}`, `altAngle>>${altAngle}`, `tickAngle>>${tickAngle}`);

    // for (let index = 0; index < axisConfig.numberOfTicks; index++) {
    //     const labelText = axisConfig.textSetterCallback(index);
    //     const axisPosition = utils.$polarToCartesian(x, y, offset, axisAngle);

    //     const label = text(node.$parentElm)
    //     label.$text(labelText);
    //     //const bbox = label.getBBox();
    //     // const dw = bbox.width / 2.0;
    //     // const dh = bbox.height / 2.0;

    //     // Top
    //     const topOffset = utils.$polarToCartesian(axisPosition.x, axisPosition.y, 10, tickAngle);
    //     const l = line(node.$parentElm, '', axisPosition.x, axisPosition.y, topOffset.x, topOffset.y);
    //     l.$style("stroke:red; stroke-width:1");
    //     // Bottom
    //     const bottomOffset = utils.$polarToCartesian(axisPosition.x, axisPosition.y, 10, tickAngle + 180);
    //     const l2 = line(node.$parentElm, '', axisPosition.x, axisPosition.y, bottomOffset.x, bottomOffset.y);
    //     l2.$style("stroke:green; stroke-width:1");

    //     alignLabel(label, topOffset);

    //     if (axisConfig.configCallback) {
    //         const callbackData = {
    //             index: index,
    //             axisIndex: nodeIndex,
    //             isEven: (nodeIndex % 2 == 0),
    //             alignTop: () => alignLabel(label, topOffset),
    //             alignBottom: () => alignLabel(label, bottomOffset),
    //         }
    //         axisConfig.configCallback(label, callbackData);
    //     }
    //     offset += axisConfig.spaceBetweenTicks
    // }
}