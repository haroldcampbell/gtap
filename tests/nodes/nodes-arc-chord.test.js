import {
    chord
} from "../../lib/nodes/nodes-arc-chord"

import * as utils from "../../lib/utils"
import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = chord(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("arc chord node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "path");
    nodeFixtureUtils.testDefaultClass(setupFixture().shape, testCase, null);
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$radius(), 0, "$radius() should be 0 by default");
        t.equal(shape.$startAngle(), 0, "$startAngle() should be 0 by default");
        t.equal(shape.$attr("stroke-linecap"), 'round', "'stroke-linecap' should be set to 'round' by default");
    });

    testCase.test("default __renderPath()", t => {
        const shape = setupFixture().shape;

        shape.__renderPath();

        t.equal(shape.$d(), "M 0 0 L 0 0", "default __renderPath() should set the <path> element's, d attribute's content to all zeros");
        t.end();
    });


    testCase.test("__renderPath()", t => {
        const shape = setupFixture().shape;
        const [x, y, radius, startAngle, endAngle] = [100, 100, 100, 30, 30];

        let start = utils.$polarToCartesian(x, y, radius, startAngle - 90); /** contains the M attributes x and y */
        let end = utils.$polarToCartesian(x, y, radius, endAngle - 90);

        shape.$x(x);
        shape.$y(y);
        shape.$radius(radius);
        shape.$startAngle(startAngle);

        shape.__renderPath();

        const expectedPath = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

        t.equal(shape.$d(), expectedPath, "__renderPath() should set the <path> element's d attribute");
        t.end();
    });
});