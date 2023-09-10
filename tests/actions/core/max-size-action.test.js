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

test("$maxSize", testCase => {
    testCase.test("width only", t => {
        const visual = setupFixture().visual;

        // Uncomment to see logging message
        // gtap.$enableLogging(true);
        gtap.$maxSize(10).action(visual);

        const expected = [
            [5, 0],
            [10, 0],
            [0, 0],
            [5, 0]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set only the of $width values");
        t.end()
    });

    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$maxSize(10, 20).action(visual);

        const expected = [
            [5, 10],
            [10, 20],
            [0, 0],
            [5, 10]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set value of the $width and $height");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$maxSize(-10, -30).action(visual);

        const expected = [
            [-5, -15],
            [-10, -30],
            [0, 0],
            [-5, -15]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set value of the $width and $height");
        t.end()
    });

    testCase.test("data is mappable", t => {
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
            node.w = null;
            node.$height = (val) => {
                if (val === undefined) {
                    return node.h;
                }
                node.h = val;
            }
            node.$width = (val) => {
                if (val === undefined) {
                    return node.w;
                }
                node.w = val;
            }
        })
        const visual = utils.createMockedVisual(shape, data);

        gtap.$maxSize(10, 15).action(visual);

        /** Each value of the normalized  data items should be scaled */
        const expectedWidth = [
            [2.5, 4, 0], //     10 * [0.25,   0.4,  0]
            [2.5, 10, 3.75], // 10 * [0.25,   1,    0.375]
            [10, 0, 5], //      10 * [1,      0,    0.5],
            [1.25, 2, 10] //    10 * [0.125,  0.2,  1]
        ];
        const expectedHeight = [
            [3.75, 6, 0], //      15 * [0.25,   0.4,  0]
            [3.75, 15, 5.625], // 15 * [0.25,   1,    0.375]
            [15, 0, 7.5], //      15 * [1,      0,    0.5],
            [1.875, 3, 15] //     15 * [0.125,  0.2,  1]
        ];
        const actualWidth = Array.from(visual.shapeNodes).map(v => v.$width());
        const actualHeight = Array.from(visual.shapeNodes).map(v => v.$height());

        t.deepEqual(actualWidth, expectedWidth, "should scale the value of the $width");
        t.deepEqual(actualHeight, expectedHeight, "should scale the value of the $height");
        t.end()
    });
});