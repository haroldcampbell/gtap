import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$group", testCase => {
    testCase.test("create group when it doesn't exist", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => { });
        const visual = fixture.visual;

        let actualName = null;
        let actualParentElm = null;
        const actualChildNodes = [];
        let didCallGroupCreator = false;

        const action = gtap.$group("groupFoo");
        const groupCreator = (parent, name) => {
            actualName = name;
            actualParentElm = parent;
            didCallGroupCreator = true;
            return {
                appendChild: (v) => {
                    actualChildNodes.push(v)
                }
            };
        }

        action.groupCreator = groupCreator;
        action.action(visual);

        t.equal(actualName, "groupFoo", "should set the name of the new group");
        t.deepEqual(actualChildNodes, visual.shapeNodes, "should add child nodes to the group node");
        t.true(didCallGroupCreator, "should call svgCreator to create new group that will contain child nodes");
        t.deepEqual(actualParentElm, visual.shapeNodes[0].$parentElm, "should be add new group node to existing parent element");
        t.end();
    });

    testCase.test("collect child in existing node", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => { });
        const visual = fixture.visual;

        const actualChildNodes = [];
        const containerId = "mock-group";

        const group = gtap.$svgNode("group", document.body);
        group.$id(containerId);
        group.appendChild = (v) => {
            actualChildNodes.push(v)
        }

        let didCallGroupCreator = false;
        const action = gtap.$group(containerId);
        action.groupCreator = (parent, name) => {
            /** Should not call the groupCreator since we are adding to an existing container */
            didCallGroupCreator = true;
        };
        action.action(visual);

        t.false(didCallGroupCreator, "should not use groupCreator for existing group");
        t.deepEqual(actualChildNodes, visual.shapeNodes, "should add child nodes to the existing group");

        t.end();
    });
})