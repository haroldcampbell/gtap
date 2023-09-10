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

test("ellipse visual", testCase => {
    testCase.test("ellipses should add ellipses to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            gtap.$ellipses(fixture.data, [])
        ];

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, visuals);

        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 3, "the number of ellipse visuals should be equal to the number of data items");
        t.end();
    });
});