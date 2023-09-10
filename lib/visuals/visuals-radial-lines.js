import {
    radialLine,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a series of lines with a common center

  @method $radialLines

  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $radialLines = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return radialLine(container)
                .$x(0)
                .$y(0)
                .$class("radial-line")
        });
}