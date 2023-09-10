import * as utils from "../utils"
import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const parentElement = new utils.MockHTMLNode();

    return {
        parentElement: parentElement,
    };
};

test("vLine visual", testCase => {
    testCase.test("vLine should add text to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            gtap.$vLine([])
        ];

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, visuals);

        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 1, "the vLine visuals should only have one child");
        t.equal(svgNode.childNodes[0].tagName, "line", "should have a line node")
        t.equal(svgNode.childNodes[0].$class(), "line", "should have correct CSS class for line")
        t.end();
    });
});