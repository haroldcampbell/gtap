import * as gtap from '../../../lib/gtap'
import { setupFixture } from './_common.fixture'

import test from "tape"

test("$passThrough", testCase => {
    testCase.test("callback is executed", t => {
        let didGetCalled = false;
        const visual = setupFixture().visual;
        const callback = () => didGetCalled = true;

        gtap.$passThrough(callback).action(visual);

        t.true(didGetCalled, "should set execute callback");
        t.end()
    });

    testCase.test("visuals and data is passed to callback", t => {
        let didGetCalled = false;
        let receivedData = null
        const visual = setupFixture().visual;
        const callback = (visuals, data) => {
            receivedData = data;
            didGetCalled = visuals.shapeNodes.length == 4;
        }

        gtap.$passThrough(callback, "cat").action(visual);

        t.true(didGetCalled, "should execute callback and have visuals");
        t.equal(receivedData, "cat", "should receive correct data");
        t.end()
    });
});