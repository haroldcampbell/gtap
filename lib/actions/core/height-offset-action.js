/**
 * Add an offset to the height of each subsequent visual.
 *
 * @function $heightOffset
 *
 * @param {Number} data - the offset amount to be added to the height of the visuals
 * @param {Bool} autoCenter - attempt to change the width around the y property
 *    Useful for the Rect visual
 *
 * @return {Object} Intent meta-data
 */
export function $heightOffset(data, autoCenter = false) {
    return {
        name: "heightOffset",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            let start = visuals.shapeNodes[0].$height();
            visuals.shapeNodes.forEach(v => {
                v.$height(start, autoCenter)
                start += getDataStep();
            });
        }
    }
}