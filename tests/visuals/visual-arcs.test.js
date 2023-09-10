import * as utils from "../utils"
import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const data = gtap.$data([1, 2, 3]);
    const parentElement = new utils.MockHTMLNode();

    return {
        parentElement: parentElement,
        data,
    };
};

test("arc visual", testCase => {
    testCase.test("arcs should add paths to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            gtap.$arcs(fixture.data, [])
        ];

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, visuals);

        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 3, "the number of arc visuals should be equal to the number of data items");
        t.equal(fixture.parentElement.childNodes.length, 1);
        t.end();
    });
});