import {
    path,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of lines that's connected to other visuals.

  @method $connectingLines

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $connectingLines = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return path(container)
                .$class("path");
        });
}