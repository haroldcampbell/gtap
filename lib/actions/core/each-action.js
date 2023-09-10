import {
    $isTruthy,
} from '../../utils'

/**
 * @function $each
 * @param {Callback} callback - An optional callback that is called when
 * the action parameter is triggered for the action.
 *
 * @return {Object} Intent meta-data
 */
export function $each(callback) {
    return {
        name: "each",
        data: null,
        noAnimate: true,

        action(visuals) {
            if ($isTruthy(callback)) {
                visuals.shapeNodes.forEach((v, index) => {
                    callback(v, index, visuals);
                });
            }
        }
    };
}