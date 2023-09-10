/**
 * Scales the radius of each arc by the specified amount
 *
 * @function $arcMaxRadius
 *
 * @param {Number} data - The maximum amount to scale the different radii
 *
 * @return {Object}
 */
export function $arcMaxRadius(data) {
    return {
      name: "arcMaxRadius",
      getData: () => data,

      action(visuals, getDataStep = this.getData) {
        for (let v of visuals.shapeNodes) {
          const newRadius = v._dataValue * getDataStep();
          v.$radius(newRadius);
          v.__renderPath();
        }
      }
    }
  }