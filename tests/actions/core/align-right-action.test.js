import * as gtap from '../../../lib/gtap'
import {
    setupEmptyShapeFixture
} from './_common.fixture'

import test from "tape"

test("$alignRight", testCase => {
    testCase.test("defaults should align using max data", t => {
        const width = 25;
        const fixture = setupEmptyShapeFixture(node => {
            node.$width = () => width;
            node.$x = gtap._$.__attr(node, "x");
        });
        const visual = fixture.visual;
        const dataVal = fixture.data.max(); /** max value is 20. */
        const expectedXValues = [dataVal, dataVal, dataVal, dataVal].map(val => val - width);

        gtap.$alignRight().action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });

    testCase.test("defaults with mappable $width() should align using max data", t => {
        const widths = [2, 4, 10];
        const fixture = setupEmptyShapeFixture(node => {
            node.x = null;
            node.$x = (val) => {
                if (val === undefined) {
                    return node.x;
                }
                node.x = val;
            }
            node.$width = () => {
                return widths;
            }
        });

        const visual = fixture.visual;
        const maxVal = fixture.data.max(); /** max value is 20. */
        const expectedXValues = [
            [maxVal - 2, maxVal - 4, maxVal - 10], // x values for the first visual
            [maxVal - 2, maxVal - 4, maxVal - 10], // ... the second
            [maxVal - 2, maxVal - 4, maxVal - 10], // ...
            [maxVal - 2, maxVal - 4, maxVal - 10], // ...
        ]

        gtap.$alignRight().action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });

    testCase.test("should align using xBaseline", t => {
        const width = 25;
        const fixture = setupEmptyShapeFixture(node => {
            node.$width = () => width;
            node.$x = gtap._$.__attr(node, "x");
        });
        const xBaseline = 12;
        const visual = fixture.visual;
        const expectedXValues = [xBaseline, xBaseline, xBaseline, xBaseline].map(val => val - width);

        gtap.$alignRight(xBaseline).action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });

    testCase.test("defaults with mappable $width() should align using max data", t => {
        const widths = [2, 4, 10];
        const fixture = setupEmptyShapeFixture(node => {
            node.x = null;
            node.$x = (val) => {
                if (val === undefined) {
                    return node.x;
                }
                node.x = val;
            }
            node.$width = () => {
                return widths;
            }
        });

        const xBaseline = 12;
        const visual = fixture.visual;
        const expectedXValues = [
            [xBaseline - 2, xBaseline - 4, xBaseline - 10], // x values for the first visual
            [xBaseline - 2, xBaseline - 4, xBaseline - 10], // ... the second
            [xBaseline - 2, xBaseline - 4, xBaseline - 10], // ...
            [xBaseline - 2, xBaseline - 4, xBaseline - 10], // ...
        ]

        gtap.$alignRight(xBaseline).action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });
});