/**
 * Ensures that combined arc elements fills the specified span.
 *
 * Examples:
 *    To fill the full 360 degrees (like in a Pie Chart): $arcSpread(360)
 *    To fill only 180 degrees: $arcSpread(180)
 *
 * @function $arcSpread
 * @param {Number} data - How much should the combined arc fill.
 *
 * @return {Object}
 */
export function $arcSpread(data) {
    return {
      name: "arcSpread",
      getData: () => data,

      action(visuals, getDataStep = this.getData) {
        const maxValue = visuals.getData().max();
        const summedData = visuals.getData().summedData();
        const spanRatio = summedData / getDataStep();
        const spanFactor = maxValue / spanRatio;

        let prevStartAngle = 0;
        for (let v of visuals.shapeNodes) {
          const span = spanFactor * v._dataValue;
          v.$arcSpan(span);
          v.$startAngle(prevStartAngle);
          v.__renderPath();
          prevStartAngle = prevStartAngle + span;
        }
      } // action
    } // return
  }