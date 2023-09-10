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

test("$widthOffset", testCase => {
    testCase.test("$width not set", t => {
        const visual = setupFixture().visual;

        gtap.$widthOffset(20).action(visual);

        /* 0: width = null */
        /* 1: null + offset = 20 */
        /* 2: 20 + offset = 40 */
        /* 3: 40 + offset = 60 */
        const expected = [null, 20, 40, 60];
        const actual = Array.from(visual.shapeNodes).map(v => v.$width());

        t.deepEqual(actual, expected, "should offset $width values without $width being set initially");
        t.end()
    });

    testCase.test("positive offset", t => {
        const visual = setupFixture().visual;

        gtap.$width(15).action(visual);
        gtap.$widthOffset(20).action(visual);

        /* 0: width = 15 */
        /* 1: 15 + offset = 35 */
        /* 2: 35 + offset = 55 */
        /* 3: 55 + offset = 75 */
        const expected = [15, 35, 55, 75];
        const actual = Array.from(visual.shapeNodes).map(v => v.$width());

        t.deepEqual(actual, expected, "should offset $width values");
        t.end()
    });

    testCase.test("negative offset", t => {
        const visual = setupFixture().visual;

        gtap.$width(15).action(visual);
        gtap.$widthOffset(-20).action(visual);

        const expected = [15, -5, -25, -45];
        const actual = Array.from(visual.shapeNodes).map(v => v.$width());
        t.deepEqual(actual, expected, "should offset $width values");
        t.end()
    });
});