import * as utils from "../utils"
import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const data = gtap.$data([1, 2, 3]);
    const parentElement = new utils.MockHTMLNode();

    return {
        parentElement,
        data,
    };
};

test("polygon visual", testCase => {
    testCase.test("1 path node after render", t => {
        const fixture = setupFixtures();

        const visuals = [
            gtap.$polygon(fixture.data, [])
        ];

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, visuals);

        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 1, "the polygon visuals should only have one child");
        t.equal(svgNode.childNodes[0].tagName, "path", "should have a path node")
        t.equal(svgNode.childNodes[0].$class(), "polygon", "should have correct CSS class for polygon")
        t.end();
    });
});