/**
  Defines the gap between the spans

  @function $arcSpanInterGap
  @param {Number} data - the gap added between each arc.

  @return {Object}

  Note:
    $arcSpanInset changes the overall length of the arc (i.e. the $arcSpan()).
*/
export function $arcSpanInterGap(data) {
  return {
    name: "arcSpanInterGap",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      if (visuals.shapeNodes.length < 2) {
        return;
      }

      let nextStartAngle = 0;
      let gap = getDataStep();
      let numberGaps = visuals.shapeNodes.length - 1;
      let gapSpread = (numberGaps * gap) / visuals.shapeNodes.length;

      visuals.shapeNodes.forEach((v, index)=> {
        const arcSpan = v.$arcSpan();

        v.$startAngle(nextStartAngle);
        v.$arcSpan(arcSpan - gapSpread);

        v.__renderPath();
        nextStartAngle += arcSpan - gapSpread + gap;
      })
    } // action
  } // return
}