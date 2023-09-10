import {
    line
} from "../../lib/nodes/nodes-line"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = line(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("line node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "line");
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$x1(), null, "$x1() should have default value set");
        t.equal(shape.$x2(), null, "$x2() should have default value set");

        t.equal(shape.$y1(), null, "$y1() should have default value set");
        t.equal(shape.$y2(), null, "$y2() should have default value set");
    });

    testCase.test("$x() property", t => {
        const shape = setupFixture().shape;

        shape.$x1(10);
        shape.$x2(20);

        t.equal(shape.$x1(), 10, "$x1() should be set");
        t.equal(shape.$x2(), 20, "$x2() should be set");

        t.end();
    });

    testCase.test("$y() property", t => {
        const shape = setupFixture().shape;

        shape.$y1(10);
        shape.$y2(20);

        t.equal(shape.$y1(), 10, "$y1() should be set");
        t.equal(shape.$y2(), 20, "$y2() should be set");

        t.end();
    });
});