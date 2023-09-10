import * as gtap from '../../lib/gtap'

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const data = gtap.$data([1, 2, 3]);

    testUtils.resetDocumentBody()
    const parentElement = document.body;
    const shape = gtap.group(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape,
        data
    };
};

test("group node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "g");

    testCase.test("SVG group did nest child elements", t => {
        const fixture = setupFixture();
        const Ids = ["a1", "a2", "a3"];
        const visuals = [
            gtap.$arcs(fixture.data, [gtap.$group("y1-x3"), gtap.$domId(Ids)])
        ];

        const context = gtap.container("test", document.body);
        gtap.renderVisuals(context, visuals);

        const groupElement = document.getElementById("y1-x3")
        const actualId = Array.from(groupElement.childNodes).map(c => c.$id())

        t.equal(groupElement.childNodes.length, fixture.data.itemCount(), "$group() should nest its children")
        t.deepEqual(actualId, Ids, "$group() should have all the children");
        t.end();
    });
});