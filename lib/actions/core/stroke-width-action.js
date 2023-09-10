/**
 * Sets the stroke of the visual.
 *
 * @function $strokeWidth
 *
 * @param {Number} data - the maximum stroke of all visuals
 * @return {Object} Intent meta-data
 */
export function $strokeWidth(data) {
  return {
    name: "strokeWidth",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        v.$strokeWidth(getDataStep())
      })
    }
  };
}