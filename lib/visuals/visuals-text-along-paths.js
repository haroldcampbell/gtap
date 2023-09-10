import {
    textAlongPath,
} from '../nodes/gtap-nodes';

import {
    $svgNode
} from '../gtap-dom';

import {
    createVisual,
    prepareVisual,
    applyVisualActions,
} from './create-visual';

import * as utils from '../utils'

/**
  Creates a series of text elements along paths defined by the shape.

  @method $textAlongPaths

  @param {Object} pathToFollow - the shapes that will be followed
  @param {Object} data
  @param {Array} actionsArray - array of actions

  @return {Object}
*/
export const $textAlongPaths = function (pathToFollow, data, actionsArray) {
    const refSlug = utils.$slug();

    return createVisual()
        .withSetContainerCallback(container => {
            const defsNode = $svgNode("defs", container);

            prepareVisual(pathToFollow, defsNode)
            applyVisualActions(pathToFollow);

            defsNode.childNodes.forEach((pathNode, index) => {
                pathNode.$id(`${refSlug}-${index}`);
            });
        })
        .withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            const shape = textAlongPath(container)
                .$class("text")
                .$onData(d => {
                    const refId = `${refSlug}-${d.dataIndex}`;
                    shape.$pathRefId(refId)
                    shape.$text(d.rawDataValue);
                });

            return shape;
        });
}
