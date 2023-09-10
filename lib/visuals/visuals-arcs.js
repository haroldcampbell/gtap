import {
    arc,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of disjoint arcs.

  @method $arcs

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $arcs = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return arc(container)
                .$class("arc");
        });
}