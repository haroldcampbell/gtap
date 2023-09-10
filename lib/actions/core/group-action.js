import {
    group
} from './../../nodes/nodes-group'

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
 *          c.ellipses(ellipsesData, [$group("e1")])
 *      })
 */
export function $group(name) {
    return {
        name: "group",
        data: name,
        noAnimate: true,
        groupCreator: (parent, name) => group(parent, name),

        action(visuals) {
            if (visuals.shapeNodes.length == 0) {
                return;
            }

            let groupNode = $id(name);

            if (!$isTruthy(groupNode)) {
                let parent = visuals.shapeNodes[0].$parentElm;
                groupNode = this.groupCreator(parent, name);
            }

            visuals.shapeNodes.forEach(v => {
                groupNode.appendChild(v);
            });
        }
    }
}