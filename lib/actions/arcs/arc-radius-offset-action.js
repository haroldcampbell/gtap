/**
 * Increments the radius of each subsequent arc.
 * @function $arcRadiusOffset
 *
 * @param {Number} data - the offset to add to each arc's radius.
 * @return {Object}
 */
export function $arcRadiusOffset(data) {
    return {
        name: "arcRadiusOffset",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            let x = visuals.shapeNodes[0].$radius()

            for (let v of visuals.shapeNodes) {
                v.$radius(x);
                v.__renderPath();
                x = x + getDataStep();
            }
        } // action
    } // return
}