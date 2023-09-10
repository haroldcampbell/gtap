import {
    ellipse
} from "../../lib/nodes/nodes-ellipse"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = ellipse(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("ellipse node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "ellipse");
    nodeFixtureUtils.testDefaultClass(setupFixture().shape, testCase, null);
    nodeFixtureUtils.testXProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testYProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testWidthProperty(setupFixture().shape, testCase, (shape, t, expectedValue) => {
        t.equal(shape.$rx(), expectedValue, "$width() should be able to set $rx()");
    });
    nodeFixtureUtils.testHeightProperty(setupFixture().shape, testCase, (shape, t, expectedValue) => {
        t.equal(shape.$ry(), expectedValue, "$height() should be able to set $rx()");
    });
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$x(), null, "$x() should have default value set");
        t.equal(shape.$y(), null, "$y() should have default value set");

        t.equal(shape.$height(), null, "$height() should have default value set");
        t.equal(shape.$width(), null, "$width() should have default value set");
    });

    testCase.test("$rx() property", t => {
        const shape = setupFixture().shape;

        shape.$rx(220);

        t.equal(shape.$rx(), 220, "$rx() should be able to set and read new value");
        t.equal(shape.$width(), 220, "$rx() should be able to set $width()");
        t.end();
    });
});