import {
    _$,
    addShapeNode,
} from '../gtap-dom'

/**
 * Creates a path SVG element.
 *
 * @function path

 * @param {string} parentId - The id of the parent or the parent element itself
 *  that the path element will be added to.
 * @param {string} [id] - The id of the new path element.

 * @return {Object} - The newly created path element.
 */
export function path(parentId, id = null) {
    let p = addShapeNode(parentId, id, "path");

    p.$d = _$.__attrText(p, "d");
    p.$strokeWidth = _$.__attr(p, "stroke-width");
    p.$attr("stroke-linecap", "round");
    p.$path = (p1, p2, isSmooth) => pathRenderer(p, p1, p2, isSmooth);
    /**
     * @method $bezierPathClosed
     * @param {Array} points - array of point nodes
     * @param {number} curveLength - how much should this be curved
     * @return {string} - a path strings
     * */
    p.$bezierPathClosed = (points, curveLength) => bezierSmootherClosed(points, curveLength);
    p.$bezierPathOpen = (points, curveLength) => bezierSmootherOpen(points, curveLength);
    p.$connectedPointsOnly = (points, isDiscontinuous, data) => connectedPointsOnly(points, isDiscontinuous, data);

    return p;
}

// draws a path
const pathRenderer = (p, p1, p2, isSmooth) => {
    if (isSmooth == null || !isSmooth) {
        pathDirect(p, p1, p2);

        return p;
    }

    let w = p2.x - p1.x;
    let h = p2.y - p1.y;
    let w2 = w / 2;
    let h2 = h / 2;

    if (w2 > h2) {
        pathSmoothX(p, p1, w, h, w2);
    } else {
        pathSmoothY(p, p1, w, h, h2);
    }

    return p;
};

// path between two points
const pathDirect = (p, p1, p2) => {
    const _path = `M${p1.x}, ${p1.y} L${p2.x}, ${p2.y}`;
    p.$d(_path);
};

// Smooth along x-axis
const pathSmoothX = (p, p1, w, h, w2) => {
    const _path = `M${p1.x},${p1.y} c${w2},${0} ${w2},${h} ${w},${h}`;
    p.$d(_path);
};

// Smooth along y-axis
const pathSmoothY = (p, p1, w, h, h2) => {
    const _path = `M${p1.x},${p1.y} c${0},${h2} ${w},${h2} ${w},${h}`;
    p.$d(_path);
};

/**
 * Returns the length and angle between two points
 *
 * @param {Point} pointA
 * @param {Point} pointB
 */
