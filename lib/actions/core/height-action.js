/**
 * Sets the height of all the visuals.
 *
 * @function $height
 *
 * @param {Number} data - the height of the visuals
 * @param {Bool} autoCenter - attempt to change the width around the y property
 *    Useful for the Rect visual
 *
 * @return {Object} Intent meta-data
 */
export function $height(data, autoCenter = false) {
  return {
    name: "height",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        v.$height(getDataStep(), autoCenter)
      });
    }
  }
}