import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$strokeWidth", testCase => {
    testCase.test("width set on all nodes", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => {
            node.$strokeWidth = gtap._$.__attr(node, 'sw');
        });

        const visual = fixture.visual;

        gtap.$strokeWidth(8).action(visual);
        const actualStrokeWidth = visual.shapeNodes.map(v => v.$strokeWidth());

        t.deepEqual(actualStrokeWidth, [8, 8, 8, 8], "should set same stroke width on values");
        t.end();
    });
})