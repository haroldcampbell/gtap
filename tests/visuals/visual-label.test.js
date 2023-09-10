import * as utils from "../utils"
import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const parentElement = new utils.MockHTMLNode();

    return {
        parentElement: parentElement,
        data: "Hello world"
    };
};

test("label visual", testCase => {
    testCase.test("label should add text to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            gtap.$label(fixture.data, [])
        ];

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, visuals);

        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.textContent, fixture.data, "textContent should be set to the data");
        t.equal(svgNode.childNodes.length, 1, "the label visuals should only have one child");
        t.end();
    });
});