import {
    rect
} from "../../lib/nodes/nodes-rect"
import * as nodeUtils from "../../lib/nodes/nodes-utils"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = rect(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("rect node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "rect");
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$x(), 0, "$x() should have default value set");
        t.equal(shape.$y(), 0, "$y() should have default value set");
        t.equal(shape.$strokeWidth(), null, "$strokeWidth() should have default value set");
    });
    nodeFixtureUtils.testXProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testYProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testXY(setupFixture().shape, testCase);
    nodeFixtureUtils.testStrokeWidthProperty(setupFixture().shape, testCase);

    testCase.test("$width() property setting", testCase => {
        nodeFixtureUtils.testWidthProperty(setupFixture().shape, testCase);
        nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
            t.equal(shape.$width(), null, "$width() should be null when not set");
        });

        testCase.test("changing $width() with $x() set to 0", t => {
            const shape = setupFixture().shape;

            shape.$width(10);

            t.equal(shape.$x(), 0, "default $x() should not change");

            shape.$width(20);
            t.equal(shape.$x(), 0, "$x() should be changed when $width is changed");
            t.equal(shape.$width(), 20, "$width() should be updated");
            t.end();
        });

        testCase.test("centering $x() when non-zero", t => {
            const shape = setupFixture().shape;

            shape.$x(30);
            shape.$width(10, true);

            t.equal(shape.$x(), 25, "$x() should be updated to middle of shape");

            shape.$width(20, true);
            // Width changed by 10 px, so $x() needs to be updated by 10/2 = 5px
            t.equal(shape.$x(), 30, "$x() should still be centered");
            t.equal(shape.$width(), 20, "$width() should be updated");
            t.end();
        });
    });

    testCase.test("$height() property setting", testCase => {
        nodeFixtureUtils.testHeightProperty(setupFixture().shape, testCase);
        nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
            t.equal(shape.$height(), null, "$height() should be null when not set");
        });

        testCase.test("changing $height() with $x() set to 0", t => {
            const shape = setupFixture().shape;

            shape.$height(10);

            t.equal(shape.$y(), 0, "default $y() should not change");

            shape.$height(20);
            t.equal(shape.$y(), 0, "$y() should be changed when $width is changed");
            t.equal(shape.$height(), 20, "$height() should be updated");
            t.end();
        });

        testCase.test("centering $x() when non-zero", t => {
            const shape = setupFixture().shape;

            shape.$y(30);
            shape.$height(10, true);

            t.equal(shape.$y(), 25, "$y() should be updated to middle of shape");

            shape.$height(20, true);
            // Height changed by 10 px, so $y() needs to be updated by 10/2 = 5px
            t.equal(shape.$y(), 30, "$y() should still be centered");
            t.equal(shape.$height(), 20, "$width() should be updated");
            t.end();
        });
    });

    testCase.test("$alignBottom()", testCase => {
        testCase.test("baselineValue only", t => {
            const shape = setupFixture().shape;
            const baselineValue = 100;
            const height = 50;

            shape.$height(height);
            shape.$alignBottom(baselineValue);

            const expectedAlignData = nodeUtils.__$alignBottom(shape, baselineValue);

            t.equal(shape.$y(), expectedAlignData.y, "should set y property");
            t.end();
        });

        testCase.test("using normalizedData", t => {
            const shape = setupFixture().shape;
            const normalizedData = 0.5;
            const baselineValue = 100;
            const maxHeight = 50;

            shape.bindData({
                dataValue: normalizedData
            });
            t.equal(shape.getDataValue(), normalizedData, "sanity check");

            shape.$alignBottom(baselineValue, () => shape.getDataValue(), maxHeight);

            const expectedAlignData = nodeUtils.__$alignBottom(shape, baselineValue, () => shape.getDataValue(), maxHeight);

            t.equal(shape.$y(), expectedAlignData.y, "should set y property");
            t.equal(shape.$height(), expectedAlignData.height, "should set height property");
            t.end();
        });
    });
});