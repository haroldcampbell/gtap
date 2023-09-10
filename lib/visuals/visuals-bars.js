import {
    rect
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Describes the bar visuals.

  @method $bars

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
 */
export const $bars = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return rect(container)
                .$x(0)
                .$y(0)
                .$width(0)
                .$height(0)
                .$class("bar");
        });
}