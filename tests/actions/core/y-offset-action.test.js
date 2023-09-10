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

test("$yOffset", testCase => {
    testCase.test("$y and $height not set", t => {
        const visual = setupFixture().visual;

        gtap.$yOffset(20).action(visual);

        const expected = [null, 20, 40, 60];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should offset $y values without $y or $height being set previously, except the first value");
        t.end()
    });

    testCase.test("$y not set", t => {
        const visual = setupFixture().visual;

        gtap.$height(15).action(visual);
        gtap.$yOffset(20).action(visual);

        /* 0: is not affected by offset so it's null */
        /* 1: height + offset = 35 */
        /* 2: 35 + height + offset = 70 */
        /* 3: 70 + height + offset = 105 */
        const expected = [null, 35, 70, 105];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should offset $y values without $y being previously set, except the first value");
        t.end()
    });

    testCase.test("$height not set", t => {
        const visual = setupFixture().visual;

        gtap.$y(8).action(visual);
        gtap.$yOffset(20).action(visual);

        /* 0: y = 8 */
        /* 1: 8 + offset = 28 */
        /* 2: 28 + offset = 48 */
        /* 3: 48 + offset = 68 */
        const expected = [8, 28, 48, 68];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should offset $y values without $height");
        t.end()
    });

    testCase.test("positive offset", t => {
        const visual = setupFixture().visual;

        gtap.$y(8).action(visual);
        gtap.$height(15).action(visual);
        gtap.$yOffset(20).action(visual);

        /* 0: y = 8 */
        /* 1: 8 + height + offset = 43 */
        /* 2: 43 + height + offset = 78 */
        /* 3: 78 + height + offset = 113 */
        const expected = [8, 43, 78, 113];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should offset $y values");
        t.end()
    });

    testCase.test("negative offset", t => {
        const visual = setupFixture().visual;

        gtap.$y(10).action(visual);
        gtap.$height(15).action(visual);
        gtap.$yOffset(-20).action(visual);

        /* 0: y = 10 */
        /* 1: 10 + height - offset = 5 */
        /* 2: 5 + height - offset = 0 */
        /* 3: 0 + height - offset = -5 */
        const expected = [10, 5, 0, -5];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());
        t.deepEqual(actual, expected, "should offset $y values");
        t.end()
    });
});