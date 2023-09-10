/**
  Determines the span of each arc based on the unit data (supplied in degrees).

  @function $arcSpanUnit
  @param {Number} data - the base unit (e.g. 60) All arcs will be a multiple of
  this base unit

  @return {Object}
*/
export function $arcSpanUnit(data) {
    return {
      name: "arcSpanUnit",
      getData: () => data,

      action(visuals, getDataStep = this.getData) {
        for (let v of visuals.shapeNodes) {
          v.$arcSpan(v._dataValue * getDataStep());
          v.__renderPath();
        }
      } // action
    } // return
  }