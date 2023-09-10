import {
    $isTruthy,
} from '../../utils'

/**
 * @function $logVisual
 * @param {string | Callback} data - a string or a callback that will provide the data to be logged per visual
 *
 * @return {Object} Intent meta-data
 */
export function $logVisual(data) {
    return {
        name: "log",
        data,
        noAnimate: true,

        action(visuals) {
            if ($isTruthy(data) && typeof data === "function") {
                visuals.shapeNodes.forEach((v, index) => {
                    console.log(data(v, index, visuals));
                });
                return;
            }

            console.log(data);
        }
    };
}