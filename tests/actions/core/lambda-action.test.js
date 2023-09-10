import * as gtap from '../../../lib/gtap'
import {
    setupFixture
} from './_common.fixture'

import test from "tape"

test("$lambda", testCase => {
    testCase.test("callback is executed", t => {
        let actualAction = [];
        let actualIndices = [];
        let actualCallCount = 0;
        let actualShapeNodes = [];

        const visual = setupFixture().visual;
        const callback = (v, index, action) => {
            actualCallCount++;
            actualShapeNodes.push(v);
            actualIndices.push(index);
            actualAction.push(action.name);
        }

        gtap.$lambda(callback).action(visual);

        t.deepEqual(actualIndices, [0, 1, 2, 3], "should have an index");
        t.equal(actualCallCount, 4, "should be trigger once for each data point");
        t.equal(actualShapeNodes.length, 4, "should have the same number of visuals as data points");
        t.deepEqual(actualShapeNodes, visual.shapeNodes, "should have get access to the shapeNodes");
        t.deepEqual(actualAction, ["lambda", "lambda", "lambda", "lambda"], "should have access to the action object");

        t.end()
    });

    testCase.test("callback is executed", t => {
        let actualData = [];

        const testData = [2, 3, 4, 5];
        const visual = setupFixture().visual;
        const callback = (_, index, action) => {
            actualData.push(action.data);
        }

        gtap.$lambda(callback, testData).action(visual);
        const expectedData = [testData, testData, testData, testData];

        t.deepEqual(actualData, expectedData, "should have access to passed data for each shapeNode");

        t.end()
    });
});