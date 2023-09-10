import {
    text,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
 * A visual that is a series of labels.
 *
 * @method $labels
 *
 * @param {*} data - The text that will be displayed
 * @param {*} actionsArray
 *
 * @return {Object} the newly created visual
 */
export const $labels = function (data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return text(container)
                .$x(0)
                .$y(0)
                .$class("text labels");
        });
}