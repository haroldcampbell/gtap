/**
 * Scale the y-coord based on the value of the largest item.
 *
 * @function $maxY
 * @param {Number} data - the maximum y-coord to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxY(data) {
  return {
    name: "maxY",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        let y = v._dataValue * getDataStep();
        v.$y(y)
      })
    }
  };
}