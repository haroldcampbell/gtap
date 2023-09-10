import * as utils from "./../utils"
import * as gtap from './../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const data = gtap.$data([1, 2, 3]);
    const parentElement = new utils.MockHTMLNode();

    return {
        data,
        parentElement
    }
}

test("CreateVisual", testCase => {
    testCase.test("New context", t => {
        const visualContext = gtap.createVisual();

        t.equal(0, visualContext.shapeNodes.length, "Should not have any shapeNodes");
        t.end();
    });

    testCase.test("withAction", t => {
        const noopCallback = (_) => { };
        const visualContext = gtap.createVisual();

        visualContext.withActions([
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback)
        ]);

        t.equal(3, visualContext.__actions.length, "Should add actions");
        t.end();
    });

    testCase.test("getActions", t => {
        const noopCallback = (_) => { };
        const visualContext = gtap.createVisual();

        const actions = [
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback)
        ];

        visualContext.withActions(actions);
        const actual = visualContext.getActions();

        t.deepEqual(actions, actual, "Should return the actions that was added with withActions(...)");
        t.end();
    });

    testCase.test("withSVGShapeCreator", testCase => {
        testCase.test("Assigned callback", t => {
            const visualContext = gtap.createVisual();

            visualContext.withSVGShapeCreator((container) => {
                return gtap.addEmptyShape();
            });

            t.isNot(visualContext.__createSVGShapeCallback, null, "Should set SVG node creator callback")
            t.end();
        });

        testCase.test("Accepts only functions", t => {
            const visualContext = gtap.createVisual();

            t.throws(() => {
                visualContext.withSVGShapeCreator(123);
            }, "Should throw error when callback is not a function");
            t.end();
        });
    });

    testCase.test("withData", testCase => {
        testCase.test("Assigns data", t => {
            const data = gtap.$data([1])
            const visualContext = gtap.createVisual();

            visualContext.withData(data);

            t.isEqual(visualContext.getData(), data, "Should set SVG node creator callback")
            t.end();
        });

        testCase.test("Called onChangedCallback", t => {
            let dataChangedCount = 0;
            const noopCallback = _ => {
                dataChangedCount++;
            };
            const data = gtap.$data([1])
            const visualContext = gtap.createVisual();

            visualContext.onDataDidChange = noopCallback;
            visualContext.withData(data);
            data.appendDataEnd([2]);

            t.equal(dataChangedCount, 1, "Should trigger data changed callback")
            t.end();
        });
    });

    testCase.test("prepareVisual", t => {
        const actions = [];
        const parentElement = setupFixtures().parentElement;
        const visualContext = gtap.createVisual();

        let calledShapeCreator = false;
        visualContext.withData(gtap.$data([1]));
        visualContext.withActions(actions);
        visualContext.withSVGShapeCreator((container) => {
            calledShapeCreator = true;
            return gtap.addEmptyShape();
        });

        gtap.prepareVisual(visualContext, parentElement);

        const actualContainer = visualContext.getContainer();

        t.equal(actualContainer, parentElement, "Should set domContainer");
        t.equal(calledShapeCreator, true, "Should call shape creator");
        t.end();
    });

    testCase.test("addActions", t => {
        const noopCallback = (_) => { };
        const visualContext = gtap.createVisual();

        const actions = [
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback)
        ];

        visualContext.withActions(actions);
        visualContext.addActions([gtap.$noop(noopCallback)]);
        const actual = visualContext.getActions();

        t.deepEqual(actual.length, 4, "Should add actions when addActions() is called");
        t.end();
    });

    testCase.test("applyActions", t => {
        let effectsCalled = 0;
        const parentElement = setupFixtures().parentElement;
        const noopCallback = _ => {
            effectsCalled++;
        };
        const visualContext = gtap.createVisual();

        const actions = [
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback)
        ];

        visualContext.withData(gtap.$data([1]));
        visualContext.withActions(actions);
        visualContext.withSVGShapeCreator((container) => {
            return gtap.addEmptyShape();
        });

        gtap.prepareVisual(visualContext, parentElement);
        gtap.applyVisualActions(visualContext)

        t.equal(3, effectsCalled, "Should call each action");
        t.end();
    });

    testCase.test("applyPostActions", t => {
        let effectsCalled = 0;
        const parentElement = setupFixtures().parentElement;
        const noopCallback = _ => {
            effectsCalled++;
        };
        const visualContext = gtap.createVisual();

        const actions = [];

        const postActions = [
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback),
            gtap.$noop(noopCallback)
        ];

        visualContext.withData(gtap.$data([1]));
        visualContext.withActions(actions);
        visualContext.withPostActions(postActions);
        visualContext.withSVGShapeCreator((container) => {
            return gtap.addEmptyShape();
        });

        gtap.prepareVisual(visualContext, parentElement);
        gtap.applyVisualActions(visualContext)

        t.equal(3, effectsCalled, "Should call each post action");
        t.end();
    });
});