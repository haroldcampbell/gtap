import * as gtap from '../../../lib/gtap'
import {
    setupEmptyShapeFixture
} from './_common.fixture'

import test from "tape"

test("$alignLeft", testCase => {
    testCase.test("defaults should align using max data", t => {
        const fixture = setupEmptyShapeFixture(node => {
            node.$x = gtap._$.__attr(node, "x");
        });
        const data = fixture.data;
        const visual = fixture.visual;
        const maxDataValue = data.max(); /** max value is 20. */
        const expectedXValues = [maxDataValue, maxDataValue, maxDataValue, maxDataValue];

        gtap.$alignLeft().action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });

    testCase.test("defaults with mappable $width() should align using max data", t => {
        const fixture = setupEmptyShapeFixture(node => {
            node.x = null;
            node.$x = (val) => {
                if (val === undefined) {
                    return node.x;
                }
                node.x = val;
            }
            node.$width = () => {
                return [2, 4, 10];
            }
        });

        const data = fixture.data;
        const visual = fixture.visual;
        const maxDataValue = data.max(); /** max value is 20. */
        const expectedXValues = [
            [maxDataValue, maxDataValue, maxDataValue],
            [maxDataValue, maxDataValue, maxDataValue],
            [maxDataValue, maxDataValue, maxDataValue],
            [maxDataValue, maxDataValue, maxDataValue],
        ];

        gtap.$alignLeft().action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });

    testCase.test("should align using xBaseline", t => {
        const fixture = setupEmptyShapeFixture(node => {
            node.$x = gtap._$.__attr(node, "x");
        });
        const xBaseline = 18;
        const visual = fixture.visual;
        const expectedXValues = [xBaseline, xBaseline, xBaseline, xBaseline];

        gtap.$alignLeft(18).action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });

    testCase.test("mappable $width() should align using xBaseline", t => {
        const fixture = setupEmptyShapeFixture(node => {
            node.x = null;
            node.$x = (val) => {
                if (val === undefined) {
                    return node.x;
                }
                node.x = val;
            }
            node.$width = () => {
                return [2, 4, 10];
            }
        });

        const xBaseline = 18;
        const visual = fixture.visual;
        const expectedXValues = [
            [xBaseline, xBaseline, xBaseline],
            [xBaseline, xBaseline, xBaseline],
            [xBaseline, xBaseline, xBaseline],
            [xBaseline, xBaseline, xBaseline],
        ];

        gtap.$alignLeft(18).action(visual);
        const actualXValues = visual.shapeNodes.map(v => v.$x());

        t.deepEqual(actualXValues, expectedXValues, "should update align $x values");
        t.end();
    });
});