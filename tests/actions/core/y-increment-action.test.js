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

test("$yIncrement", testCase => {
    testCase.test("$y not set", t => {
        const visual = setupFixture().visual;

        gtap.$yIncrement(2).action(visual);

        const expected = [null, 2, 4, 6] // $yIncrement is dependent on the first nodes $y being set
        const actual = Array.from(visual.shapeNodes).map(v => v.$y())

        t.deepEqual(actual, expected, "should set y values with $y");
        t.end()
    });
    testCase.test("positive increment", t => {
        const visual = setupFixture().visual;

        gtap.$y(0).action(visual);
        gtap.$yIncrement(2).action(visual);

        const expected = [0, 2, 4, 6]
        const actual = Array.from(visual.shapeNodes).map(v => v.$y())
        t.deepEqual(actual, expected, "should set y values with $y");
        t.end()
    });

    testCase.test("negative increment", t => {
        const visual = setupFixture().visual;

        gtap.$y(0).action(visual);
        gtap.$yIncrement(-2).action(visual);

        const expected = [0, -2, -4, -6]
        const actual = Array.from(visual.shapeNodes).map(v => v.$y())
        t.deepEqual(actual, expected, "should set y values with $y");
        t.end()
    });
});