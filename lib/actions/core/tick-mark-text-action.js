import {
    text
} from "./../../nodes/nodes-text"
import * as utils from '../../utils'
import * as nodeUtils from "./../../nodes/nodes-utils"

/**
 * @callback $tickMarkTextConfigCallback
 * @param {CallbackData} callback
 */


/**
 * Adds text for the tick marks along a line
 * #TODO: Make this work for horizontal and vertical lines, also for ticks along an arc would be nice
 *
 * @function $tickMarkText
 *
 * @param {Number} numberOfTicks - specifies how many ticks to draw
 * @param {Number} spaceBetweenTicks - sets the space between the ticks
 * @param {Function} textSetterCallback - function callback used to set the text for each tick mark.
 *      The function needs be of the form callback(index:Number):text
 *
 * @param {$tickMarkTextConfigCallback} configCallback - an optional function callback used to configure the newly created text node.
 *      The function needs to be of the form callback(object:CallbackData)
 *
 * @param {Object} positionConfig - additional config options for controlling the spacing of the ticks.
 *  Options include:
 *      {Number} xMargin - shifts everything along the x-Axis
 *      {Number} yMargin - shifts everything along the y-Axis
 *      {Number} radialOffset - shifts everything along the startAngle
 *      {Number} startAngleOffset - rotates everything by a fixed amount
 *
 * @return {Object} Intent meta-data
 */
export function $tickMarkText(numberOfTicks = 10, spaceBetweenTicks = 10, textSetterCallback = (index) => "", configCallback = null, positionConfig = null) {
    return {
        name: "tickMarkText",
        noAnimate: true,

        action(visuals) {
            const node = visuals.shapeNodes[0];
            const tickConfig = {
                numberOfTicks: numberOfTicks,
                spaceBetweenTicks: spaceBetweenTicks,
                textSetterCallback: textSetterCallback,
                configCallback: configCallback
            };

            if (node.$startAngle) {
                processTextAlongAxes(visuals, tickConfig, positionConfig);
            } else {
                console.log("Error $tickMarkText(...): This type of shape doesn't support adding tick mark text. It needs to have a $startAngle().")
            }
        }
    };
}

function processTextAlongAxes(visuals, tickConfig, positionConfig) {
    // Collect all of the angles for each radial axis
    const axisAngles = visuals.shapeNodes.map(v => v.$startAngle());
    const startAngleOffset = nodeUtils.configValue(positionConfig, "startAngleOffset");
    // const axisAngle = axisData.axisAngles[axisData.axisIndex] + startAngleOffset;

    // Iterate over each axis, setting the text accordingly
    visuals.shapeNodes.forEach((v, index) => {
        const axisData = {
            node: v,
            axisIndex: index,
            numAxes: visuals.shapeNodes.length,
            axisAngles: axisAngles.map(angle => angle), // prevent side-effects
            axisAngle: axisAngles[index] + startAngleOffset
        }
        addTextAlongRadial(axisData, tickConfig, positionConfig);
    });
}


function addTextAlongRadial(axisData, tickConfig, positionConfig) {
    const isEvenAxisCount = axisData.numAxes % 2 == 0 ? true : false;
    const isOppositeAxis = (axisData.axisIndex >= axisData.numAxes / 2);

    const altAngle = 90;
    let tickAngle = axisData.axisAngle + altAngle;

    if (isEvenAxisCount && isOppositeAxis) {
        // Adjust angle to the same as the paired opposite angle
        // This assumes that the axes are equi-distant apart.
        const oppositeAxisIndex = axisData.axisIndex - axisData.numAxes / 2;
        tickAngle = axisData.axisAngles[oppositeAxisIndex] + altAngle;
    }

    addTextAlongAxes(tickAngle, axisData, tickConfig, positionConfig);
}

function addTextAlongAxes(tickAngle, axisData, tickConfig, positionConfig) {
    const [node, axisIndex, axisAngle] = [axisData.node, axisData.axisIndex, axisData.axisAngle]; //, axisData.axisAngles];

    const xMargin = nodeUtils.configValue(positionConfig, "xMargin");
    const yMargin = nodeUtils.configValue(positionConfig, "yMargin");
    const radialOffset = nodeUtils.configValue(positionConfig, "radialOffset");

    const x = node.$x() + xMargin;
    const y = node.$y() + yMargin;

    let tickOffset = tickConfig.spaceBetweenTicks + radialOffset;
    for (let index = 0; index < tickConfig.numberOfTicks; index++) {
        const labelText = tickConfig.textSetterCallback(index);
        const axisPosition = utils.$polarToCartesian(x, y, tickOffset, axisAngle);

        const label = text(node.$parentElm)
        label.$text(labelText);
        alignWithAngle(label, axisPosition.x, axisPosition.y, 10, tickAngle) // Default alignment

        if (tickConfig.configCallback) {
            const callbackData = createConfigCallbackData(label, x, y, index, axisIndex, axisPosition, tickAngle, axisAngle, tickOffset);
            tickConfig.configCallback(callbackData);
        }
        tickOffset += tickConfig.spaceBetweenTicks
    }
}

/**
 * @typedef {Object} CallbackData
 * @property {Label} label
 * @property {number} tickIndex
 * @property {number} axisIndex
 * @property {boolean} isEvenAxis
 * @property {number} tickAngle
 * @property {number} axisAngle
 * @property {Function} alignTop
 * @property {Function} alignBottom
 * @property {Function} alignWithAngle
 */

/**
 *
 * @param {Label} label
 * @param {number} x
 * @param {number} y
 * @param {number} index
 * @param {number} axisIndex
 * @param {number} axisPosition
 * @param {number} tickAngle
 * @param {number} axisAngle
 * @param {number} tickOffset
 *
 * @return {CallbackData}
 */
function createConfigCallbackData(label, x, y, index, axisIndex, axisPosition, tickAngle, axisAngle, tickOffset) {
    const isEvenAxis = (axisIndex % 2 == 0);

    return {
        x: x,
        y: y,
        label: label,
        isEven: isEvenAxis,
        tickIndex: index,
        tickAngle: tickAngle,
        tickOffset: tickOffset,
        axisAngle: axisAngle,
        axisIndex: axisIndex,
        axisPosition: axisPosition,
        alignTop: () => alignWithAngle(label, axisPosition.x, axisPosition.y, 10, tickAngle),
        alignBottom: () => alignWithAngle(label, axisPosition.x, axisPosition.y, 10, tickAngle + 180),
        alignWithAngle: (angle) => alignWithAngle(label, x, y, tickOffset, angle),
    }
}

function alignWithAngle(label, x, y, tickOffset, angle) {
    const xy = utils.$polarToCartesian(x, y, tickOffset, angle);

    label.$xy(xy.x, xy.y);
}