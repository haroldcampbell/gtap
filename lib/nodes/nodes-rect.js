import {
    _$,
    addShapeNode,
} from '../gtap-dom'

import * as nodeUtils from "./nodes-utils"

/**
 * Creates a rect SVG element at the specifed (x, y) point.
 *
 * @function rect
 *
 * @param {String} parentId - The id or element that the rect element
 *  will be added to.
 * @param {String} id
 * @param {Number} x - specifies the x-coordinate of the shape.
 * @param {Number} y - specifies the y-coordinate of the shape.
 *
 * @return {Object} - The newly created rect element.
 */
export function rect(parentId, id = null, x = 0, y = 0) {
    let node = addShapeNode(parentId, id, "rect");

    node._$x = _$._x(node)
    node._$y = _$._y(node)
    node._$width = _$._width(node);
    node._$height = _$._height(node);
    node.$strokeWidth = _$.__attr(node, "stroke-width");

    node.$x = _x => nodeUtils.rectX(node, _x);
    node.$y = _y => nodeUtils.rectY(node, _y);
    node.$xy = (_x, _y) => nodeUtils.rectXY(node, _x, _y);

    node.$toPoint = (point) => {
        node.$x(point.x);
        node.$y(point.y);
    }

    node.$rx = _$._rx(node);
    node.$ry = _$._ry(node);

    node.$rxy = (x, y) => {
        node.$rx(x);
        node.$ry(y);
    }

    node.$width = (_w, autoCenter) => nodeUtils.__rectWidth(node, _w, autoCenter);
    node.$height = (_h, autoCenter) => nodeUtils.__rectHeight(node, _h, autoCenter);

    node.$size = (_w, _h) => {
        node.$width(_w);
        node.$height(_h);
    }

    node.$x(x)
    node.$y(y)

    node.$alignBottom = (baselineValue, getValue = () => node.getDataValue(), maxHeight = null) => {
        const alignData = nodeUtils.__$alignBottom(node, baselineValue, getValue, maxHeight);
        node.$y(alignData.y);
        node.$height(alignData.height);
    }

    return node;
}