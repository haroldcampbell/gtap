/**
 * Scales the width and height based on the value of the largest item.
 *
 * @function $onMouseOut
 *
 * @return {Object} Intent meta-data
 */
export function $onMouseOut(callback) {
    return {
        name: "onMouseOut",
        noAnimate: true,

        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.onmouseout = (event) => {
                    callback(v, event);
                }
            })
        }
    };
}