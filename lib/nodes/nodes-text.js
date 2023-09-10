import {
    _$,
    addShapeNode,
    $svgNode,
    $id,
} from '../gtap-dom'

import * as utils from '../utils'
import * as nodeUtils from "./nodes-utils"

import {
    rect
} from './nodes-rect'

/**
 * Creates a text SVG element
 *
 * @function text
 *
 * @param {String} parentId - The id or element that the group element
 *  will be added to.
 * @param {String} id
 * @param {*} x
 * @param {*} y
 *
 * @return {Object} - The newly created group element.
 */
export function text(parentId, id = null, x = 0, y = 0) {
    let r = addShapeNode(parentId, id, "text");

    r.$x = _$._x(r);
    r.$y = _$._y(r);
    r.$height = _$._height(r);
    r.$width = _$._width(r);

    r.$xy = function (_x, _y) {
        if (_x == undefined) {
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


    r.$size = (_w, _h) => {
        r.$width(_w);
        r.$height(_h);
    }

    /* Options are top | middle | bottom */
    r.$vAlign = (align) => nodeUtils.__vAlign(r, align);

    r.$fontSize = function (size) {
        r.$attr("font-size", size);

        return r;
    }

    r.$textAnchor = function (anchor) {
        /** anchor options: start | middle | end */
        r.$attr("text-anchor", anchor);

        return r;
    }

    r.$alignTextRadially = (maxPoints, index) => nodeUtils.__alignTextRadially(r, maxPoints, index);

    r.rawTextData = null; // Used to store the raw text so that we can wrap the text if necessary

    r.$text = function (_text) {
        if (!utils.$isTruthy(_text)) {
            return r.textContent;
        }

        r.rawTextData = _text;
        r.textContent = _text;
        return r;
    }

    r.$wrapText = (width, gapHeight = 0, breakOnWord = true) => __wrapText(r, width, gapHeight, breakOnWord);

    /* Rotate the text around itself (its own center, z-axis coming out of the screen) */
    r.$rotateText = function (degrees, x, y) {
        if (r.childNodes.length == 0 || r.childNodes[0].tagName != "textPath") {
            // There is no textPath so use the x and y values
            r.$attr("transform", `rotate(${degrees} ${x}, ${y})`);

            return r;
        }

        const textpathNode = r.childNodes[0];
        const pathRefId = textpathNode.$attr("href").substring(1);
        const pathNode = $id(pathRefId);

        if (pathNode === null) {
            console.log("textAlongPath[$rotateText] Unable to find pathNode:", pathNode)
            return r;
        }

        r.$attr("transform", `rotate(${degrees} ${pathNode.$x() + x}, ${pathNode.$y() + y})`);

        return r;
    }

    r.$textBoundingBox = () => {
        return r.getBBox();
    }

    r.$textBoxSize = () => {
        return r.getBBox();
    }

    r.$height(0);
    r.$width(0);

    r.$x(x)
    r.$y(y)

    return r;
}

function __wrapText(textNode, maxWidth, gapHeight, breakOnWord) {
    textNode.textContent = textNode.rawTextData;
    const box = textNode.$textBoundingBox();

    if (box.width <= maxWidth) {
        return;
    }

    // Remove all children
    if (textNode.textContent.length > 0) {
        textNode.textContent = "";
    }

    if (textNode.childNodes > 0) {
        textNode.childNodes.forEach(node => {
            node.remove();
        })
    }

    const lines = breakOnWord ? getLinesOnWordBoundary(textNode, maxWidth) : getLinesOnCharacterBoundary(textNode, maxWidth, box.width)
    // Add the new lines of text
    lines.forEach((str, index) => {
        const lineHeight = index * (box.height + gapHeight);
        let textSpanNode = $svgNode("tspan", textNode);
        textSpanNode.$x = _$._x(textSpanNode);
        textSpanNode.$y = _$._y(textSpanNode);

        textSpanNode.$class("text-span");
        textSpanNode.$x(textNode.$x());
        textSpanNode.$y(textNode.$y() + lineHeight);
        textSpanNode.textContent = str;
    });

    // Update the dimensions of the parent textNode
    textNode.$width(textNode.$textBoundingBox().width);
    textNode.$height(textNode.$textBoundingBox().height);
    // For debugging purpose
    // showFramingBox(textNode, maxWidth, box)
}

function getLinesOnCharacterBoundary(textNode, maxWidth, unwrappedLength) {
    const lines = [];

    const charCount = textNode.rawTextData.length;
    const numberLines = Math.ceil(unwrappedLength / maxWidth);
    const avgCharPerLine = Math.floor(charCount / numberLines);

    for (let line = 0; line < numberLines; line++) {
        const start = line * avgCharPerLine;
        const end = start + avgCharPerLine;
        const lineText = textNode.rawTextData.slice(start, end);
        lines.push(lineText)
    }

    const leftOverChars = charCount % numberLines;
    if (leftOverChars > 0) {
        const start = numberLines * avgCharPerLine;
        const end = start + leftOverChars;
        const lineText = textNode.rawTextData.slice(start, end)
        lines.push(lineText)
    }

    return lines;
}

function getLinesOnWordBoundary(textNode, maxWidth) {
    // TODO: This is a cluster fuck of code. It needs to be rfactored to be simpler
    const charCount = textNode.rawTextData.length;

    let word = "";
    const lines = [];
    let newLine = [];
    let lineWidth = 0;
    let hiddenTSpan = $svgNode("tspan", textNode);
    hiddenTSpan.$class("wrapping-hiddenTSpan");

    for (let index = 0; index < charCount; index++) {
        let char = textNode.rawTextData[index];

        if (char != " " && char != "\n") {
            word += char
            continue;
        }

        hiddenTSpan.textContent = char != "\n" ? `${word}${char}` : `${word}`;
        lineWidth += hiddenTSpan.getBBox().width;

        if (char == "\n") {
            // Handle cases when the line-break is in a
            // long word that exceeds the line length
            if (lineWidth >= maxWidth) {
                lines.push(newLine.join(""))
                newLine = [];
                newLine.push(word)
            } else {
                newLine.push(word)
            }
            lines.push(newLine.join(""))
            newLine = [];
            lineWidth = 0;
        } else if (lineWidth >= maxWidth) {
            lines.push(newLine.join(""))
            newLine = [];
            lineWidth = hiddenTSpan.getBBox().width;
            newLine.push(word)
            newLine.push(char)
        } else {
            newLine.push(word)
            newLine.push(char)
        }

        word = "";
    }

    hiddenTSpan.textContent = `${word}`;
    lineWidth += hiddenTSpan.getBBox().width;

    if (lineWidth >= maxWidth) {
        lines.push(newLine.join(""))
        newLine = [];
    }
    if (word.length > 0) {
        newLine.push(word)
    }
    if (newLine.length > 0) {
        lines.push(newLine.join(""))
    }
    hiddenTSpan.textContent = "";
    hiddenTSpan.remove();

    return lines;
}