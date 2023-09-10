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

test("Animation core", testCase => {
    testCase.test("$animate() creates context", t => {
        const context = {
            isAnimationContext: true,
            duration: 1,
            type: "ease-test",
            action: null,
            from: 0,
        }

        const actualContext = gtap.$animate(context.duration, context.type, context.action);

        t.deepEqual(context, actualContext, "$animate() should create a context based on its properties");
        t.end();
    });

    testCase.test("$triggerAnimation() ignore actions with noAnimate set", t => {
        let val = 0;
        const fnc = val => val += 1;
        const fixture = setupFixtures();

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, [
            gtap.$empty(fixture.data, [
                gtap.$animate(1, "ease-in", gtap.$noop(fnc))
            ])
        ]);

        t.deepEqual(0, val, "$triggerAnimation() ran on actions that had a noAnimate property set to true");
        t.end();
    });
});