const calcVector = (pointA, pointB) => {
    const lengthX = pointB.x - pointA.x
    const lengthY = pointB.y - pointA.y

    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

const parallelVector = (point, vector, length, isReversed = false) => {
    const angle = vector.angle + (isReversed ? Math.PI : 0);
    const x = point.x + Math.cos(angle) * length; //vector.length * 0.5;
    const y = point.y + Math.sin(angle) * length; //vector.length * 0.5;

    return {
        y,
        x,
    }
}

function bezierSmootherClosed(shapeNodes, curveLength = 10) {
    if (shapeNodes.length < 3) {
        return ""
    }

    let currNode;
    let currIndex;
    let prevIndex;
    let prevNode;
    let nextIndex;
    let nextNode;

    let currPoint = shapeNodes[0];
    let _path = `M ${currPoint.x},${currPoint.y} C`;

    for (let index = 1; index <= shapeNodes.length; index++) {
        // ctrl-1
        currIndex = index - 1;
        prevIndex = currIndex - 1;
        nextIndex = currIndex + 1;
        currNode = shapeNodes[currIndex] || shapeNodes[shapeNodes.length - 1];
        prevNode = shapeNodes[prevIndex] || shapeNodes[shapeNodes.length - 2];
        nextNode = shapeNodes[nextIndex] || shapeNodes[0];
        const ctrlVec1 = calcVector(prevNode, nextNode);
        const ctrlPoint1 = parallelVector(currNode, ctrlVec1, curveLength);

        // ctrl-2
        currIndex = index;
        prevIndex = currIndex - 1;
        nextIndex = currIndex + 1;
        currNode = shapeNodes[currIndex] || shapeNodes[0];
        prevNode = shapeNodes[prevIndex];
        nextNode = shapeNodes[nextIndex] || shapeNodes[1];
        const ctrlVec2 = calcVector(prevNode, nextNode);
        const ctrlPoint2 = parallelVector(currNode, ctrlVec2, curveLength, true);

        currPoint = currNode;

        _path = `${_path}  ${ctrlPoint1.x} ${ctrlPoint1.y} ${ctrlPoint2.x} ${ctrlPoint2.y} ${currPoint.x} ${currPoint.y}`;
    }

    return _path;
}

function bezierSmootherOpen(shapeNodes, curveLength = 10) {
    if (shapeNodes.length < 3) {
        return ""
    }

    let currNode;
    let currIndex;
    let prevIndex;
    let prevNode;
    let nextIndex;
    let nextNode;

    let currPoint = shapeNodes[0];
    let _path = `M ${currPoint.x},${currPoint.y} `;

    for (let index = 1; index < shapeNodes.length; index++) {
        // ctrl-1
        currIndex = index - 1;
        prevIndex = currIndex - 1;
        nextIndex = currIndex + 1;
        currNode = shapeNodes[currIndex] || shapeNodes[shapeNodes.length - 1];
        prevNode = shapeNodes[prevIndex] || shapeNodes[shapeNodes.length - 2];
        nextNode = shapeNodes[nextIndex] || shapeNodes[0];
        const ctrlVec1 = calcVector(prevNode, nextNode);
        const ctrlPoint1 = parallelVector(currNode, ctrlVec1, curveLength);

        // ctrl-2
        currIndex = index;
        prevIndex = currIndex - 1;
        nextIndex = currIndex + 1;
        currNode = shapeNodes[currIndex] || shapeNodes[0];
        prevNode = shapeNodes[prevIndex];
        nextNode = shapeNodes[nextIndex] || shapeNodes[1];
        const ctrlVec2 = calcVector(prevNode, nextNode);
        const ctrlPoint2 = parallelVector(currNode, ctrlVec2, curveLength, true);

        currPoint = currNode;

        if (prevIndex == 0) {
            _path = `${_path} C ${currPoint.x} ${currPoint.y} ${ctrlPoint2.x} ${ctrlPoint2.y} ${currPoint.x} ${currPoint.y}`;
            continue
        }

        if (nextIndex == shapeNodes.length) {
            _path = `${_path} C ${ctrlPoint1.x} ${ctrlPoint1.y} ${currPoint.x} ${currPoint.y} ${currPoint.x} ${currPoint.y}`;
            continue
        }

        _path = `${_path} C ${ctrlPoint1.x} ${ctrlPoint1.y} ${ctrlPoint2.x} ${ctrlPoint2.y} ${currPoint.x} ${currPoint.y}`;
    }

    return _path;
}

function connectedPointsOnly(shapeNodes, isDiscontinuous, data) {
    if (shapeNodes.length < 2) {
        return ""
    }

    const moveTo = (prevPath, currPoint) => `${prevPath} M ${currPoint.x},${currPoint.y} `;
    const lineTo = (prevPath, currPoint) => `${prevPath} L ${currPoint.x},${currPoint.y} `;

    if (!isDiscontinuous) {
        let _path = moveTo("", shapeNodes[0]);

        for (let index = 1; index < shapeNodes.length; index++) {
            _path = lineTo(_path, shapeNodes[index]);
        }
        return _path;
    }

    let index = 0;

    // Find the start of the Path
    while (data.rawDataItem(index) == null) {
        index++;
    }

    let _path = moveTo("", shapeNodes[index]);

    let didBreak = false;
    for (; index < data.itemCount(); index++) {
        if (data.rawDataItem(index) == null) {
            didBreak = true;
            continue;
        }

        if (didBreak) {
            didBreak = false;
            _path = moveTo(_path, shapeNodes[index]);
            continue;
        }

        _path = lineTo(_path, shapeNodes[index]);
    }

    return _path;
}