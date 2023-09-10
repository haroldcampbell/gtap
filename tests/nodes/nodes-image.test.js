import {
    image
} from "../../lib/nodes/nodes-image"

// import * as utils from "../../lib/utils"
import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = image(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("image node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "image");
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

    testCase.test("$url() property", t => {
        const shape = setupFixture().shape;
        const url = "fake-url";

        shape.$url(url);

        t.equal(shape.$url(), url, "$url() should be able to set and read new value");
        t.equal(shape.$attr("href"), url, "$url() should set 'href' attrib");
        t.end();
    });
});