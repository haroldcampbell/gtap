/**
 * Add an offset to the width of each subsequent visual.
 *
 * @function $widthOffset
 *
 * @param {Number} data - the offset amount to be added to the width of the visuals
 * @param {Bool} autoCenter - attempt to change the width around the x property
 *    Useful for the Rect visual
 *
 * @return {Object} Intent meta-data
 */
export function $widthOffset(data, autoCenter = false) {
    return {
        name: "widthOffset",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            let start = visuals.shapeNodes[0].$width();
            visuals.shapeNodes.forEach(v => {
                v.$width(start, autoCenter)
                start += getDataStep();
            });
        }
    }
}