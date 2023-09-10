import {
    svg
} from "../../lib/nodes/nodes-svg"

// import * as utils from "../../lib/utils"
import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = svg(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("svg node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "svg");
    nodeFixtureUtils.testDefaultClass(setupFixture().shape, testCase, null);
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$x(), 0, "$x() should be 0 by default");
        t.equal(shape.$y(), 0, "$y() should be 0 by default");
        t.deepEqual(shape.$xy(), [0, 0], "$xy() should be [0,0] by default");
        t.deepEqual(shape.$toPoint(), {
            x: 0,
            y: 0
        }, "$toPoint() should have default");
    });

    nodeFixtureUtils.testXProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testYProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testXY(setupFixture().shape, testCase);
    nodeFixtureUtils.testToPoint(setupFixture().shape, testCase);

    nodeFixtureUtils.testWidthProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testHeightProperty(setupFixture().shape, testCase);
});