import * as gtap from '../../lib/gtap'

import {
    textAlongPath
} from "../../lib/nodes/nodes-text-along-path"

import {
    TextVerticalAlign
} from "../../lib/nodes/nodes-utils"

import * as testUtils from "../utils"
import * as nodeFixtureUtils from './_common.fixture'

import test from "tape"

const setupFixture = () => {
    const parentElement = new testUtils.MockHTMLNode();
    const shape = textAlongPath(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("textAlongPath node", testCase => {
    nodeFixtureUtils.testTagName(setupFixture().shape, testCase, "text");
    nodeFixtureUtils.testDefaultClass(setupFixture().shape, testCase, null);
    nodeFixtureUtils.testDefaultProperty(setupFixture().shape, testCase, (shape, t) => {
        t.equal(shape.$x(), null, "$x() should be null by default");
        t.equal(shape.$y(), null, "$y() should be null by default");
        t.equal(shape.$pathRefId(), null, "$pathRefId() should be null by default");
        t.equal(shape.$fontSize(), null, "$fontSize() should be null by default");
        t.equal(shape.$vAlign(), null, "$vAlign() should be null by default");

        t.deepEqual(shape.$xy(), [null, null], "$xy() should be [0,0] by default");
        t.deepEqual(shape.$toPoint(), {
            x: null,
            y: null
        }, "$toPoint() should have default");
    });

    nodeFixtureUtils.testXProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testYProperty(setupFixture().shape, testCase);
    nodeFixtureUtils.testXY(setupFixture().shape, testCase);
    nodeFixtureUtils.testToPoint(setupFixture().shape, testCase);

    testCase.test("$pathRefId()", t => {
        const shape = setupFixture().shape;
        const expectedRefID = "xd-23-34";

        shape.$pathRefId(expectedRefID);

        t.equal(shape.$pathRefId(), expectedRefID, "$pathRefId() should be able to set and read new value");
        t.equal(shape.$attr("path-ref-id"), expectedRefID, "$pathRefId() should set 'path-ref-id' attrib");
        t.end();
    });

    testCase.test("$fontSize()", t => {
        const shape = setupFixture().shape;
        const expectedFontSize = 12;

        shape.$fontSize(expectedFontSize);

        t.equal(shape.$fontSize(), expectedFontSize, "$fontSize() should be able to set and read new value");
        t.equal(shape.$attr("font-size"), `${expectedFontSize}`, "$fontSize() should set 'font-size' attrib");
        t.end();
    });

    testCase.test("$textAnchor()", t => {
        const shape = setupFixture().shape;
        const expectedTextAnchor = "fake-text-anchor";

        shape.$textAnchor(expectedTextAnchor);
        t.equal(shape.$textAnchor(), expectedTextAnchor, "$textAnchor() should be able to set and read new value");
        t.equal(shape.$attr("text-anchor"), `${expectedTextAnchor}`, "$textAnchor() should set 'font-size' attrib");
        t.end();
    });

    testCase.test("$vAlign()", t => {
        const shape = setupFixture().shape;
        const vAlignMappings = {}
        vAlignMappings[TextVerticalAlign.TOP] = "baseline";
        vAlignMappings[TextVerticalAlign.MIDDLE] = "middle";
        vAlignMappings[TextVerticalAlign.BOTTOM] = "hanging";

        const actualAlignment = [];
        const actualAttrAlignment = [];
        const expectedAlignment = ["baseline", "middle", "hanging"]
        Object.keys(vAlignMappings).forEach(alignmentKey => {
            shape.$vAlign(alignmentKey);
            actualAlignment.push(shape.$vAlign());
            actualAttrAlignment.push(shape.$attr("dominant-baseline"));
        })

        t.deepEqual(actualAlignment, expectedAlignment, "$vAlign() should set dominant-baseline");
        t.deepEqual(actualAttrAlignment, expectedAlignment, "$vAlign() should set dominant-baseline attribute");
        t.end();
    });

    testCase.test("$text()", testCase => {
        testCase.test("pathRefId not set", t => {
            const shape = setupFixture().shape;
            const expectedValue = "fake text";
            const oldTraceHandler = console.trace;

            let didCallConsoleTrace = false;
            let actualErrorMessage = null;

            console.trace = (errorMessage) => {
                didCallConsoleTrace = true;
                actualErrorMessage = errorMessage;
            }

            shape.$text(expectedValue);

            console.trace = oldTraceHandler;

            t.true(didCallConsoleTrace, "should dump an error when path not found from $pathRefId()");
            t.isNot(actualErrorMessage, null, "should set and error message")
            t.equal(shape.children.length, 0, "should not have any textPath child nodes");
            t.end();
        });

        testCase.test("pathRefId set", t => {
            const shape = setupFixture().shape;
            const expectedValue = "fake text";
            const expectedPathRefId = "fake-ref-id";
            const oldTraceHandler = console.trace;

            let didCallConsoleTrace = false;

            console.trace = () => {
                didCallConsoleTrace = true;
            }
            shape.$pathRefId(expectedPathRefId)
            shape.$text(expectedValue);

            console.trace = oldTraceHandler;

            t.false(didCallConsoleTrace, "should NOT dump an error when $pathRefId() is set");
            t.equal(shape.children.length, 1, "should have any textPath child node");
            t.end();
        });

        testCase.test("textPath properties set", t => {
            const shape = setupFixture().shape;
            const expectedValue = "fake text";
            const expectedPathRefId = "fake-ref-id";

            shape.$pathRefId(expectedPathRefId)
            shape.$text(expectedValue);

            const textPathNode = shape.children[0];

            t.equal(textPathNode.$class(), "text-path", "$class() should be set");
            t.equal(textPathNode.$attr("href"), `#${expectedPathRefId}`, "'href' attribute should be set");
            t.equal(textPathNode.textContent, expectedValue, "'textContent' attribute should be set");

            t.equal(shape.children.length, 1, "should have any textPath child node");
            t.end();
        });

        testCase.test("textPath.$textAnchor()", t => {
            const shape = setupFixture().shape;

            shape.$pathRefId("fake-ref-id")
            shape.$text("fake text");

            const textPathNode = shape.children[0];

            t.equal(typeof textPathNode.$textAnchor, "function", "textPathNode should have $textAnchor()");
            t.equal(textPathNode.$textAnchor(), null, "textPathNode.$textAnchor() default should be null");

            const expectedTextAnchor = "fake-text-anchor";
            textPathNode.$textAnchor(expectedTextAnchor);
            t.equal(textPathNode.$textAnchor(), expectedTextAnchor, "textPathNode.$textAnchor() should set and read value");
            t.equal(textPathNode.$attr("text-anchor"), expectedTextAnchor, "textPathNode.$textAnchor() should set text-anchor attribute");

            t.end();
        });
    });

    testCase.test("$rotateText()", testCase => {
        testCase.test("no child nodes", t => {
            const shape = setupFixture().shape;
            const [degrees, x, y] = [15, 3, 14];

            shape.$rotateText(degrees, x, y);

            t.equal(shape.$attr("transform"), `rotate(${degrees} ${x}, ${y})`, "should set transform attribute");
            t.end();
        });

        testCase.test("child node same as pathRefId", t => {
            const [xOffset, yOffset] = [10, 20];
            const [degrees, x, y] = [15, 3, 14];
            const expectedPathRefId = "fake-ref-id";

            const fixture = setupFixture()
            const shape = fixture.shape;

            const shapeWithXYProperties = testUtils.emptyShape(node => {
                node.$x = gtap._$.__attr(node, "x");
                node.$y = gtap._$.__attr(node, "y");
                node.$id = gtap._$.__attrText(node, "id");
            });

            let pathNode = shapeWithXYProperties(fixture.parentElement);
            pathNode.$id(expectedPathRefId)
            pathNode.$x(xOffset);
            pathNode.$y(yOffset);

            let didLogMessage = false;

            testUtils.hijack(document, 'getElementById', (name) => name === expectedPathRefId ? pathNode : null, () => {
                testUtils.hijack(console, 'log', (message) => didLogMessage = true, () => {
                    shape.$pathRefId(expectedPathRefId);
                    shape.$text("fake text");
                    shape.$rotateText(degrees, x, y);
                });
            });

            t.false(didLogMessage, "should not log an error message");
            t.equal(shape.$attr("transform"), `rotate(${degrees} ${xOffset + x}, ${yOffset + y})`, "should set transform attribute");
            t.end();
        });

        testCase.test("child node same as pathRefId with no $x() and $y()", t => {
            const [degrees, x, y] = [15, 3, 14];
            const expectedPathRefId = "fake-ref-id";

            const fixture = setupFixture()
            const shape = fixture.shape;

            const shapeWithXYProperties = testUtils.emptyShape(node => {
                node.$id = gtap._$.__attrText(node, "id");
            });

            let pathNode = shapeWithXYProperties(fixture.parentElement);
            pathNode.$id(expectedPathRefId)

            let didLogMessage = false;

            testUtils.hijack(document, 'getElementById', (name) => name === expectedPathRefId ? pathNode : null, () => {
                testUtils.hijack(console, 'log', (message) => didLogMessage = true, () => {
                    shape.$pathRefId(expectedPathRefId);
                    shape.$text("fake text");
                    shape.$rotateText(degrees, x, y);
                });
            });

            t.false(didLogMessage, "should not log an error message");
            t.equal(shape.$attr("transform"), `rotate(${degrees} ${x}, ${y})`, "should set transform attribute");
            t.end();
        });

        testCase.test("child node not found", t => {
            const expectedShapeId = "fake-shape-id";
            const expectedPathRefId = "fake-ref-id";
            const expectedLogMessage = `textAlongPath[$rotateText] Unable to find pathNode. textAlongPathId: ${expectedShapeId}. pathRefId: ${expectedPathRefId}`;

            const shape = setupFixture().shape;

            let didLogMessage = false;
            let actualLogMessage = null;

            testUtils.hijack(console, 'log', (message) => {
                didLogMessage = true
                actualLogMessage = message;
            }, () => {
                shape.$id(expectedShapeId);
                shape.$pathRefId(expectedPathRefId);
                shape.$text("fake text");
                shape.$rotateText(...[15, 3, 14]);
            });

            t.true(didLogMessage, "should log an error message");
            t.equal(actualLogMessage, expectedLogMessage, "should log correct message")
            t.equal(shape.$attr("transform"), null, "should NOT set transform attribute");
            t.end();
        });
    });

    testCase.test("$clearText()", t => {
        const shape = setupFixture().shape;

        shape.$pathRefId("fake-ref-id")
        shape.$text("fake text");
        shape.$clearText();

        t.equal(shape.children.length, 0, "should remove the textPath child node");
        t.end();
    });
});