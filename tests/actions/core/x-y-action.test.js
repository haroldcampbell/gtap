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

test("$xy", testCase => {
    testCase.test("not set", t => {
        const visual = setupFixture().visual;

        const expected = [null, null, null, null, null, null, null, null];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$x(), v.$y()]).flat();

        t.deepEqual(actual, expected, "should not set the values of $x or $y");
        t.end()
    });

    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$xy([10, 15]).action(visual);

        const expected = [
            [10, 15],
            [10, 15],
            [10, 15],
            [10, 15],
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$x(), v.$y()]);

        t.deepEqual(actual, expected, "should set $x and $y values");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$xy([-10, -20]).action(visual);

        const expected = [
            [-10, -20],
            [-10, -20],
            [-10, -20],
            [-10, -20],
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$x(), v.$y()]);

        t.deepEqual(actual, expected, "should set $x and $y values");
        t.end()
    });

    testCase.test("all array values", t => {
        const visual = setupFixture().visual;
        const arrayValues = [
            [1, 101],
            [2, 212],
            [3, 323],
            [4, 434],
        ];

        gtap.$xy(arrayValues).action(visual);

        const expected = arrayValues;
        const actual = Array.from(visual.shapeNodes).map(v => [v.$x(), v.$y()]);

        t.deepEqual(actual, expected, "should set $x and $y values based on array");
        t.end()
    });
});