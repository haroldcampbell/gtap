import * as utils from '../utils'
import {
    text
} from '../nodes/nodes-text'

import {
    rect
} from "../nodes/nodes-rect"

export const configValue = (configObject, propertyName, defaultValue = 0) => {
    if (!utils.$isTruthy(configObject)) {
        return defaultValue;
    }

    const value = configObject[propertyName];
    if (!utils.$isTruthy(value)) {
        return defaultValue;
    }

    return value;
}

export function __strokeColor(a, color) {
    if (color === undefined) {
        if (a.__strokeColor) {
            return a.__strokeColor();
        }
        return null;
    }

    if (a.$style) {
        a.$style("stroke:" + color)
    }
    if (a.__strokeColor) {
        a.__strokeColor(color);
    }
}

/**
 * Return the theta (i.e. arcSpan) that is required for an arc to have the
 * specified radius and arcLength.
 *
 * @param {Number} radius
 * @param {Number} arcLength
 *
 * @return {Number} theta
 */
export function calcTheta(radius, arcLength) {
    /* https://www.mathopenref.com/arclength.html
     * arcLength = Math.PI * radius * theta / 180;
     */
    const theta = arcLength * 180.0 / (Math.PI * radius);

    return theta;
}
/**
 * Return the arcSpan that is required for an arc to have the
 * specified radius and arcLength.
 *
 * @param {Number} radius
 * @param {Number} arcLength
 *
 * @return {Number} arcSpan
 */
export function calcArcSpan(radius, arcLength) {
    return calcTheta(radius, arcLength);
}
/**
 * Return the length of a arcSpan (i.e. theta) based on the current radius and the span.
 *
 * @param {Number} radius
 * @param {Number} spanUnit - the angle of the arc
 *
 * @return {Number} arcLength
 */

export function calcArcLength(radius, spanUnit) {
    /* https://www.mathopenref.com/arclength.html */

    const arcLength = Math.PI * radius * spanUnit / 180;

    return arcLength;
}

/**
 * Returns a point along a arc.
 *
 * @param {*} arcLength - The length along the arc where the point is at
 * @param {*} centerX
 * @param {*} centerY
 * @param {*} radius
 * @param {*} startAngle - The starting point of the arc (in degrees)
 *
 * @return {Object} {x, y}
 */
export function pointOnArc(arcLength, centerX, centerY, radius, startAngle) {
    // https://www.mathopenref.com/arclength.html

    const newSpan = calcArcSpan(radius, arcLength);

    return utils.$polarToCartesian(centerX, centerY, radius, startAngle + newSpan - 90);
}

/**
 * Creates a Hash with the {x,y} as keys for the arcStart coords
 *
 * WARNING: The __arcStartX and __arcStartY are only evaluated and set in  $calcRenderData().
 *
 * @param {ArcShapeNode} node
 *
 * @return {Object} - Hash with the {x,y} as keys.
 */
export function __arcStart(node) {
    return {
        x: node.__arcStartX(),
        y: node.__arcStartY()
    }
}

/**
 * Creates a Hash with the {x,y} as keys for the arcEnd coords
 *
 * WARNING: The __arcEndX and __arcEndY are only evaluated and set in  $calcRenderData().
 *
 * @param {ArcShapeNode} node
 *
 * @return {Object} - Hash with the {x,y} as keys.
 */
export function __arcEnd(node) {
    return {
        x: node.__arcEndX(),
        y: node.__arcEndY()
    }
}

/**
 * Creates a Hash with the {x,y} as keys along the radial from the specified origin
 *
 * @param {Number} centerX
 * @param {Number} centerY
 * @param {Number} radius - radial center along specified radius
 * @param {Number} startAngle
 *
 * @return {Object} - Hash with the {x,y} as keys.
 */
export function __radialCenter(centerX, centerY, radius, startAngle) {
    /** Rotate anti-clockwise by 90 degree in order to get the arcs starting
     * from the y-axis * */
    let radialCenter = utils.$polarToCartesian(centerX, centerY, radius, startAngle - 90); /** contains the M attributes x and y */

    return radialCenter;
}

export function __arcSpan(a, val) {
    let result = a.__arcSpan(val);
    if (result === 'undefined' || result === null) {
        a.__arcSpan(0);
        return 0;
    }

    return result
}

export function __endAngle(a) {
    return a.$startAngle() + a.$arcSpan();
}

/**
 * Calculates the core data elements used to render a path along an arc
 *
 * @param {Object} a - The segment node
 */
export function __calcArcRenderData(a) {
    /* Originally based on http://jsbin.com/sokacelaga/edit?html,js,output */
    let [x, y, radius, startAngle, endAngle] = [a.$x(), a.$y(), a.$radius(), a.$startAngle(), a.$endAngle()];

    /** Rotate anti-clockwise by 90 degree in order to get the arcs starting
     * from the y-axis * */

    let start = utils.$polarToCartesian(x, y, radius, startAngle - 90); /** contains the M attributes x and y */
    let end = utils.$polarToCartesian(x, y, radius, endAngle - 90);

    a.__arcStartX(start.x)
    a.__arcStartY(start.y)
    a.__arcEndX(end.x)
    a.__arcEndY(end.y)
}

