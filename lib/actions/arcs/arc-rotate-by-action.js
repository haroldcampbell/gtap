import {
  cloneShapeProperties
} from '../utils'

/**
  Rotates each arc by the specified amount around the radius of the arc.

  @function $arcRotateBy
  @param {Number | Callback}  data - the amount in degrees by which the arcs should be
    rotated. Positive numbers are clockwise, negative numbers are
    counter-clockwise.

  @return {Object}
*/
export function $arcRotateBy(data) {
  return {
    name: "arcRotateBy",
    getData: () => data,
    model: null,

    action(visuals, getDataStep = this.getData) {
      this.model = cloneShapeProperties(this.model, visuals, v => v.$startAngle())

      if (typeof data === "function") {
        /* data is a callback that is being used to set the style */
        visuals.shapeNodes.forEach((v, index) => {
          const start = this.model[index] + data(index, v);

          v.$startAngle(start)
          v.__renderPath();
        });
        return
      }


      visuals.shapeNodes.forEach((v, index) => {
        const start = this.model[index] + getDataStep();
        v.$startAngle(start);
        v.__renderPath();
      });
    } // action
  } // return
}