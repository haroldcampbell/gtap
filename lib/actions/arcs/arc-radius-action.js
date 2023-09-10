/**
 * Sets the radius each arc
 *
 * @function $arcRadius
 * @param {Number | Callback} data - the radius of the arc
 * @return {Object}
 */
export function $arcRadius(data) {
    return {
        name: "radius",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            if (typeof data === "function") {
                /* data is a callback that is being used to set the style */
                visuals.shapeNodes.forEach((v, index) => {
                    v.$radius(data(index, v))
                    v.__renderPath();
                });
                return
            }

            for (let v of visuals.shapeNodes) {
                v.$radius(getDataStep());
                v.__renderPath();
            }
        } // action
    } // return
}