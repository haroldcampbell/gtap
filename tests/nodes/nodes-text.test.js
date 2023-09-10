import {
    text
} from "../../lib/nodes/nodes-text"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = text(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("text node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "text");
    nodeFixtureUtils.testTextProperty(setupFixture().shape, testCase, (shape, t, expectedValue) => {
        t.equal(shape.textContent, expectedValue, "textContent should be set");
    });
});