/**
 * Sets the x-distance between the visuals and is affected by the width of the visual
 *
 * @function $xOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $xOffset(data) {
  return {
    name: "xOffset",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      let [first, ...rest] = visuals.shapeNodes;
      let x = first.$x() + first.$width() + getDataStep();

      rest.forEach(v => {
        v.$x(x);
        x = x + getDataStep() + v.$width();
      });
    }
  };
}