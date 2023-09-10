import * as utils from "../../utils"
import * as gtap from '../../../lib/gtap'

import test from "tape"

const setupFixture = () => {
    const data = gtap.$data([10, 20, 0, 10]);
    const visual = utils.createMockedVisual(gtap.pointNode, data);

    return {
        data: data,
        visual: visual
    };
};

test("$maxHeight", testCase => {
    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$maxHeight(10).action(visual);

        const expected = [5, 10, 0, 5];
        const actual = Array.from(visual.shapeNodes).map(v => v.$height());

        t.deepEqual(actual, expected, "should scale the value of the $height");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$maxHeight(-10).action(visual);

        const expected = [-5, -10, 0, -5];
        const actual = Array.from(visual.shapeNodes).map(v => v.$height());

        t.deepEqual(actual, expected, "should scale the value of the $height");
        t.end()
    });

    testCase.test("complex data", t => {
        const data = gtap.$multiData([
            /** Values are normalized down the columns */
            [10, 20, 0], //     [0.25,   0.4,  0]
            [10, 50, 15], //    [0.25,   1,    0.375]
            [40, 0, 20], //     [1,      0,    0.5],
            [5, 10, 40] //      [0.125,  0.2,  1]
        ]);

        /**
         * Used an emptyShape instead of pointNode because _$.__attr(a, "height")
         * was only returning a scalar value instead of the arrays
         **/
        const shape = utils.emptyShape(node => {
            node.h = null;
            node.$height = (val) => {
                if (val === undefined) {
                    return node.h;
                }
                node.h = val;
            }
        })
        const visual = utils.createMockedVisual(shape, data);

        gtap.$maxHeight(10).action(visual);

        /** Each value of the normalized  data items should be scaled */
        const expected = [
            [2.5, 4, 0], //     10 * [0.25,   0.4,  0]
            [2.5, 10, 3.75], // 10 * [0.25,   1,    0.375]
            [10, 0, 5], //      10 * [1,      0,    0.5],
            [1.25, 2, 10] //    10 * [0.125,  0.2,  1]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => v.$height());

        t.deepEqual(actual, expected, "should scale the value of the $height");
        t.end()
    });
});