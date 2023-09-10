import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$strokeLineCap", testCase => {
    testCase.test("stroke-linecap set", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => {
            node.$attr = gtap._$._attr(node);
        });

        const visual = fixture.visual;

        const expectedLineCap = gtap.LineCap.BUTT;

        gtap.$strokeLineCap(expectedLineCap).action(visual);
        const actualLineCap = visual.shapeNodes.map(v => v.$attr("stroke-linecap"));

        t.deepEqual(actualLineCap, [expectedLineCap, expectedLineCap, expectedLineCap, expectedLineCap], "should set stroke-linecap");
        t.end();
    });

    testCase.test("called with incorrect values", t => {
        let didCallError = false;
        let actualErrorMessage = null;
        let expectedErrorMessage = "Invalid LineCap";

        const fixture = fixtureUtils.setupEmptyShapeFixture(node => {
            node.$attr = gtap._$._attr(node);
        });

        const visual = fixture.visual;
        const _consoleError = console.error; /** Stash error message */

        console.error = (msg) => {
            didCallError = true; /** Mute the log */
            actualErrorMessage = msg;
        };

        gtap.$strokeLineCap("fake-value").action(visual);
        const actualLineCap = visual.shapeNodes.map(v => v.$attr("stroke-linecap"));

        console.error = _consoleError; /** Reset error func */

        t.true(didCallError, "should log error message");
        t.equal(actualErrorMessage, expectedErrorMessage, "should have error message")
        t.deepEqual(actualLineCap, [undefined, undefined, undefined, undefined], "should not set stroke-linecap");
        t.end();
    });
})