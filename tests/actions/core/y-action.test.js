import * as utils from "../../utils"
import * as gtap from '../../../lib/gtap'

import test from "tape"

const setupFixture = () => {
    const data = gtap.$data([10, 20, 0, 10]);
    const visual = utils.createMockedVisual(gtap.ellipse, data);

    return {
        data: data,
        visual: visual
    };
};

test("$y", testCase => {
    testCase.test("not set", t => {
        const visual = setupFixture().visual;

        const expected = [null, null, null, null];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should not set the value of $y");
        t.end()
    });

    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$y(10).action(visual);

        const expected = [10, 10, 10, 10];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should set value of $y");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$y(-10).action(visual);

        const expected = [-10, -10, -10, -10];
        const actual = Array.from(visual.shapeNodes).map(v => v.$y());

        t.deepEqual(actual, expected, "should set value of $y");
        t.end()
    });
});