import {
    _$,
    addShapeNode,
} from '../gtap-dom'

import * as nodeUtils from "./nodes-utils"
import * as utils from './../utils'

export function arcShapeNode(parentId, id) {
    let a = addShapeNode(parentId, id, "path")

    a.$d = _$.__attrText(a, "d");
    a.$x = _$.__attr(a, "x"); // segment center x
    a.$y = _$.__attr(a, "y"); // segment center y

    a.$strokeWidth = _$.__attr(a, "stroke-width");

    a.__arcSpan = _$.__attr(a, "arc-span"); /* The length of the Arc in degrees */
    a.__arcStartX = _$.__attr(a, "arc-start-x");
    a.__arcStartY = _$.__attr(a, "arc-start-y");
    a.__arcEndX = _$.__attr(a, "arc-end-x");
    a.__arcEndY = _$.__attr(a, "arc-end-y");
    a.__largeArcFlag = _$.__attr(a, "large-arc-flag");

    a.$radius = _$.__attr(a, "radius");
    a.$startAngle = _$.__attr(a, "start-angle"); /* Sets/Gets the starting angle of Arc in degrees */
    a.$endAngle = () => nodeUtils.__endAngle(a);
    a.$arcSpan = (val) => nodeUtils.__arcSpan(a, val);

    a.__arcStart = () => nodeUtils.__arcStart(a);
    a.__arcEnd = () => nodeUtils.__arcEnd(a);
    a.$radialCenter = (x, y, radius, startAngle) => nodeUtils.__radialCenter(x, y, radius, startAngle);

    a.$strokeColor = (color) => nodeUtils.__strokeColor(a, color);
    a.$calcRenderData = () => nodeUtils.__calcArcRenderData(a);

    a.$arcLength = () => nodeUtils.calcArcLength(a.$radius(), a.$arcSpan());
    a.$pointOnArc = (arcLength) => nodeUtils.pointOnArc(arcLength, a.$x(), a.$y(), a.$radius(), a.$startAngle());

    a.$properties = (newProperties) => __properties(a, newProperties)

    a.__renderPath = (currentNodeIndex, preRenderCallback) => {
        throw new Error("arcShapeNode.__renderPath must be overridden.")
    }
    return a;
}

function __properties(node, newProperties) {
    if (newProperties === undefined) {
        return {
            d: node.$d(),
            x: node.$x(),
            y: node.$y(),
            radius: node.$radius(),
            arcSpan: node.$arcSpan(),
            style: node.$style(),
        }
    }

    nodeUtils.$setPropertyIsSet(node, newProperties, "d");
    nodeUtils.$setPropertyIsSet(node, newProperties, "x");
    nodeUtils.$setPropertyIsSet(node, newProperties, "y");
    nodeUtils.$setPropertyIsSet(node, newProperties, "arcSpan");
    nodeUtils.$setPropertyIsSet(node, newProperties, "style");
    nodeUtils.$setPropertyIsSet(node, newProperties, "radius");

    node.__renderPath();
}