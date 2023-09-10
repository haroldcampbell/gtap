import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'
import * as nodeUtils from '../../../lib/nodes/nodes-utils'

import test from "tape"

const fixtureSetup = fixtureUtils.setupEmptyNodeFixture(node => {
    node.$x = gtap._$.__attr(node, "x");
    node.$y = gtap._$.__attr(node, "y");
    node.$startAngle = gtap._$.__attr(node, "start-angle");
});

test("$tickMarks", testCase => {
    testCase.test("tickPosition", tc => {
        tc.test("zero state", t => {
            const positionConfig = positionConfigFixture();
            const expectedPosition = {
                x: 0,
                y: 0
            };

            const node = fixtureSetup().node;
            const actualPosition = gtap.tickPosition(node, 0, positionConfig)

            t.deepEqual(actualPosition, expectedPosition, "should have position object with zeros");
            t.end();
        });

        tc.test("point along radial", t => {
            const positionConfig = {};

            const node = fixtureSetup().node;
            node.$startAngle(30);

            const actualPosition = gtap.tickPosition(node, 100, positionConfig);
            const [cx, cy, radius, startAngle] = [0, 0, 100, 30];
            const expectedPosition = nodeUtils.__radialCenter(cx, cy, radius, startAngle);

            t.deepEqual(actualPosition, expectedPosition, "should have position object with zeros");
            t.end();
        })

        tc.test("point along radial with margin offset", t => {
            const [xMargin, yMargin] = [10, 10];
            const positionConfig = positionConfigFixture({
                xMargin: xMargin,
                yMargin: yMargin,
            });

            const node = fixtureSetup().node;
            node.$startAngle(30);

            const actualPosition = gtap.tickPosition(node, 100, positionConfig);
            const [cx, cy, radius, startAngle] = [0, 0, 100, 30];
            const pos = nodeUtils.__radialCenter(cx, cy, radius, startAngle);

            const expectedPosition = {
                x: pos.x + xMargin,
                y: pos.y + yMargin,
            }

            t.deepEqual(actualPosition, expectedPosition, "should have a position updated by margin offsets");
            t.end();
        });

        tc.test("point along radial with startAngleOffset", t => {
            const startAngleOffset = 25;
            const positionConfig = positionConfigFixture({
                startAngleOffset: startAngleOffset,
            });

            const node = fixtureSetup().node;
            node.$startAngle(30);

            const actualPosition = gtap.tickPosition(node, 100, positionConfig);
            const [cx, cy, radius, startAngle] = [0, 0, 100, 30 + startAngleOffset];
            const expectedPosition = nodeUtils.__radialCenter(cx, cy, radius, startAngle);

            t.deepEqual(actualPosition, expectedPosition, "should have a position updated by startAngleOffset");
            t.end();
        });

        tc.test("point along radial with radialOffset", t => {
            const radialOffset = 25;
            const positionConfig = positionConfigFixture({
                radialOffset: radialOffset,
            });

            const node = fixtureSetup().node;
            node.$startAngle(30);

            const actualPosition = gtap.tickPosition(node, 100, positionConfig);

            const [cx, cy, radius, startAngle] = [0, 0, 100 + radialOffset, 30];
            const expectedPosition = nodeUtils.__radialCenter(cx, cy, radius, startAngle);

            t.deepEqual(actualPosition, expectedPosition, "should have a position updated by radialOffset");
            t.end();
        });
    });

    testCase.test("defaultTicks", tc => {
        tc.test("add tick to parent", t => {
            const pos = {
                x: 0,
                y: 0,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();

            /** Sanity check. There shouldn't be any thing on the parent element yet. */
            t.equal(parentElement.childNodes.length, 0, "should not have any ticks")

            /** Calling the defaultTicks should add a tick to node's parent element which is parentElement */
            gtap.defaultTicks(node, pos, 0, 0, "", 0, positionConfigFixture());

            t.deepEqual(parentElement.childNodes[0].$parentElm, node.$parentElm, "should add tick to the node's parent");
            t.equal(parentElement.childNodes.length, 1, "should add tick to parent");

            t.end();
        });

        tc.test("tick position properties set", t => {
            const offset = 18;
            const positionConfig = positionConfigFixture({
                radialOffset: 45
            });
            const pos = {
                x: 101,
                y: 3.14
            };

            const {
                node,
                parentElement
            } = fixtureSetup();

            gtap.defaultTicks(node, pos, offset, 0, "fake-style", 0, positionConfig);
            const tickNode = parentElement.childNodes[0];
            const actualStyle = tickNode.$style();
            const expectedRadius = offset + positionConfig.radialOffset;

            t.equal(tickNode.$x(), pos.x, "should add tick at pos.x");
            t.equal(tickNode.$y(), pos.y, "should add tick at pos.y");
            t.equal(tickNode.$radius(), expectedRadius, "should set radius");
            t.equal(actualStyle, "fake-style", "should add style to tick");

            t.end();
        });

        tc.test("tick position properties set", t => {
            const offset = 18;
            const nodeStartAngle = 30;
            const positionConfig = positionConfigFixture({
                radialOffset: 45,
                startAngleOffset: 56,
            });
            const pos = {
                x: 101,
                y: 3.14,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();
            node.$startAngle(nodeStartAngle);

            gtap.defaultTicks(node, pos, offset, 0, "", 0, positionConfig);
            const tickNode = parentElement.childNodes[0];
            const arcSpan = nodeUtils.calcTheta(offset + positionConfig.radialOffset, 5);
            const expectedStartAngle = positionConfig.startAngleOffset + nodeStartAngle - arcSpan / 2.0;

            t.equal(tickNode.$startAngle(), expectedStartAngle, "should set tick $startAngle");
            t.end();
        });
    });

    testCase.test("ellipseTicks", tc => {
        tc.test("add tick to parent", t => {
            const pos = {
                x: 0,
                y: 0,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();

            /** Sanity check. There shouldn't be any thing on the parent element yet. */
            t.equal(parentElement.childNodes.length, 0, "should not have any ticks")

            /** The ellipseTicks is a generator */
            const tickCallback = gtap.ellipseTicks()
            tickCallback(node, pos, 0, 0, null, 0, null);

            t.deepEqual(parentElement.childNodes[0].$parentElm, node.$parentElm, "should add tick to the node's parent");
            t.equal(parentElement.childNodes.length, 1, "should add tick to parent");

            t.end();
        });

        tc.test("position ticks", t => {
            const pos = {
                x: 101,
                y: 3.14,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();

            /** The ellipseTicks is a generator */
            const tickCallback = gtap.ellipseTicks()
            tickCallback(node, pos, 0, 0, null, 0, null);

            const tickNode = parentElement.childNodes[0];

            t.deepEqual(tickNode.$xy(), pos, "should add at position");

            t.end();
        });

        tc.test("default tick style", t => {
            const pos = {
                x: 101,
                y: 3.14,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();
            const expectedStyle = "default-tick-style";

            /** The ellipseTicks is a generator */
            const tickCallback = gtap.ellipseTicks(expectedStyle, "ignored-last-tick-style")
            tickCallback(node, pos, 0, 0, "never-used-style", 0, null);

            const tickNode = parentElement.childNodes[0];

            t.equal(tickNode.$style(), expectedStyle, "should use defaultTickStyle from generator");

            t.end();
        });

        tc.test("last tick style", t => {
            const pos = {
                x: 101,
                y: 3.14,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();
            const expectedStyle = "last-tick-style";
            const numTicks = 2;
            const tickIndex = numTicks - 1 /** This is the last tick */

            /** We use the lastTickStyle only when it is present and we are at the last tick */
            const tickCallback = gtap.ellipseTicks("ignored-default-tick-style", expectedStyle);
            tickCallback(node, pos, 0, tickIndex, "never-used-style", numTicks, null);

            const tickNode = parentElement.childNodes[0];

            t.equal(tickNode.$style(), expectedStyle, "should use lastTickStyle from generator for last tick");

            t.end();
        });

        tc.test("fallback to defaultTickStyle on last tick", t => {
            const pos = {
                x: 101,
                y: 3.14,
            };

            const {
                node,
                parentElement
            } = fixtureSetup();
            const expectedStyle = "fallback-default-tick-style";
            const numTicks = 2;
            const tickIndex = numTicks - 1 /** This is the last tick */

            const tickCallback = gtap.ellipseTicks(expectedStyle);
            tickCallback(node, pos, 0, tickIndex, "never-used-style", numTicks, null);

            const tickNode = parentElement.childNodes[0];

            t.equal(tickNode.$style(), expectedStyle, "should use defaultTickStyle when there is no lastTickStyle");

            t.end();
        });
    });

    /** Tests for the action */
    testCase.test("action", tc => {
        tc.test("tick marks added for visuals", t => {
            const {
                visual,
                svgContainer,
                data
            } = fixtureUtils.setupEmptyShapeFixture(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$startAngle = gtap._$.__attr(node, "start-angle");
            }, [10]);

            let configCallbackCalled = 0;
            const configCallback = (node, newPos, offset, index, style, numberOfTicks, positionConfig) => {
                const tickNode = gtap.ellipse(node.$parentElm);

                configCallbackCalled++;
                tickNode.$style(style);
            }
            gtap.$tickMarks(2, 10, configCallback).action(visual);

            const totalTickMarkCount = 2 * data.itemCount();
            const expectedDefaultStyle = 'fill: #444; stroke:1;';
            const nonConformingStyles = Array.from(svgContainer.childNodes).filter(v => v.$style() != expectedDefaultStyle);

            t.equal(nonConformingStyles.length, 0, "should have default style");
            t.equal(configCallbackCalled, totalTickMarkCount, "should call configCallback");
            t.equal(svgContainer.childNodes.length, totalTickMarkCount, "should add tick marks to container");
            t.equal(svgContainer.childNodes[0].$style(), "fill: #444; stroke:1;", "should have default style on ticks");
            t.end();
        });

        tc.test("style and positionConfig", t => {
            const {
                visual,
                svgContainer,
            } = fixtureUtils.setupEmptyShapeFixture(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$startAngle = gtap._$.__attr(node, "start-angle");
            }, [10]);

            const positionConfigValues = [];
            const actualNumberOfTicks = [];
            const configCallback = (node, newPos, offset, index, style, numberOfTicks, positionConfig) => {
                const tickNode = gtap.ellipse(node.$parentElm);
                tickNode.$style(style);
                positionConfigValues.push(positionConfig);
                actualNumberOfTicks.push(numberOfTicks);
            };
            gtap.$tickMarks(2, 10, configCallback, "fake-tick-style", {
                xMargin: 3.14
            }).action(visual);

            const expectedDefaultStyle = 'fake-tick-style';
            const nonConformingStyles = Array.from(svgContainer.childNodes).filter(v => v.$style() != expectedDefaultStyle);

            t.equal(nonConformingStyles.length, 0, "should pass style to tick configCallback");
            t.deepEqual(positionConfigValues, [{
                xMargin: 3.14
            }, {
                xMargin: 3.14
            }], "should pass positionConfig to tick configCallback");
            t.deepEqual(actualNumberOfTicks, [2, 2], "should pass numberOfTicks to tick configCallback");
            t.end();
        });
    });
});

function positionConfigFixture({
    radialOffset = 0,
    startAngleOffset = 0,
    xMargin = 0,
    yMargin = 0,
} = {}) {
    return {
        radialOffset,
        startAngleOffset,
        xMargin,
        yMargin,
    }
}