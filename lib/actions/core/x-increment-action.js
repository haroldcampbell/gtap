/**
 * Sets the x-distance between the visuals independently of the width of the visual
 *
 * @function $xIncrement
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $xIncrement(data) {
  return {
    type: "effect",
    name: "xIncrement",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      let [first, ...rest] = visuals.shapeNodes;
      let x = first.$x() + getDataStep();

      rest.forEach(v => {
        v.$x(x);
        x = x + getDataStep();
      });
    }
  };
}