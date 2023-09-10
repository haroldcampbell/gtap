import {
    _$,
    addShapeNode,
} from '../gtap-dom'

import * as utils from '../utils'
import * as nodeUtils from "./nodes-utils"

/**
 * Creates an image SVG element at the specified (x, y) point.
 *
 * @function image
 *
 * @param {String} parentId - The id or element that the image element will be added to.
 * @param {String} id
 * @param {Number} x - specifies the x-coordinate of the shape.
 * @param {Number} y - specifies the y-coordinate of the shape.
 *
 * @return {Object} - The newly created image element.
 */
export function image(parentId, id = null, x = 0, y = 0) {
    let node = addShapeNode(parentId, id, "image");

    node._$x = _$._x(node)
    node._$y = _$._y(node)
    node._$width = _$._width(node);
    node._$height = _$._height(node);

    node.$url = _$.__attrText(node, "href");

    node.$x = _x => rectX(node, _x);
    node.$y = _y => rectY(node, _y);
    node.$xy = (_x, _y) => rectXY(node, _x, _y);

    node.$toPoint = (point) => {
        if (point === undefined) {
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

const rectX = (r, _x) => {
    if (!utils.$isTruthy(_x)) {
        return r._$x();
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */
    r._$x(_x);

    return r;
}

const rectY = (r, _y) => {
    if (!utils.$isTruthy(_y)) {
        return r._$y();
    }

    if (utils.$isEmpty(r._$height()) || r._$height() == 0) {
        // If there is no width, then just set the y
        r._$y(_y);

        return r;
    }

    /*
     * I want the rect to remain centered around the y, regardless of
     * the changes to the height. Shift y to take width into consideration.
     */
    r._$y(_y)

    return r;
}

const rectXY = (r, _x, _y) => {
    if (_x === undefined) {
        return [r.$x(), r.$y()];
    }
    r.$x(_x);
    r.$y(_y);

    return r;
}