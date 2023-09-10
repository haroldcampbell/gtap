/**
 * Sets the x value of the visuals
 * @function $x
 * @param {Number} data - sets the $x amount for the shape
 * @return {Object} Intent meta-data
 */
export function $x(data) {
    return {
        name: "x",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            const tempData = getDataStep();

            if (data instanceof Array) {
                if (visuals.shapeNodes.length > tempData.length) {
                    console.error("Error: data in $x that is less than number of nodes")
                    return
                }

                visuals.shapeNodes.forEach((v, index) => {
                    v.$x(tempData[index]);
                });

                return
            }

            visuals.shapeNodes.forEach(v => {
                v.$x(tempData);
            });
        }
    };
}