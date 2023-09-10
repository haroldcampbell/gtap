/**
 * Sets the y-distance between the visuals and is independent of the height of the visual
 * @function $yIncrement
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $yIncrement(data) {
  return {
    name: "yIncrement",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      let [first, ...rest] = visuals.shapeNodes;
      let y = first.$y() + getDataStep();

      rest.forEach(v => {
        v.$y(y);
        y = y + getDataStep();
      });
    }
  };
}