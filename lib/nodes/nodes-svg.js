import {
    _$,
    addShapeNode,
} from '../gtap-dom'

import * as nodeUtils from "./nodes-utils"

/**
 * Creates a nested SVG element.
 *
 * @function svg
 *
 * @param {String} parentId - The id or element that the group element
 *  will be added to.
 * @param {String} id
 * @param {Number} x - specifies the x-coordinate of the shape.
 * @param {Number} y - specifies the y-coordinate of the shape.
 *
 * @return {Object} - The newly created group element.
 */
export function svg(parentId, id = null, x = 0, y = 0) {
    let node = addShapeNode(parentId, id, "svg");

    node._$x = _$._x(node)
    node._$y = _$._y(node)
    node._$width = _$._width(node);
    node._$height = _$._height(node);

    node.$x = _x => nodeUtils.rectX(node, _x);
    node.$y = _y => nodeUtils.rectY(node, _y);
    node.$xy = (_x, _y) => nodeUtils.rectXY(node, _x, _y);

    node.$toPoint = (point) => {
        if (point == undefined) {
            return {
                x: node.$x(),
                y: node.$y(),
            }
        }
        node.$x(point.x);
        node.$y(point.y);
    }

    node.$width = (_w, autoCenter) => nodeUtils.__rectWidth(node, _w, autoCenter);
    node.$height = (_h, autoCenter) => nodeUtils.__rectHeight(node, _h, autoCenter);

    node.$x(x)
    node.$y(y)

    return node;
}