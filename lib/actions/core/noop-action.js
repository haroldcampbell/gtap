import {
  $isTruthy,
} from '../../utils'

/**
 * @function $noop
 * @param {Callback} callback - An optional callback that is called when
 * the action parameter is triggered for the action.
 *
 * @return {Object} Intent meta-data
 */
export function $noop(callback) {
  return {
    name: "noop",
    data: null,
    noAnimate: true,

    action(visuals) {
      if ($isTruthy(callback)) {
        callback(visuals);
      }
    }
  };
}