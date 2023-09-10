/**
 * Scales the width and height based on the value of the largest item.
 *
 * @function $max
 * @param {Number} data - the maximum width and height to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $max(data) {
  return {
    name: "max",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        let m = v._dataValue * getDataStep();
        v.$height(m)
        v.$width(m)
      })
    }
  };
}