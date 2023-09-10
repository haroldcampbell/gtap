/**
 * Sets the y-distance between the visuals
 *
 * @function $yOffset
 * @param {Number} data - the vertical offset amount
 * @return {Object} Intent meta-data
 */
export function $yOffset(data) {
  return {
    name: "yOffset",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      let [first, ...rest] = visuals.shapeNodes;
      let y = first.$y() + first.$height() + getDataStep();

      rest.forEach(v => {
        v.$y(y);
        y = y + getDataStep() + v.$height();
      });
    }
  };
}