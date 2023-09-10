import * as gtap from '../../../lib/gtap'
import {
    setupEmptyShapeFixture
} from './_common.fixture'

import test from "tape"

test("$alignBottom", testCase => {
    testCase.test("defaults should align using max data", t => {
        const fixture = setupEmptyShapeFixture(node => {
            node.$y = gtap._$.__attr(node, "y");
            node.$height = gtap._$.__attr(node, "h");
        });

        const data = fixture.data;
        const visual = fixture.visual;

        gtap.$maxHeight(100).action(visual); /** Set the height */
        const heights = visual.shapeNodes.map(v => v.$height()); /** [ 50, 100, 0, 50 ] */
        const expectedYValues = heights.map(height => data.max() - height);

        gtap.$alignBottom().action(visual);
        const actualYValues = visual.shapeNodes.map(v => v.$y());

        t.deepEqual(actualYValues, expectedYValues, "should update align $y values");
        t.end();
    });

    testCase.test("calls $alignBottom() on shapes when present", t => {
        let actualTimesCalled = 0;
        let actualBaselinePassed = [];
        const fixture = setupEmptyShapeFixture(node => {
            node.$alignBottom = (yBaseline) => {
                actualTimesCalled++;
                actualBaselinePassed.push(yBaseline);
            }
        });
        const visual = fixture.visual;

        const yBaseline = 5;
        gtap.$alignBottom(yBaseline).action(visual);

        t.equal(actualTimesCalled, 4, "should call $alignBottom() once per shape node");
        t.deepEqual(actualBaselinePassed, [yBaseline, yBaseline, yBaseline, yBaseline], "should pass yBaseline to shape node's $alignBottom() when present");
        t.end();
    });

    testCase.test("calls $alignBottom() on shapes when present with data.max()", t => {
        let actualTimesCalled = 0;
        let actualBaselinePassed = [];
        const fixture = setupEmptyShapeFixture(node => {
            node.$alignBottom = (yBaseline) => {
                actualTimesCalled++;
                actualBaselinePassed.push(yBaseline);
            }
        });
        const visual = fixture.visual;
        const dataMax = fixture.data.max();

        gtap.$alignBottom().action(visual);

        t.equal(actualTimesCalled, 4, "should call $alignBottom() once per shape node");
        t.deepEqual(actualBaselinePassed, [dataMax, dataMax, dataMax, dataMax], "should have yBaseline set to data.max()");
        t.end();
    });

    testCase.test("aggregates value with yBaseline when height is mappable", t => {
        let actualTimesCalled = 0;
        let actualYValues = [];
        const fixture = setupEmptyShapeFixture(node => {
            node.y = null;
            node.$y = (val) => {
                actualTimesCalled++;
                actualYValues.push(val)
                node.y = val;
            }
            node.$height = () => {
                return [8, 15];
            }
        });
        const yBaseline = 33;
        const visual = fixture.visual;
        const expectedYValues = [
            [25, 18], // [yBaseline - 8, yBaseline - 15]
            [25, 18],
            [25, 18],
            [25, 18],
        ]
        gtap.$alignBottom(yBaseline).action(visual);

        t.equal(actualTimesCalled, 4, "should call $alignBottom() once per shape node");
        t.deepEqual(actualYValues, expectedYValues, "should $y values set based on $height mappings");
        t.end();
    });

    testCase.test("aggregates value with data.max() when height is mappable", t => {
        let actualTimesCalled = 0;
        let actualYValues = [];
        const fixture = setupEmptyShapeFixture(node => {
            node.y = null;
            node.$y = (val) => {
                actualTimesCalled++;
                actualYValues.push(val)
                node.y = val;
            }
            node.$height = () => {
                return [8, 15];
            }
        });
        const visual = fixture.visual;
        const expectedYValues = [
            [12, 5], // [dataMax - 8, dataMax - 15] dataMax = 20
            [12, 5],
            [12, 5],
            [12, 5],
        ]
        gtap.$alignBottom().action(visual);

        t.equal(actualTimesCalled, 4, "should call $alignBottom() once per shape node");
        t.deepEqual(actualYValues, expectedYValues, "should $y values set based on $height mappings");
        t.end();
    });
});