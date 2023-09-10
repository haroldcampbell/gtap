import * as gtap from '../../../lib/gtap'
import {
    setupFixture
} from './_common.fixture'

import test from "tape"

test("$addText", testCase => {
    testCase.test("Add text from short text array", t => {
        const expectedStyle = "fake-css-style";
        const expectedTextArray = ["too", "short"];

        const visual = setupFixture().visual;

        gtap.$addText(expectedTextArray, expectedStyle).action(visual);

        const actualText = Array.from(visual.container.children).map(textNode => textNode.$text())
        const actualStyle = Array.from(visual.container.children).map(textNode => textNode.$style())

        t.deepEqual(actualText, expectedTextArray, "should not add text nodes with text");
        t.equal(actualStyle.length, expectedTextArray.length, "should only create as many text nodes as possible");
        t.end()
    });

    testCase.test("Ignore text from long text array", t => {
        const expectedStyle = "fake-css-style";
        const expectedTextArray = ["way", "longer", "than", "there", "are", "svgShape", "nodes"];

        const visual = setupFixture().visual;

        gtap.$addText(expectedTextArray, expectedStyle).action(visual);

        const actualText = Array.from(visual.container.children).map(textNode => textNode.$text())
        const actualStyle = Array.from(visual.container.children).map(textNode => textNode.$style())

        t.deepEqual(actualText, ["way", "longer", "than", "there"], "should add text nodes with text");
        t.notEqual(actualStyle.length, expectedTextArray.length, "should only create as many text nodes as possible");
        t.equal(actualStyle.length, visual.shapeNodes.length, "should only create equal to number of shapeNodes");
        t.end()
    });

    testCase.test("text is added directly to the container", t => {
        const expectedStyle = "fake-css-style";
        const expectedTextArray = ["Hello", "World", "I'm", "Harold"];

        const visual = setupFixture().visual;

        gtap.$addText(expectedTextArray, expectedStyle).action(visual);

        const actualText = Array.from(visual.container.children).map(textNode => textNode.$text())
        const actualStyle = Array.from(visual.container.children).map(textNode => textNode.$style())
        const actualPositions = Array.from(visual.container.children).map(textNode => [textNode.$x(), textNode.$y()])

        t.deepEqual(actualText, expectedTextArray, "should add text nodes with text");
        t.deepEqual(actualStyle, [expectedStyle, expectedStyle, expectedStyle, expectedStyle], "should set css style for nodes");
        t.deepEqual(actualPositions, [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ], "should set a default position for each node");
        t.end()
    });

    testCase.test("offsets are applied to position", t => {
        const visual = setupFixture().visual;
        const expectedTextArray = ["Hello", "World", "I'm", "Harold"];

        /** Set the position of the visuals so that I can test the offsets */
        gtap.$xy([8, 10]).action(visual);
        gtap.$xOffset(2).action(visual);
        gtap.$yOffset(15).action(visual);

        const xOffset = 5; /** Offsets for the text nodes */
        const yOffset = 10;
        /** Get the expected positions of the text nodes */
        const actualShapePositions = visual.shapeNodes.map(v => [v.$x(), v.$y()])
        const expectedTextPositions = actualShapePositions.map(xy => [xy[0] + xOffset, xy[1] + yOffset])

        /** Add the text nodes */
        gtap.$addText(expectedTextArray, null, xOffset, yOffset).action(visual);

        /** Extract the position of the text nodes */
        const actualPositions = Array.from(visual.container.children).map(textNode => [textNode.$x(), textNode.$y()])

        t.deepEqual(actualPositions, expectedTextPositions, "should offset the position of each text node based on the position of visuals");
        t.end()
    });
});