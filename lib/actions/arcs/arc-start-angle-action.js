/**
  Sets the start angle of each arc to the specified data

  @function $arcStartAngle

  @param {Number | Callback} data - the amount in degrees from where each arc should start.
    Positive numbers are clockwise, negative numbers are counter-clockwise.

  @return {Object}
*/
export function $arcStartAngle(data) {
  return {
    name: "arcStartAngle",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      if (typeof data === "function") {
        /* data is a callback that is being used to set the style */
        visuals.shapeNodes.forEach((v, index) => {
          v.$startAngle(data(index, v))
          v.__renderPath();
        });
        return
      }

      for (let v of visuals.shapeNodes) {
        v.$startAngle(getDataStep());
        v.__renderPath();
      }
    } // action
  } // return
}