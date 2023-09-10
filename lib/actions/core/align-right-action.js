import {
  $isTruthy
} from '../../utils'

/**
 * Aligns all visuals along the right of the "x-axis".
 *
 * This method works best if it is called after the $maxWidth(...) method is called,
 * or after the $width() is somehow set.

 * Note: The $x intent has no effect if called before this intent.
 *
 * @function $alignRight
 * @param {number} xBaseline - an optional xBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
export function $alignRight(xBaseline) {
  return {
    name: "alignRight",
    noAnimate: true,

    action(visuals) {
      let baselineValue = xBaseline || visuals.__data.max();

      /* If the width is already set, then align based on the width */
      for (let v of visuals.shapeNodes) {
        if ($isTruthy(v.$width) && $isTruthy(v.$width()) && $isTruthy(v.$width().map)) {
          let values = v.$width().map(w => baselineValue - w);
          v.$x(values);
          continue;
        }

        v.$x(baselineValue - v.$width());
      }
    }
  }
}