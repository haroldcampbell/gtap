import {
    _$,
    addShapeNode,
    $svgNode,
    $id,
} from '../gtap-dom'

import * as nodeUtils from "./nodes-utils"

export function textAlongPath(parentId, id = null, x = 0, y = 0) {
    let r = addShapeNode(parentId, id, "text");

    r.$x = _$._x(r)
    r.$y = _$._y(r)
    r.$pathRefId = _$.__attrText(r, "path-ref-id");

    r.$xy = (_x, _y) => {
        if (_x === undefined) {
            return [r.$x(), r.$y()];
        }
        r.$x(_x);
        r.$y(_y);
        return r;
    }

    r.$toPoint = (point) => {
        if (point === undefined) {
            return {
                x: r.$x(),
                y: r.$y()
            }
        }
        r.$x(point.x);
        r.$y(point.y);
    }

    r.$fontSize = (size) => {
        if (size === undefined) {
            const fontSize = r.$attr("font-size")
            return (fontSize == null) || isNaN(fontSize) ? fontSize : parseFloat(fontSize);
        }

        r.$attr("font-size", size);
    }

    r.$textAnchor = (anchor) => {
        if (anchor === undefined) {
            return r.$attr("text-anchor")
        }

        r.$attr("text-anchor", anchor);
    }

    r.$vAlign = (align) => nodeUtils.__vAlign(r, align);
    r.$text = (_text) => __text(r, _text);
    r.$rotateText = (degrees, x, y) => __rotateText(r, degrees, x, y);

    r.$clearText = () => {
        r.childNodes.forEach(node => r.removeChild(node))
    }

    return r;
}

function __text(r, _text) {
    if (_text == undefined) {
        if (r.childNodes.length != 0 && r.childNodes[0].tagName == "textPath") {
            return r.childNodes[0].textContent;
        }
        return null
    }

    const refId = r.$pathRefId();
    if (refId == undefined) {
        console.trace("Unable to set textAlongPath text. refId is undefined")
        return null
    }

    let textpathNode = $svgNode("textPath", r)
    textpathNode.$class("text-path");
    textpathNode.$attr("href", `#${refId}`);
    textpathNode.textContent = _text;

    textpathNode.$textAnchor = function (anchor) {
        if (anchor == undefined) {
            return textpathNode.$attr("text-anchor");
        }
        textpathNode.$attr("text-anchor", anchor);

        return r;
    }
    return r;
}

function __rotateText(r, degrees, x, y) {
    if (r.childNodes.length == 0 || r.childNodes[0].tagName != "textPath") {
        // There is no textPath so use the x and y values
        r.$attr("transform", `rotate(${degrees} ${x}, ${y})`);

        return r;
    }

    const textpathNode = r.childNodes[0];
    const pathRefId = textpathNode.$attr("href").substring(1);
    const pathNode = $id(pathRefId);

    if (pathNode === null) {
        console.log(`textAlongPath[$rotateText] Unable to find pathNode. textAlongPathId: ${r.$id()}. pathRefId: ${pathRefId}`)
        return r;
    }

    if (pathNode.$x && pathNode.$y) {
        r.$attr("transform", `rotate(${degrees} ${pathNode.$x() + x}, ${pathNode.$y() + y})`);
    } else {
        r.$attr("transform", `rotate(${degrees} ${x}, ${y})`);
    }

    return r;
}