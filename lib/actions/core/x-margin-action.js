/**
 * Shifts the x value of the visuals by the specified margin
 * Best if applied after all the other intents last
 * @function $xMargin
 * @param {Number} data - shifts the $x amount for the shape
 * @return {Object} Intent meta-data
 */
export function $xMargin(data) {
    return {
        name: "xMargin",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            visuals.shapeNodes.forEach(v => {
                v.$x(v.$x() + getDataStep());
            });
        }
    };
}