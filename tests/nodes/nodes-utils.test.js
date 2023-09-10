import * as gtap from '../../lib/gtap'
import * as testUtils from "../utils"
import * as utils from "../../lib/utils"
import * as nodeUtils from "../../lib/nodes/nodes-utils"

import test from "tape"

test("node-utils", testCase => {
    /** configValue */
    testCase.test("configValue", tc => {
        tc.test("missing object uses default value", t => {
            const configObject = undefined;
            const expectedValue = 0;
            const actualValue = nodeUtils.configValue(configObject, "propertyA");

            t.equal(actualValue, expectedValue, "should get default property value");
            t.end();
        });

        tc.test("missing property uses default value", t => {
            const configObject = {};
            const expectedValue = 0;
            const actualValue = nodeUtils.configValue(configObject, "propertyA");

            t.equal(actualValue, expectedValue, "should get default property value");
            t.end();
        });

        tc.test("missing property", t => {
            const configObject = {};
            const defaultValue = 10;
            const actualValue = nodeUtils.configValue(configObject, "propertyA", defaultValue);

            t.equal(actualValue, defaultValue, "should get default property value");
            t.end();
        });

        tc.test("property not set", t => {
            const configObject = {
                propertyA: null,
            };
            const defaultValue = 10;
            const actualValue = nodeUtils.configValue(configObject, "propertyA", defaultValue);

            t.equal(actualValue, defaultValue, "should get default property value");
            t.end();
        });

        tc.test("property set", t => {
            const expectedValue = 0;
            const configObject = {
                propertyA: expectedValue,
            };
            const defaultValue = 10;
            const actualValue = nodeUtils.configValue(configObject, "propertyA", defaultValue);

            t.equal(actualValue, expectedValue, "should get property value");
            t.end();
        });

        tc.test("property set - non-numeric", t => {
            const expectedValue = "cats and dogs";
            const configObject = {
                propertyA: expectedValue,
            };
            const defaultValue = 0;
            const actualValue = nodeUtils.configValue(configObject, "propertyA", defaultValue);

            t.equal(actualValue, expectedValue, "should get property value");
            t.end();
        });
    });

    /** __radialCenter */
    testCase.test("__radialCenter", tc => {
        tc.test("point at zero", t => {
            const [cx, cy, radius, startAngle] = [0, 0, 100, 0];
            const actualValue = nodeUtils.__radialCenter(cx, cy, radius, startAngle);
            const expectedValue = {
                /**
                 * x is non-zero due to rounding errors in Javascript
                 * https://stackoverflow.com/questions/9652695/why-does-math-cos90-math-pi-180-yield-6-123031769111-and-not-zero
                 */
                x: 6.123233995736766e-15,
                y: -100
            };

            t.deepEqual(actualValue, expectedValue, "should get point at radius");
            t.end();
        });

        tc.test("point along radial line", t => {
            const [cx, cy, radius, startAngle] = [0, 0, 100, 30];

            /**
             * __radialCenter measures startAngle from the y axis
             *
             *  |
             *  |       p
             *  |     r
             *  |𝛂  r
             *  | r 𝜃
             *  +--------------
             *
             * startAngle = 𝜃
             * 𝛂 = 𝜃 - 90
             * r = radius
             * p = point that is returned by __radialCenter
             */
            const actualValue = nodeUtils.__radialCenter(cx, cy, radius, startAngle);
            const toRotatedAlpha = (angle) => utils.$degreesToRadians(angle - 90);
            const expectedValue = {
                x: Math.cos(toRotatedAlpha(30)) * radius,
                y: Math.sin(toRotatedAlpha(30)) * radius,
            };

            t.deepEqual(actualValue, expectedValue, "should get point at radius");
            t.end();
        });
    });

    /** __$alignBottom */
    testCase.test("__$alignBottom", tc => {
        const setupFixture = () => {
            const shape = testUtils.emptyShape(node => {
                node.$y = gtap._$.__attr(node, "y");
                node.$height = gtap._$.__attr(node, "height");
            });

            const parentElement = new testUtils.MockHTMLNode();
            let node = shape(parentElement);

            return node;
        }

        tc.test("alignment using baseline and height", t => {
            const node = setupFixture();
            const baselineValue = 100;
            const height = 50;

            node.$height(height);

            const alignData = nodeUtils.__$alignBottom(node, baselineValue);

            const expectedY = baselineValue - height;

            t.equal(alignData.y, expectedY, "__$alignBottom should update y property");
            t.end();
        });

        tc.test("alignment using getValueCallback and maxHeight", t => {
            const node = setupFixture();
            const maxHeight = 50;
            const baselineValue = 100;
            const getValueCallback = () => 0.5;

            const alignData = nodeUtils.__$alignBottom(node, baselineValue, getValueCallback, maxHeight);

            const expectedHeight = maxHeight * getValueCallback();
            const expectedY = baselineValue - expectedHeight;

            t.equal(alignData.y, expectedY, "__$alignBottom should update y property");
            t.equal(alignData.height, expectedHeight, "__$alignBottom should update height property");
            t.end();
        });
    });

    /** pointOnArc */
    testCase.test("pointOnArc", tc => {
        const [arcLength, centerX, centerY, radius, startAngle] = [30, 100, 100, 150, 0];

        const result = nodeUtils.pointOnArc(arcLength, centerX, centerY, radius, startAngle);

        const arcSpan = nodeUtils.calcArcSpan(radius, arcLength);
        const expectedXY = utils.$polarToCartesian(centerX, centerY, radius, startAngle + arcSpan - 90);

        tc.deepEqual(result, expectedXY, "should calc co-ordinates for point");
        tc.end();
    });

    /** calcArcLength */
    testCase.test("calcArcLength", tc => {
        const [radius, arcAngle] = [150, 30];

        const actualArcLength = nodeUtils.calcArcLength(radius, arcAngle);

        const expectedArcLength = Math.PI * radius * arcAngle / 180;

        tc.deepEqual(actualArcLength, expectedArcLength, "should calc arcLength");
        tc.end();
    });

    /** __calcArcRenderData */
    testCase.test("__calcArcRenderData", tc => {
        const setupFixture = () => {
            const shape = testUtils.emptyShape(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$radius = gtap._$.__attr(node, "radius");
                node.$startAngle = gtap._$.__attr(node, "start-angle");
                node.$arcSpan = gtap._$.__attr(node, "arc-span");

                node.$endAngle = () => node.$startAngle() + node.$arcSpan();

                node.__arcStartX = gtap._$.__attr(node, "__arcstartx");
                node.__arcStartY = gtap._$.__attr(node, "__arcstarty");
                node.__arcEndX = gtap._$.__attr(node, "__arcendx");
                node.__arcEndY = gtap._$.__attr(node, "__arcendy");
            });

            const parentElement = new testUtils.MockHTMLNode();
            return shape(parentElement);
        }

        const node = setupFixture();
        const [x, y, radius, startAngle, arcSpanAngle] = [100, 100, 150, 15, 30];
        const endAngle = startAngle + arcSpanAngle;

        node.$x(x);
        node.$y(y);
        node.$radius(radius);
        node.$startAngle(startAngle);
        node.$arcSpan(arcSpanAngle);

        tc.equal(node.$endAngle(), endAngle, "sanity check: $endAngle");

        nodeUtils.__calcArcRenderData(node);
        const actualResult = {
            __arcStartX: node.__arcStartX(),
            __arcStartY: node.__arcStartY(),
            __arcEndX: node.__arcEndX(),
            __arcEndY: node.__arcEndY()
        }

        const expectedStartXY = utils.$polarToCartesian(x, y, radius, startAngle - 90);
        const expectedEndXY = utils.$polarToCartesian(x, y, radius, endAngle - 90);

        const expectedResult = {
            __arcStartX: expectedStartXY.x,
            __arcStartY: expectedStartXY.y,
            __arcEndX: expectedEndXY.x,
            __arcEndY: expectedEndXY.y
        }

        tc.deepEqual(actualResult, expectedResult, "should calc arc start and end coordindates");
        tc.end();
    });

    /** __endAngle */
    testCase.test("__endAngle", tc => {
        const setupFixture = () => {
            const shape = testUtils.emptyShape(node => {
                node.$startAngle = gtap._$.__attr(node, "start-angle");
                node.$arcSpan = gtap._$.__attr(node, "arc-span");
            });

            const parentElement = new testUtils.MockHTMLNode();
            return shape(parentElement);
        }

        const node = setupFixture();
        const [startAngle, arcSpanAngle] = [100, 100, 150, 15, 30];

        node.$startAngle(startAngle);
        node.$arcSpan(arcSpanAngle);

        const actualEndAngle = nodeUtils.__endAngle(node);
        const expectedEndAngle = startAngle + arcSpanAngle;

        tc.deepEqual(actualEndAngle, expectedEndAngle, "should endAngle");
        tc.end();
    });

    /** __arcStart */
    testCase.test("__arcStart", tc => {
        const setupFixture = () => {
            const shape = testUtils.emptyShape(node => {
                node.__arcStartX = gtap._$.__attr(node, "__arc-start-x");
                node.__arcStartY = gtap._$.__attr(node, "__arc-start-y");
            });

            const parentElement = new testUtils.MockHTMLNode();
            return shape(parentElement);
        }

        const node = setupFixture();
        const [x, y] = [100, 100];

        node.__arcStartX(x);
        node.__arcStartY(y);

        const actualCoord = nodeUtils.__arcStart(node);
        const expectedCoord = {
            x: x,
            y: y,
        }

        tc.deepEqual(actualCoord, expectedCoord, "should return start coordinates of arc");
        tc.end();
    });

    /** __arcSpan */
    testCase.test("__arcSpan", testCase => {
        const setupFixture = () => {
            const shape = testUtils.emptyShape(node => {
                node.__arcSpan = gtap._$.__attr(node, "__arc-span");
            });

            const parentElement = new testUtils.MockHTMLNode();
            return shape(parentElement);
        }

        testCase.test("unset arcSpan", tc => {
            const node = setupFixture();
            const expectedArcSpan = 0;

            const actualArcSpan = nodeUtils.__arcSpan(node);

            tc.equal(actualArcSpan, expectedArcSpan, "should return 0");
            tc.end();
        });

        testCase.test("arcSpan 0", tc => {
            const node = setupFixture();
            const expectedArcSpan = 0;

            node.__arcSpan(0);
            const actualArcSpan = nodeUtils.__arcSpan(node);

            tc.equal(actualArcSpan, expectedArcSpan, "should return 0");
            tc.end();
        });

        testCase.test("set with positive value", tc => {
            const node = setupFixture();
            const expectedArcSpan = 3.14;

            node.__arcSpan(expectedArcSpan);
            const actualArcSpan = nodeUtils.__arcSpan(node);

            tc.equal(actualArcSpan, expectedArcSpan, "should return arc span");
            tc.end();
        });

        testCase.test("set with negative value", tc => {
            const node = setupFixture();
            const expectedArcSpan = -3.14;

            node.__arcSpan(expectedArcSpan);
            const actualArcSpan = nodeUtils.__arcSpan(node);

            tc.equal(actualArcSpan, expectedArcSpan, "should return arc span");
            tc.end();
        });
    });

    /** $setPropertyIsSet */
    testCase.test("$setPropertyIsSet", tc => {
        const setupFixture = () => {
            const shape = testUtils.emptyShape(node => {
                node.$fakeProperty1 = gtap._$.__attr(node, "fake-property-1");
                node.$fakeProperty2 = gtap._$.__attr(node, "fake-property-2");
                node.$fakeProperty3 = gtap._$.__attr(node, "fake-property-3");
            });

            const parentElement = new testUtils.MockHTMLNode();

            return shape(parentElement);
        }

        tc.test("set property listed in set", t => {
            const node = setupFixture();
            const propertyName = "fakeProperty1"
            const expectedValue = 314;
            const set = {
                fakeProperty1: expectedValue,
                fakeProperty2: 404
            }

            nodeUtils.$setPropertyIsSet(node, set, propertyName)
            const actual = node.$fakeProperty1();

            t.equal(actual, expectedValue, "should set property");
            t.end();
        });

        tc.test("ignore unknown property", t => {
            const node = setupFixture();
            const unknownPropertyName = "fluffyMuppet";
            const set = {
                unknown: 314,
            }

            let didSetMessage = false;
            let didCallTrace = false;

            testUtils.hijack(console, "trace", (msg) => {
                didSetMessage = msg === `$${unknownPropertyName} is not a member of this shape.`;
                didCallTrace = true;
            }, () => {
                nodeUtils.$setPropertyIsSet(node, set, unknownPropertyName);
            });

            t.true(didSetMessage, "should have error message for unknown property");
            t.true(didCallTrace, "should call trace");
            t.end();
        });

        tc.test("ignore property not in set", t => {
            const node = setupFixture();
            const missingPropertyName = "fakeProperty1";
            const set = {
                fakeProperty2: 404
            }

            let didSetMessage = false;
            let didCallTrace = false;

            testUtils.hijack(console, "trace", (msg) => {
                didSetMessage = msg === `${missingPropertyName} is not in newProperties set.`;
                didCallTrace = true;
            }, () => {
                nodeUtils.$setPropertyIsSet(node, set, missingPropertyName);
            });

            t.true(didSetMessage, "should have error message for missing set property");
            t.true(didCallTrace, "should call trace");
            t.end();
        });
    });
});