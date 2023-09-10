import * as nodes from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
 * Embeds an svg into the SVG
 *
 * @method $svg
 *
 * @param {String} id
 * @param {Array} actionsArray - array of actions
 *
 * @return {Object}
 */
export const $svg = function (id, actionsArray) {
    let visual = createVisual();

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return nodes.svg(container)
                .$id(id)
                .$x(0)
                .$y(0)
                .$class("nested-svg");
        });

    return visual;
}