import {
  $isTruthy
} from '../../utils'

/**
 * Scale the height based on the value of the largest item.
 *
 * @function $maxHeight
 * @param {Number} data - the maximum height to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxHeight(data) {
  return {
    name: "maxHeight",
    getData: () => data,

    action(visuals, getDataStep = this.getData) {
      /* Scale the items by the height and align using the max height */
      visuals.shapeNodes.forEach(v => {
        if (v._dataValue === null) {
          return;
        }

        // If the dataValue is an array, scale the array and use
        // the scaled array as the height value
        if ($isTruthy(v._dataValue.map)) {
          let values = v._dataValue.map(item => item * getDataStep());
          v.$height(values)
          return
        }
        // If the dataValue is just a single value, then scale it and use
        // that single value as the height value.
        let h = v._dataValue * getDataStep();
        v.$height(h)
      });
    }
  };
}