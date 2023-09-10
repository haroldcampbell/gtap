import {
    addEmptyShape,
} from '../gtap-dom'
import {
    createVisual,
} from './create-visual'

/**
  An empty, noop visual.

  @method $empty

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $empty = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return addEmptyShape();
        });
}