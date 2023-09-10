import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$domId", testCase => {
    testCase.test("set node id via $attr()", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => {
            node.$attr = gtap._$._attr(node);
        });

        const visual = fixture.visual;

        const expectedIDs = ["n1", "n2", "n3", "n4"];

        gtap.$domId(expectedIDs).action(visual);
        const actualIDs = visual.shapeNodes.map(v => v.$attr("id"));

        t.deepEqual(actualIDs, expectedIDs, "should have correct value for each node");
        t.end();
    });

    testCase.test("set node id via $id()", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => {
            node.$id = gtap._$._id(node);
        });

        const visual = fixture.visual;

        const expectedIDs = ["n1", "n2", "n3", "n4"];

        gtap.$domId(expectedIDs).action(visual);
        const actualIDs = visual.shapeNodes.map(v => v.$id());

        t.deepEqual(actualIDs, expectedIDs, "should have correct value for each node");
        t.end();
    });

    testCase.test("id array shorter than data", t => {
        let didCallError = false;
        const visual = fixtureUtils.setupFixture().visual;
        const _consoleError = console.error; /** Stash error message */

        console.error = () => {
            didCallError = true; /** Mute the log */
        };

        /** Array value is less than number of nodes */
        gtap.$domId(['a1', 'a2', 'a3']).action(visual);
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        console.error = _consoleError; /** Reset error func */

        t.true(didCallError, "should log error message");
        t.deepEqual(actual, [null, null, null, null], "should not change ids");
        t.end()
    });

    testCase.test("action data isn't an array", t => {
        const visual = fixtureUtils.setupFixture().visual;
        const _consoleError = console.error; /** Stash error message */
        let didCallError = false;
        let actualErrorMessage = null;
        let expectedErrorMessage = "data should be an Array";

        console.error = (msg) => {
            didCallError = true; /** Mute the log */
            actualErrorMessage = msg;
        };

        /** Array value is less than number of nodes */
        gtap.$domId("some-junk").action(visual);
        const actual = Array.from(visual.shapeNodes).map(v => v.$x());

        console.error = _consoleError; /** Reset error func */

        t.true(didCallError, "should log error message");
        t.equal(actualErrorMessage, expectedErrorMessage, "should have error message")
        t.deepEqual(actual, [null, null, null, null], "should not change ids");
        t.end()
    });
})