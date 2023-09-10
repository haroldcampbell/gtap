import * as gtap from '../../../lib/gtap'
import { setupFixture } from './_common.fixture'

import test from "tape"

test("$noop", testCase => {
    testCase.test("callback is executed", t => {
        let didGetCalled = false;
        const visual = setupFixture().visual;
        const callback = () => didGetCalled = true;

        gtap.$noop(callback).action(visual);

        t.true(didGetCalled, "should execute callback");
        t.end()
    });

    testCase.test("visuals is passed to callback", t => {
        let didGetCalled = false;
        const visual = setupFixture().visual;
        const callback = (visuals) => didGetCalled = visuals.shapeNodes.length == 4;

        gtap.$noop(callback).action(visual);

        t.true(didGetCalled, "should execute callback and have visuals");
        t.end()
    });
});