/**
  An inset amount that is removed from the span of each arc.
  It changes the startAngle and span creating a gap between each arc.

  @function $arcSpanInset
  @param {Number} data - the gap added between each arc.

  @return {Object}

  Note:
    $arcSpanInset changes the overall length of the arc (i.e. the $arcSpan()).
*/
export function $arcSpanInset(data) {
    return {
      name: "arcSpanOffset",
      getData: () => data,

      action(visuals, getDataStep = this.getData) {
        let nextStartAngle = getDataStep();

        visuals.shapeNodes.forEach(v => {
          const arcSpan = v.$arcSpan();

          v.$startAngle(nextStartAngle);
          v.$arcSpan(arcSpan - getDataStep() * 2);

          v.__renderPath();
          nextStartAngle += arcSpan;
        })
      } // action
    } // return
  }