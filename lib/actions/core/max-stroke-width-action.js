/**
 * Scale the stroke based on the value of the largest item.
 *
 * @function $maxStrokeWidth
 * @param {Number} data - the maximum stroke to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxStrokeWidth(data) {
  return {
    name: "maxStroke",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        let y = v._dataValue * getDataStep();
        v.$strokeWidth(y)
      })
    }
  };
}