import {
  $isTruthy
} from '../../utils'

/**
 * Scale the width based on the value of the largest item. This intent can
 * *ONLY* be applied to data has a width attribute. See the example below.
 *
 * @function $maxWidth
 *
 * @param {Number} data - the maximum width to which visuals will be scaled
 * @return {Object} Intent meta-data
 * @example
 *   var barsData = $data([50, 20, 30, 10, 50], "width");
 *   container("c4", c => {
 *     c.bars(barsData, [$maxWidth(50), $x(50), $yOffset(30), $height(20)])
 *   })
 */
export function $maxWidth(data) {
  return {
    name: "maxWidth",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      visuals.shapeNodes.forEach(v => {
        if (v._dataValue === null) {
          return;
        }

        if ($isTruthy(v._dataValue.map)) {
          let values = v._dataValue.map(item => item * getDataStep());
          v.$width(values)
          return
        }

        let w = v._dataValue * getDataStep();
        v.$width(w)
      })
    }
  };
}