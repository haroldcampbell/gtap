/**
 * Sets the stroke line-cap of the visual.
 *
 * @function $strokeLineCap
 *
 * @param {LineCap} data - the type of line-cap for the stroke of all visuals
 * Valid options for data: butt | round | square
 *
 * @return {Object} Intent meta-data
 */
export function $strokeLineCap(data) {
  return {
    name: "strokeLineCap",
    noAnimate: true,
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      if (!this.isValidLineCap(data)) {
        console.error("Invalid LineCap")
        return;
      }

      visuals.shapeNodes.forEach(v => {
        v.$attr("stroke-linecap", getDataStep())
      })
    },

    isValidLineCap(value) {
      return Object.values(LineCap).includes(value);
    }
  };
}

export const LineCap = {
  BUTT: "butt",
  ROUND: "round",
  SQUARE: "square"
}