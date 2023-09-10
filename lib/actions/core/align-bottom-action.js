import {
  $isTruthy
} from '../../utils'

/**
 * Aligns all visuals along the bottom of the "y-axis".
 *
 * This method works best if it is called after the $maxHeight(...) method is called,
 * or after the $height() is somehow set.
 *
 * Note: The $y intent has no effect if called before this intent.
 *
 * @function $alignBottom
 * @param {[nNumber]} yBaseline - an optional yBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 *
 * @return {Object} Intent meta-data
 */
export function $alignBottom(yBaseline) {
  return {
    name: "align-bottom",
    noAnimate: true,

    action(visuals) {
      let baselineValue = yBaseline || visuals.__data.max();

      /* If the height is already set, then align based on the height */
      visuals.shapeNodes.forEach(v => {
        if (v.$alignBottom) {
          v.$alignBottom(baselineValue);
          return;
        }

        if ($isTruthy(v.$height) && $isTruthy(v.$height()) && $isTruthy(v.$height().map)) {
          let values = v.$height().map(item => baselineValue - item);
          v.$y(values);
          return;
        }

        v.$y(baselineValue - v.$height());
      });
    }
  }
}