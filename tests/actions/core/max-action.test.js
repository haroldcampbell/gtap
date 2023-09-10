import * as gtap from '../../../lib/gtap'
import test from "tape"

import { setupFixture } from './_common.fixture'

test("$max", testCase => {
    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$max(10).action(visual);

        const expected = [
            [5, 5],
            [10, 10],
            [0, 0],
            [5, 5]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should scale the value of the $width and $height");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$max(-10).action(visual);

        const expected = [
            [-5, -5],
            [-10, -10],
            [0, 0],
            [-5, -5]
        ];
        const actual = Array.from(visual.shapeNodes).map(v => [v.$width(), v.$height()]);

        t.deepEqual(actual, expected, "should scale the value of the $width and $height");
        t.end()
    });
});