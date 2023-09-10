import {
    createVisual,
} from './create-visual'

/**
  Creates an wrapper visual around the specified shape.

  @method $wrappedShape

  @param {Object} shape - a gtap shape that will be initialized
  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
 */

export const $wrappedShape = function (shape, data, actionsArray) {
    return createVisual()
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return shape(container);
        });
}