export function $getLargeArcFlag(acrNode) {
    return acrNode.$endAngle() - acrNode.$startAngle() <= 180 ? "0" : "1";
}

export const __rectWidth = (r, _w, autoCenter) => {
    if (!utils.$isTruthy(_w)) {
        return r._$width();
    }

    if (!autoCenter) {
        r._$width(_w);

        return r;
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */

    let w;

    if (utils.$isEmpty(r._$width())) {
        w = _w
    } else {
        w = r._$width() == 0 ? _w : (r._$width() - _w);
    }
    let dw = w / 2.0;

    let x = r._$x();
    let xCenter = x - dw;

    r._$x(xCenter);
    r._$width(_w);

    return r;
}

export const __rectHeight = (r, _h, autoCenter) => {
    if (!utils.$isTruthy(_h)) {
        return r._$height();
    }

    if (!autoCenter) {
        r._$height(_h);

        return r;
    }

    /*
     * I want the rect to remain centered around the y, regardless of
     * the changes to the height. Shift y to take height into consideration
     */

    let h;

    if (utils.$isEmpty(r._$height())) {
        h = _h
    } else {
        h = r._$height() == 0 ? _h : (r._$height() - _h);
    }

    let dh = h / 2.0;

    let y = r._$y();
    let yCenter = y - dh;

    r._$y(yCenter);
    r._$height(_h);

    return r;
}

export const __$alignBottom = (node, baselineValue, getValueCallback, maxHeight = null) => {
    let [y, height] = [0, node.$height()];

    if (utils.$isTruthy(maxHeight)) {
        height = maxHeight * getValueCallback();
    }

    y = baselineValue - height;

    return {
        y,
        height
    }
}

export const rectX = (node, _x) => {
    if (!utils.$isTruthy(_x)) {
        return node._$x();
    }

    /*
     * I want the rect to remain centered around the x, regardless of
     * the changes to the width. Shift x to take width into consideration.
     */
    node._$x(_x);

    return node;
}

export const rectY = (node, _y) => {
    if (!utils.$isTruthy(_y)) {
        return node._$y();
    }

    if (utils.$isEmpty(node._$height()) || node._$height() == 0) {
        // If there is no width, then just set the y
        node._$y(_y);

        return node;
    }

    /*
     * I want the rect to remain centered around the y, regardless of
     * the changes to the height. Shift y to take width into consideration.
     */
    node._$y(_y)

    return node;
}

export const rectXY = (node, _x, _y) => {
    if (_x === undefined) {
        return [node.$x(), node.$y()];
    }
    node.$x(_x);
    node.$y(_y);

    return node;
}

export const TextVerticalAlign = {
    TOP: "top",
    MIDDLE: "middle",
    BOTTOM: "bottom"
}

export function __vAlign(r, algin) {
    if (algin === undefined) {
        return r.$attr("dominant-baseline")
    }

    switch (algin) {
        case TextVerticalAlign.TOP:
            r.$attr("dominant-baseline", "baseline");
            break;
        case TextVerticalAlign.MIDDLE:
            r.$attr("dominant-baseline", "middle");
            break;
        case TextVerticalAlign.BOTTOM:
            r.$attr("dominant-baseline", "hanging");
            break;
    }
    return r;
}

export function __alignTextRadially(r, maxPoints, currentIndex) {
    let quadrant = (currentIndex / maxPoints) * 360;

    if (quadrant > 0 && quadrant < 180) {
        r.$textAnchor("start");
    } else if (quadrant > 180 && quadrant < 360) {
        r.$textAnchor("end")
    } else {
        r.$textAnchor("middle");
    }

    if ((quadrant > 0 && quadrant < 90) || (quadrant > 270 && quadrant < 360)) {
        r.$vAlign("top");
    } else if ((quadrant > 90 && quadrant < 180) || (quadrant > 180 && quadrant < 270)) {
        r.$vAlign("bottom");
    } else if (quadrant == 180) {
        r.$vAlign("bottom");
    } else {
        r.$vAlign("top");
    }

    return
}

export function $stopMouseDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

export function $addTextNode(v, str, callback = (textNode) => {}) {
    const textNode = text(v.$parentElm);

    textNode.$text(str);

    callback(textNode);

    return textNode;
}

export function $numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function $showFramingBox(node, box = null, maxWidth = null, strokeColors = "red") {
    let bbBox = box == null ? node.getBBox() : box;
    let frameHeight = bbBox.height;
    const frameNode = rect(node.$parentElm);
    frameNode.$x(node.$x());
    frameNode.$y(node.$y() - bbBox.height);

    frameNode.$width(maxWidth == null ? bbBox.width : maxWidth);
    frameNode.$height(frameHeight);
    frameNode.$style(`stroke:${strokeColors}; stroke-width:1; fill:none`);
    return frameNode
}


export function $setPropertyIsSet(node, newProperties, propertyName) {
    if (!node.hasOwnProperty(`$${propertyName}`)) {
        console.trace(`$${propertyName} is not a member of this shape.`)
        return;
    }
    if (!newProperties.hasOwnProperty(propertyName)) {
        console.trace(`${propertyName} is not in newProperties set.`)
        return;
    }

    node[`$${propertyName}`](newProperties[propertyName]);
}