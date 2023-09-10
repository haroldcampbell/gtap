import * as nodes from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
 * Embeds an image into the SVG
 *
 * @method $image
 *
 * @param {String} imageURL
 * @param {Array} actionsArray - array of actions
 *
 * @return {Object}
 */
export const $image = function (imageURL, actionsArray) {
    let visual = createVisual();

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return nodes.image(container)
                .$url(imageURL)
                .$x(0)
                .$y(0)
                .$class("image");
        });

    return visual;
}