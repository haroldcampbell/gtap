/**
 * Scale the x-coord based on the value of the largest item.
 *
 * @function $maxX
 * @param {Number} data - the maximum x-coord to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxX(data) {
  return {
    name: "maxX",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        let x = v._dataValue * getDataStep();
        v.$x(x)
      })
    }
  };
}