import * as gtap from '../../../lib/gtap'
import test from "tape"

import {
    setupFixture
} from './_common.fixture'

test("$maxX", testCase => {
    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$maxX(10).action(visual);

        const expected = [5, 10, 0, 5];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should scale the value of $x");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$maxX(-10).action(visual);

        const expected = [-5, -10, 0, -5];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should scale the value of $x");
        t.end()
    });
});