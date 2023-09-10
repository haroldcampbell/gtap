import {
    vLine
} from "../../lib/nodes/nodes-vline"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = vLine(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("vLine node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "line");
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$x(), null, "$x() should have default value set");
        t.equal(shape.$x1(), null, "$x1() should have default value set");
        t.equal(shape.$x2(), null, "$x2() should have default value set");

        t.equal(shape.$y(), null, "$y() should have default value set");
        t.equal(shape.$y1(), null, "$y1() should have default value set");
        t.equal(shape.$y2(), null, "$y2() should have default value set");

        t.equal(shape.$height(), null, "$height() should have default value set");
    });
    nodeFixtureUtils.testXProperty(setupFixture().shape, testCase, (shape, t, expectedValue) => {
        t.equal(shape.$x1(), expectedValue, "$x1() should be set to $x() value");
        t.equal(shape.$x2(), expectedValue, "$x2() should be set to $x() value");
    });
    nodeFixtureUtils.testYProperty(setupFixture().shape, testCase, (shape, t, expectedValue) => {
        t.equal(shape.$y1(), expectedValue, "$y1() should be set to $y() value");
        t.equal(shape.$y2(), expectedValue, "$y2() should be set to $y() value");
    });

    testCase.test("$width() property", t => {
        const shape = setupFixture().shape;
        const startValue = 20;
        const offsetValue = 220;
        const arbitraryValue = 132;

        shape.$x(arbitraryValue);
        shape.$y(startValue);
        shape.$height(offsetValue);
        const expectedValued = startValue + offsetValue;

        t.equal(shape.$height(), offsetValue, "$height() should be to new $height() value");
        t.equal(shape.$y1(), startValue, "$y1() should be set starting value");
        t.equal(shape.$y2(), expectedValued, "$y2() should be offset by height");

        t.equal(shape.$x(), arbitraryValue, "$x() should be not change");

        t.end();
    });
});