import {
    _$,
    addShapeNode,
} from '../gtap-dom'

import * as utils from '../utils'

/**
 * Creates a ellipse SVG element.
 *
 * @function ellipse
 *
 * @param {String} parentId - The id or element that the ellipse element
 *  will be added to.
 * @param {String} id - The ID of the ellipse element
 *
 * @return {Object} - The newly created ellipse element
 */
export function ellipse(parentId, id) {
    let e = addShapeNode(parentId, id, "ellipse")

    e.$cx = _$._cx(e);
    e.$cy = _$._cy(e);
    e.$rx = _$._rx(e);
    e.$ry = _$._ry(e);
    e.$strokeWidth = _$.__attr(e, "stroke-width");

    e.$x = function (_x) {
        return utils.$isTruthy(_x) ? e.$cx(_x) : e.$cx();
    }
    e.$y = function (_y) {
        return utils.$isTruthy(_y) ? e.$cy(_y) : e.$cy();
    }
    e.$height = function (_h) {
        return utils.$isTruthy(_h) ? e.$ry(_h) : e.$ry();
    }
    e.$width = function (_w) {
        return utils.$isTruthy(_w) ? e.$rx(_w) : e.$rx();
    }

    e.$size = (_w, _h) => {
        if (_w === undefined) {
            return {
                w: e.$width(),
                h: e.$height()
            };
        }
        e.$width(_w);
        e.$height(_h);
    }

    e.$cxy = (x, y) => {
        if (x === undefined) {
            return {
                cx: e.$cx(),
                cy: e.$cy()
            };
        }
        e.$cx(x);
        e.$cy(y);
    }

    e.$rxy = (x, y) => {
        if (x === undefined) {
            return {
                rx: e.$rx(),
                ry: e.$ry()
            };
        }
        e.$rx(x);
        e.$ry(y);
    }

    e.$xy = (_x, _y) => {
        if (_x === undefined) {
            return {
                x: e.$x(),
                y: e.$y()
            };
        }
        e.$x(_x);
        e.$y(_y);
    };

    e.$toPoint = (point) => {
        if (point === undefined) {
            return {
                x: e.$x(),
                y: e.$y()
            }
        }
        e.$x(point.x);
        e.$y(point.y);
    }

    return e;
}