import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$maxStrokeWidth", testCase => {
    testCase.test("width set on all nodes", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => {
            node.$strokeWidth = gtap._$.__attr(node, 'sw');
        });

        const maxWidth = 8;
        const visual = fixture.visual;
        const data = fixture.data._asNormalized(); /** [ 0.5, 1, 0, 0.5 ] */
        const expected = data.map(d => d * maxWidth);

        gtap.$maxStrokeWidth(maxWidth).action(visual);
        const actualStrokeWidth = visual.shapeNodes.map(v => v.$strokeWidth());

        t.deepEqual(actualStrokeWidth, expected, "should set same stroke width on values");
        t.end();
    });
})