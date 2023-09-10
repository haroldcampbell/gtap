import {
    ellipse,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Describes the ellipse visuals.

  @method $ellipses

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $ellipses = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return ellipse(container)
                .$x(0)
                .$y(0)
                .$class("ellipse");
        });
}