import * as nodes from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a vertical line visual.

  @method $vLine

  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $vLine = function (actionsArray) {
    let visual = createVisual()

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return nodes.vLine(container)
                .$x(0)
                .$y(0)
                .$class("line");
        });

    return visual;
}