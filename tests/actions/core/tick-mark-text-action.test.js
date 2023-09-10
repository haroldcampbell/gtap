import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'
import * as utils from '../../../lib/utils'

import test from "tape"

test("$tickMarkText", testCase => {
    /** Tests for the action */
    testCase.test("action", tc => {
        tc.test("call textSetterCallback", t => {
            const {
                visual,
            } = fixtureUtils.setupEmptyShapeFixture(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$startAngle = gtap._$.__attr(node, "start-angle");
            }, [10]);

            let textSetterCallCount = 0;
            const textSetterCallback = (index) => {
                textSetterCallCount++;
                return index;
            }
            const numLabels = 2;
            gtap.$tickMarkText(numLabels, 10, textSetterCallback).action(visual);

            t.equal(textSetterCallCount, numLabels, "should call textSetterCallback to get text at index");

            t.end();
        });

        tc.test("single visual", t => {
            const {
                visual,
                svgContainer,
            } = fixtureUtils.setupEmptyShapeFixture(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$startAngle = gtap._$.__attr(node, "start-angle");
            }, [10]); /** This data represents one axis */

            let textData = ["cat", "dog"];
            let configCallbackCount = 0;
            let lastTickPosition = 0;
            let tickGaps = [];
            let labelText = [];

            const configCallback = (tick, tickIndex, axisIndex, isEvenAxis, alignTop, alignBottom, alignWithAngle) => {
                labelText.push(tick.label.$text());
                configCallbackCount++;
                tickGaps.push(tick.label.$x() - lastTickPosition);
                lastTickPosition = tick.label.$x();
            }
            const numLabels = 2;
            const spaceBetweenLabels = 10
            gtap.$tickMarkText(numLabels, spaceBetweenLabels, index => textData[index], configCallback).action(visual);

            t.deepEqual(labelText, textData, "should have label text from textSetterCallback");
            t.equal(svgContainer.childNodes.length, numLabels, "should add labels to container");
            t.equal(configCallbackCount, numLabels, "should call configCallback to configure ticks");
            t.deepEqual(tickGaps, [spaceBetweenLabels, spaceBetweenLabels], "should add specified space between labels");
            t.end();
        });
    });

    testCase.test("alignment", tc => {
        const alignFixture = () => {
            return fixtureUtils.setupEmptyShapeFixture(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$startAngle = gtap._$.__attr(node, "start-angle");
            }, [10]); /** This data represents one axis */
        }

        tc.test("align with angle", t => {
            const visual = alignFixture().visual

            let textData = ["cat", "dog"];
            let preAlignmentPosition = [];
            let postAlignmentPosition = [];
            let expectedAlignmentPositions = [];
            const angle = 30;

            const configCallback = (cbData) => {
                const xy = utils.$polarToCartesian(cbData.x, cbData.y, cbData.tickOffset, angle);
                expectedAlignmentPositions.push([xy.x, xy.y]);

                preAlignmentPosition.push(cbData.label.$xy());
                cbData.alignWithAngle(angle);
                postAlignmentPosition.push(cbData.label.$xy());
            }

            gtap.$tickMarkText(2, 10, index => textData[index], configCallback).action(visual);

            t.deepEqual(postAlignmentPosition, expectedAlignmentPositions, "should set xy");
            t.end();
        });


        tc.test("align top", t => {
            const visual = alignFixture().visual

            let textData = ["cat", "dog"];
            let preAlignmentPosition = [];
            let postAlignmentPosition = [];
            let expectedAlignmentPositions = [];

            const configCallback = (cbData) => {
                const xy = utils.$polarToCartesian(cbData.axisPosition.x, cbData.axisPosition.y, 10, cbData.tickAngle);
                expectedAlignmentPositions.push([xy.x, xy.y]);

                preAlignmentPosition.push(cbData.label.$xy());
                cbData.alignTop();
                postAlignmentPosition.push(cbData.label.$xy());
            }

            gtap.$tickMarkText(2, 10, index => textData[index], configCallback).action(visual);

            t.deepEqual(postAlignmentPosition, preAlignmentPosition, "should have alignTop as default alignment");
            t.deepEqual(postAlignmentPosition, expectedAlignmentPositions, "should set xy");
            t.end();
        });

        tc.test("align bottom", t => {
            const visual = alignFixture().visual

            let textData = ["cat", "dog"];
            let preAlignmentPosition = [];
            let postAlignmentPosition = [];
            let expectedAlignmentPositions = [];

            const configCallback = (cbData) => {
                const xy = utils.$polarToCartesian(cbData.axisPosition.x, cbData.axisPosition.y, 10, cbData.tickAngle + 180);
                expectedAlignmentPositions.push([xy.x, xy.y]);

                preAlignmentPosition.push(cbData.label.$xy());
                cbData.alignBottom();
                postAlignmentPosition.push(cbData.label.$xy());
            }

            gtap.$tickMarkText(2, 10, index => textData[index], configCallback).action(visual);

            t.notDeepEqual(postAlignmentPosition, preAlignmentPosition, "should change xy");
            t.deepEqual(postAlignmentPosition, expectedAlignmentPositions, "should set xy");
            t.end();
        });
    });
});