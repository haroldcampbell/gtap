/**
 * Scales the width and height based on the value of the largest item.
 *
 * @function $onMouseOver
 *
 * @return {Object} Intent meta-data
 */
export function $onMouseOver(callback) {
    return {
        name: "onMouseOver",
        noAnimate: true,

        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.onmouseover = (event) => {
                    callback(v, event);
                }
            })
        }
    };
}