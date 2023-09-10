import {
    svg
} from './../../nodes/nodes-svg'

import {
    $id
} from '../../gtap-dom'

import {
    $isTruthy
} from '../../utils'
/**
 * Adds a group element with the @id set to name.
 *
 * @function $group
 * @param {String} name - the id of the group
 * @return {Object} Intent meta-data
 *
 * @example
 *      // All of the ellipses will be added to a group with an id "e1".
 *      container("c4", c => {
 *          c.ellipses(ellipsesData, [$collectInSVG("e1")])
 *      })
 */
export function $collectInSVG(name) {
    return {
        name: "collectInSVG",
        data: name,
        noAnimate: true,
        svgCreator: (parent, name) => svg(parent, name),

        action(visuals) {
            if (visuals.shapeNodes.length == 0) {
                return;
            }

            let parent = visuals.shapeNodes[0].$parentElm;
            let svgNode = $id(name);

            if (!$isTruthy(svgNode)) {
                svgNode = this.svgCreator(parent, name);
            }

            visuals.shapeNodes.forEach(v => {
                svgNode.appendChild(v);
            });
        }
    }
}