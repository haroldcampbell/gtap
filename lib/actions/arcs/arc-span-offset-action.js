/**
  An offset added between each subsequent arc. It changes the startAngle of
  subsequent arcs which creates a gap between each arc.

  @function $arcSpanOffset
  @param {Number} data - the gap added between each arc.

  @return {Object}

  Note:
    $arcSpanOffset not change the overall length of the arc, but it does alter
    the startAngle. The startAngle of the first arc remains unaffected.
*/
export function $arcSpanOffset(data) {
    return {
      name: "arcSpanOffset",
      getData: () => data,

      action(visuals, getDataStep = this.getData) {
        let start = visuals.shapeNodes[0].$startAngle();

        for (let v of visuals.shapeNodes) {
          v.$startAngle(start);
          v.__renderPath();
          start = start + v.$arcSpan() + getDataStep();
        }
      } // action
    } // return
  }