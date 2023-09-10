import * as nodeUtils from '../../nodes/nodes-utils'

/**
 * @function $addText
 *
 * @param {Array} textArray - the array of text to add to nodes
 * @param {String} style - css style
 * @param {Number} xOffset
 * @param {Number} yOffset
 *
 * @return {Object} Intent meta-data
 */
export function $addText(textArray, style, xOffset = 0, yOffset = 0) {
    return {
        name: "addText",
        data: null,
        noAnimate: true,

        action(visuals) {
            visuals.shapeNodes.forEach((v, index) => {
                if (index >= textArray.length) return;

                nodeUtils.$addTextNode(v, textArray[index], (textNode) => {
                    textNode.$y(v.$y() + yOffset);
                    textNode.$x(v.$x() + xOffset);
                    textNode.$style(style);
                });
            });
        }
    };
}