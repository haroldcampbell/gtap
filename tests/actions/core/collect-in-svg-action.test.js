import * as gtap from '../../../lib/gtap'
import * as fixtureUtils from './_common.fixture'

import test from "tape"

test("$collectInSVG", testCase => {
    testCase.test("should create node with svgCreator when container doesn't exist", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => { });
        const visual = fixture.visual;

        let actualName = null;
        let actualParentElm = null;
        let didCallSVGCreator = false;
        const actualChildNodes = [];

        const action = gtap.$collectInSVG("groupFoo");
        const svgCreator = (parent, name) => {
            actualName = name;
            actualParentElm = parent;
            didCallSVGCreator = true;
            return {
                appendChild: (v) => {
                    actualChildNodes.push(v)
                }
            };
        }

        action.svgCreator = svgCreator;
        action.action(visual);

        t.equal(actualName, "groupFoo", "should set the new svg container name");
        t.deepEqual(actualChildNodes, visual.shapeNodes, "should add child nodes to the svg container");
        t.deepEqual(actualParentElm, visual.shapeNodes[0].$parentElm, "should be add new svgContainer to existing parent element");
        t.true(didCallSVGCreator, "should call svgCreator to create new svg that will contain collected nodes");
        t.end();
    });

    testCase.test("should collect child in existing node", t => {
        const fixture = fixtureUtils.setupEmptyShapeFixture(node => { });
        const visual = fixture.visual;

        const actualChildNodes = [];
        const containerId = "mock-container";

        const group = gtap.$svgNode("group", document.body);
        group.$id(containerId);
        group.appendChild = (v) => {
            actualChildNodes.push(v)
        }

        let didCallSVGCreator = false;
        const action = gtap.$collectInSVG(containerId);
        action.svgCreator = (parent, name) => {
            /** Should not call the svgCreator since we are adding to an existing container */
            didCallSVGCreator = true;
        };
        action.action(visual);

        t.false(didCallSVGCreator, "should not use svgCreator for existing containers");
        t.deepEqual(actualChildNodes, visual.shapeNodes, "should add child nodes to the existing container");

        t.end();
    });
})