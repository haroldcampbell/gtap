/**
 * Shifts the y value of the visuals by the specified margin
 * Best if applied after all the other intents last
 * @function $yMargin
 * @param {Number} data - shifts the $y amount for the shape
 * @return {Object} Intent meta-data
 */
export function $yMargin(data) {
  return {
    name: "yMargin",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        v.$y(v.$y() + getDataStep());
      });
    }
  };
}