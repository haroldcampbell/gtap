import * as utils from "../utils"
import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const data = gtap.$data([1, 2, 3]);
    const parentElement = new utils.MockHTMLNode();

    return {
        data,
        parentElement
    }
}

test("Pipeline", testCase => {
    testCase.test("should call all effects", t => {
        let effectsCalled = 0;
        const data = gtap.$data([1])
        const parentElement = setupFixtures().parentElement;
        const noopCallback = _ => {
            effectsCalled++;
        };

        const visuals = [
            gtap.$empty(data, [
                gtap.$noop(noopCallback),
                gtap.$noop(noopCallback),
                gtap.$noop(noopCallback)
            ])
        ];

        const context = gtap.container("test", parentElement);
        gtap.renderVisuals(context, visuals);

        t.equal(effectsCalled, 3);
        t.end();
    });

    testCase.test("container creates svgNode", t => {
        // const fixture = setupFixtures();

        // const context = gtap.container("test", fixture.parentElement);
        // gtap.renderVisuals(context, []);

        // t.equal(fixture.parentElement.childNodes.length, 1);
        // t.equal(fixture.parentElement.childNodes[0].constructor.name, "SVGSVGElement", "container should add svgNode to parentElement");
        // t.end();
    });


    testCase.test("container adds svgNode to document.body by default", t => {
        const visuals = [
            gtap.$empty(gtap.$data([1, 2, 3]), [])
        ];

        const context = gtap.container("test1");
        gtap.renderVisuals(context, visuals);

        const svgNode = document.getElementById("test1");

        t.equal(svgNode.tagName, "svg", "should add svgNode to document.body");
        t.true(svgNode, "should add svgNode to document.body when parentElement is not specified");
        t.end();
    });

    testCase.test("container calls onRenderCompleted() callback", t => {
        const data = gtap.$data([1])
        let stateTracker = "";

        const noopCallback = _ => {
            stateTracker += "a";
        };
        const visuals = [
            gtap.$empty(data, [
                gtap.$noop(noopCallback),
                gtap.$noop(noopCallback),
                gtap.$noop(noopCallback)
            ])
        ];

        const emptyCallback = _ => {
            stateTracker += "b"
        };

        let context = gtap.container("test-onRenderCompleted")
        context = gtap.onRenderCompleted(context, _ => {
            emptyCallback();
        });
        gtap.renderVisuals(context, visuals);

        t.equal(stateTracker, "aaab", "should call onRenderCompleted() after visuals have been rendered");
        t.end();
    });

    testCase.test("visual onFinalizeRender() callback called", t => {
        const data = gtap.$data([1])
        let stateTracker = "";

        const noopCallback = _ => {
            stateTracker += "a";
        };

        const visualWithCallback = gtap.$empty(data, [
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback)
        ]);
        visualWithCallback.onFinalizeRender = () => {
            stateTracker += "b"
        }

        const visuals = [
            gtap.$empty(data, []),
            visualWithCallback,
            gtap.$empty(data, [
                gtap.$noop(noopCallback),
                gtap.$noop(noopCallback)
            ])
        ];

        let context = gtap.container("test-onFinalizeRender");
        context = gtap.onRenderCompleted(context, _ => {
            stateTracker += "x"
        });
        gtap.renderVisuals(context, visuals);

        t.equal(stateTracker, "aaabaax", "should call onFinalizeRender() of visual before container onRenderCompleted()");
        t.end();
    });
});