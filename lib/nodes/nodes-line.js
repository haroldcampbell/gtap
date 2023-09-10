import {
    _$,
    addShapeNode,
} from '../gtap-dom'

/**
 * Creates a line SVG element that runs from (x1, y1) to (x2, y2).
 *
 * @function line
 *
 * @param {String} parentId - The id or element that the line element
 *  will be added to.
 * @param {String} [id]
 * @param {Number} [x1] - specifies the x-coordinate of first point.
 * @param {Number} [y1] - specifies the y-coordinate of first point.
 * @param {Number} [x2] - specifies the x-coordinate of second point.
 * @param {Number} [y2] - specifies the y-coordinate of second point.
 *
 * @return {Object} - The newly created line element
 */
export function line(parentId, id, x1, y1, x2, y2) {
    let l = addShapeNode(parentId, id, "line");

    l.$x1 = _$.__attr(l, "x1");
    l.$x2 = _$.__attr(l, "x2");
    l.$y1 = _$.__attr(l, "y1");
    l.$y2 = _$.__attr(l, "y2");

    l.$x1(x1);
    l.$y1(y1);
    l.$x2(x2);
    l.$y2(y2);

    l.$point1 = (x, y) => {
        if (x === undefined) {
            return {
                x: l.$x1(),
                y: l.$y1()
            }
        }

        if (typeof x === "object" && x.x != undefined && x.y != undefined) {
            // Most likely $toPoint was passed an object {x:number, y:number}
            l.$x1(x.x);
            l.$y1(x.y);
            return
        }

        l.$x1(x);
        l.$y1(y);
    }

    l.$point2 = (x, y) => {
        if (x === undefined) {
            return {
                x: l.$x2(),
                y: l.$y2()
            }
        }

        if (typeof x === "object" && x.x != undefined && x.y != undefined) {
            // Most likely $toPoint was passed an object {x:number, y:number}
            l.$x2(x.x);
            l.$y2(x.y);
            return
        }

        l.$x2(x);
        l.$y2(y);
    }

    return l;
}