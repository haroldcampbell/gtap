import {
    arcShapeNode
} from "../../lib/nodes/arc-shape-node"
import * as nodeUtils from "../../lib/nodes/nodes-utils"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = arcShapeNode(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("arcShapeNode node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "path")

    nodeFixtureUtils.testAttrTextHelperProperty(setupFixture().shape, testCase, "$d", "d");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$x", "x");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$y", "y");

    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$strokeWidth", "stroke-width");


    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcSpan", "arc-span");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcStartX", "arc-start-x");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcStartY", "arc-start-y");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcEndX", "arc-end-x");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__arcEndY", "arc-end-y");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "__largeArcFlag", "large-arc-flag");

    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$radius", "radius");
    nodeFixtureUtils.testAttrHelperProperty(setupFixture().shape, testCase, "$startAngle", "start-angle");

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

        t.true(didPassNode, "should pass self to nodeUtils.__endAngle");
        t.true(didCallEndAngle, "should call nodeUtils.__endAngle");
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

        t.true(didPassNode, "should pass self to nodeUtils.__arcSpan");
        t.true(didCallArcSpan, "should call nodeUtils.__arcSpan");
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
            shape.__arcStart();
        });

        t.true(didPassNode, "should pass self to nodeUtils.__arcStart");
        t.true(didCallArcStart, "should call nodeUtils.__arcStart");
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
            shape.__arcEnd();
        });

        t.true(didPassNode, "should pass self to nodeUtils.__arcEnd");
        t.true(didCallArcEnd, "should call nodeUtils.__arcEnd");
        t.end();
    });

    testCase.test("$radialCenter()", t => {
        const [x, y, radius, startAngle] = [100, 100, 150, 15];

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
            shape.$radialCenter(x, y, radius, startAngle);
        });

        t.true(didPassX, "should pass $x() property");
        t.true(didPassY, "should pass $y() property");
        t.true(didPassRadius, "should pass radius property");
        t.true(didPassStartAngle, "should pass startAngle property");
        t.true(didCallRadialCenter, "should call nodeUtils.__radialCenter");
        t.end();
    });

    testCase.test("$strokeColor()", t => {
        const shape = setupFixture().shape;

        let didPassColor = false;
        let didPassNode = false;
        let didCallStrokeColor = false;
        const expectedColor = "fake-color";

        testUtils.hijack(nodeUtils, '__strokeColor', (node, color) => {
            didPassNode = node === shape;
            didPassColor = color === expectedColor;
            didCallStrokeColor = true;
        }, () => {
            shape.$strokeColor(expectedColor);
        });

        t.true(didPassNode, "should self to nodeUtils.__strokeColor");
        t.true(didPassColor, "should pass color to nodeUtils.__strokeColor");
        t.true(didCallStrokeColor, "should call nodeUtils.__strokeColor");
        t.end();
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

    testCase.test("$arcLength()", t => {
        const shape = setupFixture().shape;

        let expectedRadius = -1;
        let expectedArcSpan = -1;

        let didPassRadius = false;
        let didPassArcSpan = false;
        let didCallCalcArcRenderData = false;

        testUtils.hijack(nodeUtils, 'calcArcLength', (radius, arcSpan) => {
            didPassRadius = expectedRadius === radius;
            didPassArcSpan = expectedArcSpan === arcSpan;
            didCallCalcArcRenderData = true;
        }, () => {
            shape.$radius(expectedRadius);
            shape.$arcSpan(expectedArcSpan);
            shape.$arcLength();
        });

        t.true(didPassRadius, "should pass radius to nodeUtils.$arcLength");
        t.true(didPassArcSpan, "should pass arcSpan to nodeUtils.$arcLength");
        t.true(didCallCalcArcRenderData, "should call nodeUtils.$arcLength to calculate arc length");
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

    testCase.test("$properties()", testCase => {
        testCase.test("returns core properties", t => {
            const shape = setupFixture().shape;

            const [x, y, radius, arcSpan, style] = [100, 100, 150, 15, 'fake-attrib: isSet'];

            shape.$x(x);
            shape.$y(y);
            shape.$radius(radius);
            shape.$arcSpan(arcSpan);
            shape.$style(style);

            const actual = shape.$properties();
            const expected = {
                d: null,
                x: 100,
                y: 100,
                radius: 150,
                arcSpan: 15,
                style: 'fake-attrib: isSet'
            };

            t.deepEqual(actual, expected, "should return core properties");
            t.end();
        });

        testCase.test("set core properties", t => {
            const shape = setupFixture().shape;

            let didCallRenderPath = false;
            shape.__renderPath = () => {
                didCallRenderPath = true;
            };

            const expectedNewProperties = {
                d: null,
                x: 100,
                y: 100,
                radius: 150,
                arcSpan: 15,
                style: 'fake-attrib: isSet'
            };

            shape.$properties(expectedNewProperties);
            const actual = {
                d: shape.$d(),
                x: shape.$x(),
                y: shape.$y(),
                radius: shape.$radius(),
                arcSpan: shape.$arcSpan(),
                style: shape.$style()
            }
            t.deepEqual(actual, expectedNewProperties, "should set core properties");
            t.true(didCallRenderPath, "should call __renderPath()");
            t.end();
        });
    });
});