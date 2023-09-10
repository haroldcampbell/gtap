import {
    segment,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of disjoint segments.

  @method $segments

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $segments = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return segment(container)
                .$class("segment");
        });
}