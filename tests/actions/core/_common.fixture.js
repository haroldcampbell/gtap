import * as utils from "../../utils"
import * as gtap from '../../../lib/gtap'

export const setupFixture = () => {
    const data = gtap.$data([10, 20, 0, 10]);
    const visual = utils.createMockedVisual(gtap.pointNode, data);

    return {
        data: data,
        visual: visual
    };
};

/**
 * Fixture with a callback for defining properties on an empty shapeNode
 *
 * @param {Callback} callback - a function of the form (node:ShapeNode) used to create the properties on the empty shape
 * @param {[Array]} dataArray - optional array of numbers that is used to populate $data()
 * @example
 *  const visual = setupEmptyShapeFixture(node => {
 *      node.$y = gtap._$.__attr(node, "y");
 *      node.$height = gtap._$.__attr(node, "h");
 *  }).visual;
 *
 * @return {Object}
 */
export const setupEmptyShapeFixture = (callback, dataArray = null) => {
    const data = gtap.$data(dataArray || [10, 20, 0, 10]);
    const shape = utils.emptyShape(node => {
        if (callback) callback(node);
    });

    const parentElement = gtap.$id(new utils.MockHTMLNode());
    parentElement.$class("root-parent-element");

    const visual = utils.createMockedVisual(shape, data, parentElement);

    return {
        data: data,
        visual: visual,
        parentElement: parentElement,
        svgContainer: parentElement.childNodes[0]
    };
}

export const setupEmptyNodeFixture = (callback) => {
    return () => {
        let parentElement = new utils.MockHTMLNode();

        const shape = utils.emptyShape();
        const node = shape(parentElement)

        if (callback) callback(node);

        return {
            node,
            parentElement,
        }
    }
}