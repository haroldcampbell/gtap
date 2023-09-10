/**
 * Sets the x and y value of the visuals
 * @function $xy
 * @param {Array} data - [x, y] that is used to set the $x and $y amount for the shape.
 * @return {Object} Intent meta-data
 */
export function $xy(data) {
    return {
        name: "xy",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            const tempData = getDataStep();

            if (!isArray(data)) {
                console.log(`Error: data must be an [x, y] array`);
                return;
            }

            let allArray = true;
            tempData.forEach(item => {
                if (!isArray(item)) {
                    allArray = false;
                }
            });

            if (allArray) {
                if (visuals.shapeNodes.length > tempData.length) {
                    console.log("Error: [[$x, $y], ...] data is less than number of nodes")
                    return
                }

                visuals.shapeNodes.forEach((v, index) => {
                    if (tempData[index].length < 2) {
                        console.log(`Error: data must be an [x, y] array`)
                        return
                    }
                    v.$x(tempData[index][0]);
                    v.$y(tempData[index][1]);
                });

                return
            }

            visuals.shapeNodes.forEach(v => {
                v.$x(tempData[0]);
                v.$y(tempData[1]);
            });
        }
    };
}

const isArray = arr => arr instanceof Array;