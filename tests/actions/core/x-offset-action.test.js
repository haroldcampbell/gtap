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

test("$xOffset", testCase => {
    testCase.test("$x and $width not set", t => {
        const visual = setupFixture().visual;

        gtap.$xOffset(20).action(visual);

        const expected = [null, 20, 40, 60];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should offset $x values without $x or $width being set previously, except the first value");
        t.end()
    });

    testCase.test("$x not set", t => {
        const visual = setupFixture().visual;

        gtap.$width(15).action(visual);
        gtap.$xOffset(20).action(visual);

        /* 0: is not affected by offset so it's null */
        /* 1: width + offset = 35 */
        /* 2: 35 + width + offset = 70 */
        /* 3: 70 + width + offset = 105 */
        const expected = [null, 35, 70, 105];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should offset $x values without $x being previously set, except the first value");
        t.end()
    });

    testCase.test("$width not set", t => {
        const visual = setupFixture().visual;

        gtap.$x(8).action(visual);
        gtap.$xOffset(20).action(visual);

        /* 0: y = 8 */
        /* 1: 8 + offset = 28 */
        /* 2: 28 + offset = 48 */
        /* 3: 48 + offset = 68 */
        const expected = [8, 28, 48, 68];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should offset $x values without $width");
        t.end()
    });

    testCase.test("positive offset", t => {
        const visual = setupFixture().visual;

        gtap.$x(8).action(visual);
        gtap.$width(15).action(visual);
        gtap.$xOffset(20).action(visual);

        /* 0: y = 8 */
        /* 1: 8 + width + offset = 43 */
        /* 2: 43 + width + offset = 78 */
        /* 3: 78 + width + offset = 113 */
        const expected = [8, 43, 78, 113];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should offset $x values");
        t.end()
    });

    testCase.test("negative offset", t => {
        const visual = setupFixture().visual;

        gtap.$x(10).action(visual);
        gtap.$width(15).action(visual);
        gtap.$xOffset(-20).action(visual);

        /* 0: y = 10 */
        /* 1: 10 + width - offset = 5 */
        /* 2: 5 + width - offset = 0 */
        /* 3: 0 + width - offset = -5 */
        const expected = [10, 5, 0, -5];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());
        t.deepEqual(actual, expected, "should offset $x values");
        t.end()
    });
});