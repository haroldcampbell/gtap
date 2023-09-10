/**
 * Sets the width of all the visuals.
 *
 * @function $width
 *
 * @param {Number} data - the width of the visual
 * @param {Bool} autoCenter - attempt to change the width around the x property
 *    Useful for the Rect visual
 *
 * @return {Object} Intent meta-data
 */
export function $width(data, autoCenter = false) {
  return {
    name: "width",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        v.$width(getDataStep(), autoCenter)
      });
    }
  }
}