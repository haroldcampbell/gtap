import * as nodes from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
  Creates a horizontal line visual.

  @method $hLine

  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $hLine = function (actionsArray) {
    let visual = createVisual();

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return nodes.hLine(container)
                .$x(0)
                .$y(0)
                .$class("line");
        });

    return visual;
}