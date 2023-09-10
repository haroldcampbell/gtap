import {
    TextVerticalAlign
} from "../../nodes/nodes-utils"

const topAlignment = (textNode) => {
    textNode.$y(textNode.$y());
    textNode.$vAlign(TextVerticalAlign.BOTTOM);
}

const middleAlignment = (textNode, heightConstraint) => {
    // const bb = textNode.$textBoundingBox();
    //const dy = (heightConstraint - bb.height) / 2.0;

    textNode.$y(textNode.$y() + heightConstraint / 2.0);
    textNode.$vAlign(TextVerticalAlign.MIDDLE);
}

const bottomAlignment = (textNode, heightConstraint, alignmentType) => {
    textNode.$y(textNode.$y() + heightConstraint);
    textNode.$vAlign(TextVerticalAlign.TOP);
}

const alignmentActions = {};
alignmentActions[TextVerticalAlign.TOP] = topAlignment;
alignmentActions[TextVerticalAlign.MIDDLE] = middleAlignment;
alignmentActions[TextVerticalAlign.BOTTOM] = bottomAlignment;

/**
 * Aligns the text vertically within the confines of the specified height.
 *
 * Note: This needs to be applied after font styling.
 *
 * @param {*} data - the height of the box in which to align the text vertically
 * @param {*} alignmentType - the options are top | middle \ bottom
 *
 * @return {Object} Intent meta-data
 */
export function $textVerticalBoxAlign(data, alignmentType = "top") {
    return {
        name: "textVerticalAlignWithHeight",
        noAnimate: true,
        data,
        alignmentType,

        action(visuals) {
            if (alignmentActions[this.alignmentType] === undefined) {
                return;
            }

            visuals.shapeNodes.forEach(v => {
                alignmentActions[this.alignmentType](v, this.data, this.alignmentType);
            });
        }
    };
}