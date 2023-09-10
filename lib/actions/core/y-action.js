/**
 * Sets the y value of the visuals
 *
 * @function $y
 * @param {Number} data - sets the $y amount for the shape
 * @return {Object} Intent meta-data
 */
export function $y(data) {
    return {
        name: "y",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            visuals.shapeNodes.forEach(v => {
                v.$y(getDataStep());
            });
        }
    };
}