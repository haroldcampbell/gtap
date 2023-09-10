import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$logVisual", testCase => {
    testCase.test("log simple data", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture();
        const visual = fixture.visual;

        let didCallLogger = false;
        let actualMessage = null;
        const consoleLogger = console.log; /** store the logger */

        console.log = (msg) => {
            actualMessage = msg;
            didCallLogger = true;
        }

        const expectedMessage = "something something";
        gtap.$logVisual(expectedMessage).action(visual);

        console.log = consoleLogger; /** reset the logger */

        t.true(didCallLogger, "should call logger");
        t.equal(actualMessage, expectedMessage, "should have the correct message");
        t.end();
    });

    testCase.test("data is function", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture();
        const visual = fixture.visual;

        let didCallLogger = false;
        let actualMessage = null;
        const consoleLogger = console.log; /** store the logger */

        console.log = (msg) => {
            actualMessage = msg;
            didCallLogger = true;
        };

        const actualVis = [];
        const actualNodes = [];
        const actualIndices = [];
        const callback = (v, index, viz) => {
            actualVis.push(viz);
            actualNodes.push(v);
            actualIndices.push(index);
            return "something something";
        };

        gtap.$logVisual(callback).action(visual);

        const expectedNodes = visual.shapeNodes.map(v => v);
        console.log = consoleLogger; /** reset the logger */

        t.true(didCallLogger, "should call logger");
        t.equal(actualMessage, "something something", "should have the correct message");

        t.deepEqual(actualNodes, expectedNodes, "should pass nodes to callback")
        t.deepEqual(actualIndices, [0, 1, 2, 3], "should pass node indices to callback")
        t.deepEqual(actualVis, [visual, visual, visual, visual], "should pass visuals object to callback")
        t.end();
    });
})