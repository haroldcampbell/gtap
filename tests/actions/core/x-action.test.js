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

test("$x", testCase => {
    testCase.test("not set", t => {
        const visual = setupFixture().visual;

        const expected = [null, null, null, null];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should not set the value of $x");
        t.end()
    });

    testCase.test("positive value", t => {
        const visual = setupFixture().visual;

        gtap.$x(10).action(visual);

        const expected = [10, 10, 10, 10];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should set value of $x");
        t.end()
    });

    testCase.test("negative value", t => {
        const visual = setupFixture().visual;

        gtap.$x(-10).action(visual);

        const expected = [-10, -10, -10, -10];
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expected, "should set value of $x");
        t.end()
    });

    testCase.test("array values", t => {
        const expectedXValues = [1, 2, 3, 4];
        const visual = setupFixture().visual;

        gtap.$x(expectedXValues).action(visual);

        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        t.deepEqual(actual, expectedXValues, "should set value of $x");
        t.end()
    });

    testCase.test("array values shorter than data", t => {
        const visual = setupFixture().visual;
        const _consoleError = console.error; /** Stash error message */
        let didCallError = false;

        console.error = () => {
            didCallError = true; /** Mute the log */
        };

        /** Array value is less than number of nodes */
        gtap.$x([1, 2, 3]).action(visual);
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        console.error = _consoleError; /** Reset error func */

        t.true(didCallError, "should log error message");
        t.deepEqual(actual, [null, null, null, null], "should not set value of $x");
        t.end()
    });
});