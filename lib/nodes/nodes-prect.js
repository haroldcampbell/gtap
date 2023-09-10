import {
    _$,
    addShapeNode,
} from '../gtap-dom'

import * as nodeUtils from "./nodes-utils"

/**
 * Creates a rect made from SVG path element at the specifed (x, y) point.
 *
 * This allows to have independent rounded cornders
 *
 * @function prect
 *
 * @param {String} parentId - The id or element that the path element
 *  will be added to.
 * @param {String} id
 *
 * @return {Object} - The newly created rect element.
 */
export function prect(parentId, id = null) {
    let node = addShapeNode(parentId, id, "path");

    node.$d = _$.__attrText(node, "d");
    node.$attr("stroke-linecap", "round");
    node.$strokeWidth = _$.__attr(node, "stroke-width");

    /**
     * draws the rect based on the dimensions specified
     * @param {x:number, y:number} point
     * @param {width:number, height:number} size
     * @param {c1:number, c2:number, c3:number, c4:number} corners represents the topLeft, topRight, bottomRight, bottomLeft corners
     */
    node.$draw = (point, size, corners) => {
        pathRender(node, point, size, corners);
    }

    return node;
}

function ensure(value) {
    if (value === undefined) {
        return 0;
    }

    return value;
}
function pathRender(node, point, size, corners) {
    let { c1, c2, c3, c4 } = corners;

    c1 = ensure(c1);
    c2 = ensure(c2);
    c3 = ensure(c3);
    c4 = ensure(c4);

    const c1Corner = `q ${0} -${c1} ${c1} -${c1}`; // top-left corner
    const c2Corner = `q ${c2} 0 ${c2} ${c2}`; // top-right corner
    const c3Corner = `q 0 ${c3} -${c3} ${c3}`; // bottom-right corner
    const c4Corner = `q -${c4} 0 -${c4} -${c4}`; // bottom-left corner


    const origin = `M${point.x + c1}, ${point.y}`;
    const topLine = `h${size.width - c2 - c1}`;
    const rightLine = `v${size.height - (c3 + c2)}`;
    const bottomLine = `h-${size.width - (c4 + c3)}`;
    const leftLine = `v-${size.height - c4 - c1}`;

    const _path = `${origin} ${topLine} ${c2Corner} ${rightLine} ${c3Corner} ${bottomLine} ${c4Corner} ${leftLine} ${c1Corner}`;

    node.$d(_path);
}