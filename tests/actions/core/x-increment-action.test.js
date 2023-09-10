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

test("$xIncrement", testCase => {
    testCase.test("$x not set", t => {
        const visual = setupFixture().visual;

        gtap.$xIncrement(2).action(visual);

        const expected = [null, 2, 4, 6] // $xIncrement is dependent on the first nodes $x being set
        const actual = Array.from(visual.shapeNodes).map(v => v.$x())

        t.deepEqual(actual, expected, "should set y values with $x");
        t.end()
    });
    testCase.test("positive increment", t => {
        const visual = setupFixture().visual;

        gtap.$x(0).action(visual);
        gtap.$xIncrement(2).action(visual);

        const expected = [0, 2, 4, 6]
        const actual = Array.from(visual.shapeNodes).map(v => v.$x())
        t.deepEqual(actual, expected, "should set y values with $x");
        t.end()
    });

    testCase.test("negative increment", t => {
        const visual = setupFixture().visual;

        gtap.$x(0).action(visual);
        gtap.$xIncrement(-2).action(visual);

        const expected = [0, -2, -4, -6]
        const actual = Array.from(visual.shapeNodes).map(v => v.$x())
        t.deepEqual(actual, expected, "should set y values with $x");
        t.end()
    });
});