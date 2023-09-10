import * as utils from "../../lib/utils"

import test from "tape"

test("utils", testCase => {
    testCase.test("$degreesToRadians", tc => {
        tc.test("convert angle in degrees to radians", t => {
            const expectedRadians = 30 * Math.PI / 180.0; // 0.5235987755982988
            const actualRadians = utils.$degreesToRadians(30);

            t.equal(actualRadians, expectedRadians, "should convert degrees to radians")
            t.end();
        });
    });

    testCase.test("$polarToCartesian", tc => {
        tc.test("convert angle in degrees to x-y co-ordinates", t => {
            const [centerX, centerY, radius, angleInDegrees] = [100, 100, 150, 15];
            const actualRadians = utils.$degreesToRadians(angleInDegrees);

            const actualXY = utils.$polarToCartesian(centerX, centerY, radius, angleInDegrees);

            const expectedX = centerX + radius * Math.cos(actualRadians);
            const expectedY = centerY + radius * Math.sin(actualRadians);
            const expectedXY = {
                x: expectedX,
                y: expectedY,
            }

            t.deepEqual(actualXY, expectedXY, "should convert to x-y coordindate")
            t.end();
        });
    });

});