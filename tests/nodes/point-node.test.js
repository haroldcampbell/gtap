import {
    pointNode
} from "../../lib/nodes/point-node"
import * as nodeUtils from "../../lib/nodes/nodes-utils"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = pointNode(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("pointNode node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, undefined); /* pointNode is an empty/virtual shape */

    nodeFixtureUtils.testAttrTextHelperProperty(setupFixture().shape, testCase, "__strokeColor", "stroke-color");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcSpan", "arc-span");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcStartX", "arc-start-x");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcStartY", "arc-start-y");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcEndX", "arc-end-x");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcEndY", "arc-end-y");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$radius", "radius");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$startAngle", "start-angle");

    nodeFixtureUtils.testXProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testYProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testXY(setupFixture().shape, testCase);
    nodeFixtureUtils.testToPoint(setupFixture().shape, testCase);
    nodeFixtureUtils.testHeightProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testWidthProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testStrokeWidthProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testStrokeColorProperty(setupFixture().shape, testCase);

    nodeFixtureUtils.testRadiusProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testStartAngleProperty(setupFixture().shape, testCase);

    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$class, undefined, "$class() should not be defined on pointNode");
    });

    testCase.test("$endAngle()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallEndAngle = false;

        testUtils.hijack(nodeUtils, '__endAngle', (node) => {
            didPassNode = node === shape;
            didCallEndAngle = true;
        }, () => {
            shape.$endAngle();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__endAngle");
        t.equal(didCallEndAngle, true, "should call nodeUtils.__endAngle");
        t.end();
    });

    testCase.test("$arcSpan()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallArcSpan = false;

        testUtils.hijack(nodeUtils, '__arcSpan', (node) => {
            didPassNode = node === shape;
            didCallArcSpan = true;
        }, () => {
            shape.$arcSpan();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__arcSpan");
        t.equal(didCallArcSpan, true, "should call nodeUtils.__arcSpan");
        t.end();
    });

    testCase.test("__arcStart()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallArcStart = false;

        testUtils.hijack(nodeUtils, '__arcStart', (node) => {
            didPassNode = node === shape;
            didCallArcStart = true;
        }, () => {
            shape.$arcPoint();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__arcStart");
        t.equal(didCallArcStart, true, "should call nodeUtils.__arcStart");
        t.end();
    });

    testCase.test("__arcEnd()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallArcEnd = false;

        testUtils.hijack(nodeUtils, '__arcEnd', (node) => {
            didPassNode = node === shape;
            didCallArcEnd = true;
        }, () => {
            shape.$arcPointEnd();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__arcEnd");
        t.equal(didCallArcEnd, true, "should call nodeUtils.__arcEnd");
        t.end();
    });

    testCase.test("$arcPoint()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallArcStart = false;

        testUtils.hijack(nodeUtils, '__arcStart', (node) => {
            didPassNode = node === shape;
            didCallArcStart = true;
        }, () => {
            shape.$arcPoint();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__arcStart");
        t.equal(didCallArcStart, true, "should call nodeUtils.__arcStart");
        t.end();
    });

    testCase.test("$arcPointEnd()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallArcEnd = false;

        testUtils.hijack(nodeUtils, '__arcEnd', (node) => {
            didPassNode = node === shape;
            didCallArcEnd = true;
        }, () => {
            shape.$arcPointEnd();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__arcEnd");
        t.equal(didCallArcEnd, true, "should call nodeUtils.__arcEnd");
        t.end();
    });

    testCase.test("$radialCenter()", testCase => {
        const [x, y, radius, startAngle] = [100, 100, 150, 15];

        testCase.test("with default startAngle", t => {
            const shape = setupFixture().shape;

            let didCallRadialCenter = false;
            let [didPassX, didPassY, didPassRadius, didPassStartAngle] = [false, false, false, false];

            testUtils.hijack(nodeUtils, '__radialCenter', (_x, _y, _radius, _startAngle) => {
                didPassX = _x === x;
                didPassY = _y === y;
                didPassRadius = _radius === radius;
                didPassStartAngle = _startAngle === startAngle;
                didCallRadialCenter = true;
            }, () => {
                shape.$x(x);
                shape.$y(y);
                shape.$startAngle(startAngle);
                shape.$radialCenter(radius);
            });

            t.equal(didPassX, true, "should pass $x() property");
            t.equal(didPassY, true, "should pass $y() property");
            t.equal(didPassRadius, true, "should pass radius property");
            t.equal(didPassStartAngle, true, "should pass startAngle property");
            t.equal(didCallRadialCenter, true, "should call nodeUtils.__radialCenter");
            t.end();
        });

        testCase.test("with startAngle", t => {
            const shape = setupFixture().shape;

            let didCallRadialCenter = false;
            let [didPassX, didPassY, didPassRadius, didPassStartAngle] = [false, false, false, false];

            testUtils.hijack(nodeUtils, '__radialCenter', (_x, _y, _radius, _startAngle) => {
                didPassX = _x === x;
                didPassY = _y === y;
                didPassRadius = _radius === radius;
                didPassStartAngle = _startAngle === startAngle;
                didCallRadialCenter = true;
            }, () => {
                shape.$x(x);
                shape.$y(y);
                shape.$radialCenter(radius, startAngle);
            });

            t.equal(didPassX, true, "should pass $x() property");
            t.equal(didPassY, true, "should pass $y() property");
            t.equal(didPassRadius, true, "should pass radius property");
            t.equal(didPassStartAngle, true, "should pass startAngle property");
            t.equal(didCallRadialCenter, true, "should call nodeUtils.__radialCenter");
            t.end();
        });
    });

    testCase.test("$calcRenderData()", t => {
        const shape = setupFixture().shape;

        let didPassNode = false;
        let didCallCalcArcRenderData = false;

        testUtils.hijack(nodeUtils, '__calcArcRenderData', (node) => {
            didPassNode = node === shape;
            didCallCalcArcRenderData = true;
        }, () => {
            shape.$calcRenderData();
        });

        t.equal(didPassNode, true, "should pass self to nodeUtils.__calcArcRenderData");
        t.equal(didCallCalcArcRenderData, true, "should call nodeUtils.__calcArcRenderData to set arc start and end coordinates");
        t.end();
    });

    testCase.test("__renderPath()", t => {
        const shape = setupFixture().shape;

        let didCallCalcArcRenderData = false;

        testUtils.hijack(shape, '$calcRenderData', () => {
            didCallCalcArcRenderData = true;
        }, () => {
            shape.$calcRenderData();
        });

        t.equal(didCallCalcArcRenderData, true, "should call self.$calcRenderData to set arc start and end coordinates");
        t.end();
    });

    testCase.test("$arcLength()", t => {
        const shape = setupFixture().shape;
        const [radius, arcSpan] = [150, 30];

        shape.$radius(radius);
        shape.$arcSpan(arcSpan);

        const actualArcLength = shape.$arcLength();
        const expectedArcLength = nodeUtils.calcArcLength(radius, arcSpan);

        t.equal(actualArcLength, expectedArcLength, "should return arcLength");
        t.end();
    });

    testCase.test("$pointOnArc()", t => {
        const shape = setupFixture().shape;
        const [arcLength, x, y, radius, startAngle] = [18, 100, 10, 150, 30];

        shape.$x(x);
        shape.$y(y);
        shape.$radius(radius);
        shape.$startAngle(startAngle);

        const actual = shape.$pointOnArc(arcLength);
        const expected = nodeUtils.pointOnArc(arcLength, x, y, radius, startAngle);

        t.deepEqual(actual, expected, "should return point as hash");
        t.end();
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