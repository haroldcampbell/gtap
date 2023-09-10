
import {
    chord,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of disjoint chords.

  @method $chords

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $chords = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return chord(container)
                .$class("chord");
        });
}