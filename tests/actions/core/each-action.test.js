import * as gtap from '../../../lib/gtap'
import { setupFixture } from './_common.fixture'

import test from "tape"

test("$each", testCase => {
    testCase.test("callback is executed", t => {
        let actualCallCount = 0;
        let actualIndices = [];
        let actualVisual = null;
        let actualShapeNodes = [];

        const visual = setupFixture().visual;
        const callback = (v, index, visuals) => {
            actualCallCount++;
            actualVisual = visuals;
            actualShapeNodes.push(v);
            actualIndices.push(index);
        }

        gtap.$each(callback).action(visual);

        t.deepEqual(actualVisual, visual, "should pass visual")
        t.deepEqual(actualIndices, [0, 1, 2, 3], "should have an index");
        t.equal(actualCallCount, 4, "should be trigger once for each data point");
        t.equal(actualShapeNodes.length, 4, "should have the same number of visuals as data points");
        t.deepEqual(actualShapeNodes, visual.shapeNodes, "should have get access to the shapeNodes");

        t.end()
    });
});