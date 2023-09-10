// import {
//     text,
// } from '../nodes/gtap-nodes';

// import {
//     createVisual,
// } from './create-visual'

// /**
//  * Describes a visual that contains a single label.
//  *
//  * @method $label
//  *
//  * @param {String} textContent - The text that will be displayed
//  * @param {*} actionsArray
//  *
//  * @return {Object} the newly created visual
//  */
// export const $labelWithWrapping = function (textContent, actionsArray) {
//     let visual = createVisual();

//     visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator)
//         .withActions(actionsArray)
//         .withSVGShapeCreator((container) => {
//             return text(container)
//                 .$x(0)
//                 .$y(0)
//                 .$text(textContent)
//                 .$class("text label");
//         });

//     return visual
// }