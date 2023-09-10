import {
    _$,
    addEmptyShape,
} from '../gtap-dom'

import * as utils from '../utils'

import * as nodeUtils from "./nodes-utils"

export function pointNode(parentId, id) {
    let a = addEmptyShape(parentId);

    a.$id = _$._id(id);
    a.$attr = _$._attr(a);

    a.$strokeWidth = _$.__attr(a, "stroke-width");
    a.__strokeColor = _$.__attrText(a, "stroke-color");

    a.__arcSpan = _$.__attr(a, "arc-span"); /* The length of the Arc in degrees */
    a.__arcStartX = _$.__attr(a, "arc-start-x");
    a.__arcStartY = _$.__attr(a, "arc-start-y");
    a.__arcEndX = _$.__attr(a, "arc-end-x");
    a.__arcEndY = _$.__attr(a, "arc-end-y");

    a.$radius = _$.__attr(a, "radius");
    a.$startAngle = _$.__attr(a, "start-angle"); /* Sets/Gets the starting angle of Arc in degrees */
    a.$endAngle = () => nodeUtils.__endAngle(a);
    a.$arcSpan = (val) => nodeUtils.__arcSpan(a, val);

    a.__arcStart = () => nodeUtils.__arcStart(a);
    a.__arcEnd = () => nodeUtils.__arcEnd(a);

    a.$arcPoint = () => nodeUtils.__arcStart(a);
    a.$arcPointEnd = () => nodeUtils.__arcEnd(a);

    a.$radialCenter = (radius, startAngle = a.$startAngle()) => nodeUtils.__radialCenter(a.$x(), a.$y(), radius, startAngle);

    a.$strokeColor = (color) => nodeUtils.__strokeColor(a, color);
    a.$calcRenderData = () => nodeUtils.__calcArcRenderData(a);

    a.$arcLength = () => nodeUtils.calcArcLength(a.$radius(), a.$arcSpan());
    a.$pointOnArc = (arcLength) => nodeUtils.pointOnArc(arcLength, a.$x(), a.$y(), a.$radius(), a.$startAngle());

    a.__renderPath = (currentNodeIndex, preRenderCallback) => {
        a.$calcRenderData();
    };

    a._$x = _$._x(a)
    a._$y = _$._y(a)

    a.$x = _x => __x(a, _x);
    a.$y = _y => __y(a, _y);
    a.$xy = (_x, _y) => {
        if (_x == undefined) {
            return [a.$x(), a.$y()];
        }
        a.$x(_x);
        a.$y(_y)
    }

    a.$toPoint = (point) => {
        if (point === undefined) {
            return {
                x: a.$x(),
                y: a.$y()
            }
        }
        a.$x(point.x);
        a.$y(point.y);
    }

    a._$width = _$.__attr(a, "width");
    a._$height = _$.__attr(a, "height");
    a.$width = (_w) => width(a, _w);
    a.$height = (_h) => height(a, _h);

    a.$alignBottom = (baselineValue, getValue = () => a.getDataValue(), maxHeight) => {
        const alignData = nodeUtils.__$alignBottom(a, baselineValue, getValue, maxHeight);
        a.$y(alignData.y);
        a.$height(alignData.height);
    }

    return a;
}

function __x(node, _x) {
    if (!utils.$isTruthy(_x)) {
        return node._$x();
    }

    node._$x(_x);
    node.__arcStartX(_x + node._$width())

    return node;
}

function __y(node, _y) {
    if (!utils.$isTruthy(_y)) {
        return node._$y();
    }

    node._$y(_y);
    node.__arcStartY(_y)

    return node;
}

function width(node, _w) {
    if (!utils.$isTruthy(_w)) {
        return node._$width();
    }

    node._$width(_w);
    node.__arcStartX(node._$x() + _w);
}

function height(node, _h) {
    if (!utils.$isTruthy(_h)) {
        return node._$height();
    }

    node._$height(_h);
    node.__arcStartY(node._$y() - _h);
}