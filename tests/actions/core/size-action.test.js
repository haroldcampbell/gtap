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

test("$size", testCase => {
    testCase.test("width only", t => {
        const visual = setupFixture().visual;

        gtap.$size(10).action(visual);

        const expected = [
            [10, null],
            [10, null],
            [10, null],
            [10, null]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set only the of $width values");
        t.end()
    });

    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$size(10, 20).action(visual);

        const expected = [
            [10, 20],
            [10, 20],
            [10, 20],
            [10, 20]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set value of the $width and $height");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$size(-10, -30).action(visual);

        const expected = [
            [-10, -30],
            [-10, -30],
            [-10, -30],
            [-10, -30]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set value of the $width and $height");
        t.end()
    });

    testCase.test("width as callback", t => {
        const visual = setupFixture().visual;
        const data = setupFixture().data.rawData();

        gtap.$size(index => [data[index], data[index] * 2]).action(visual);

        const expected = [
            [10, 20],
            [20, 40],
            [0, 0],
            [10, 20]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should set $width and $height based on callback values");
        t.end()
    });
});