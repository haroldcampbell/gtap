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

test("$xMargin", testCase => {
    testCase.test("$x not set", t => {
        const visual = setupFixture().visual;

        gtap.$xMargin(20).action(visual);

        const expected = [20, 20, 20, 20]
        const actual = Array.from(visual.shapeNodes).map(v => v.$x())

        t.deepEqual(actual, expected, "should set y values with $x");
        t.end()
    });
    testCase.test("positive margin", t => {
        const visual = setupFixture().visual;

        gtap.$x(10).action(visual);
        gtap.$xMargin(20).action(visual);

        const expected = [30, 30, 30, 30]
        const actual = Array.from(visual.shapeNodes).map(v => v.$x())
        t.deepEqual(actual, expected, "should set y values with $x");
        t.end()
    });

    testCase.test("negative margin", t => {
        const visual = setupFixture().visual;

        gtap.$x(10).action(visual);
        gtap.$xMargin(-20).action(visual);

        const expected = [-10, -10, -10, -10]
        const actual = Array.from(visual.shapeNodes).map(v => v.$x())
        t.deepEqual(actual, expected, "should set y values with $x");
        t.end()
    });
});