import {
    $lambda
} from "./lambda-action"

/**
 * Applies the callback once for each node within the visual.
 * This is an alias for $lambda
 *
 * @param {Function} callback - Callback is of the form:
 *       function(shapeNode, shapeNodeIndex, thisAction)
 *
 * @param {Object} data - this will be passed to the callback lambda.
 *
 * @return {Object}
 */
export function $forEach(callback, data = null) {
    return $lambda(callback, data);
}