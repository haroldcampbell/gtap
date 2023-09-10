export const testTagName = (shape, testCase, expectedValue) => {
    testCase.test("SVG Element", t => {
        t.equal(shape.tagName, expectedValue, "SVG Element tag should be correct");
        t.end();
    });
}

export const testDefaultClass = (shape, testCase, expectedValue) => {
    testCase.test("default $class()", t => {
        t.equal(shape.$class(), expectedValue, "$class() should have default value set");
        t.end();
    });
}

export const testAttrHelperProperty = (shape, testCase, propertyName, attrName, additionalTestCases = null) => {
    testCase.test(`${propertyName} property`, t => {
        const expectedValue = 220;

        if (typeof shape[propertyName] != 'function') {
            t.equal(typeof shape[propertyName], 'function', `${propertyName} is not a attr() property`);
            t.end();
            return;
        }

        shape[propertyName](expectedValue);

        t.equal(shape[propertyName](), expectedValue, `${propertyName}() should be able to set and read new value`);
        t.equal(shape.$attr(attrName), `${expectedValue}`, `${propertyName}() should be set ${attrName} attrib`);

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testAttrTextHelperProperty = (shape, testCase, propertyName, attrName, additionalTestCases = null) => {
    testCase.test(`${propertyName} property`, t => {
        const expectedValue = "some-text-value";

        if (typeof shape[propertyName] != 'function') {
            t.equal(typeof shape[propertyName], 'function', `${propertyName} is not a attr() property`);
            t.end();
            return;
        }

        shape[propertyName](expectedValue);

        t.equal(shape[propertyName](), expectedValue, `${propertyName}() should be able to set and read new value`);
        t.equal(shape.$attr(attrName), expectedValue, `${propertyName}() should be set ${attrName} attrib`);

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testXProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$x() property", t => {
        const expectedValue = 220;

        shape.$x(expectedValue);

        t.equal(shape.$x(), expectedValue, "$x() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testYProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$y() property", t => {
        const expectedValue = 220;

        shape.$y(expectedValue);

        t.equal(shape.$y(), expectedValue, "$y() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testXY = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$xy() property", t => {
        const x = 404;
        const y = 314;

        shape.$xy(x, y);

        t.deepEqual(shape.$xy(), [x, y], "$xy() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testWidthProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$width() property", t => {
        const expectedValue = 220;

        shape.$width(expectedValue);

        t.equal(shape.$width(), expectedValue, "$width() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testHeightProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$height() property", t => {
        const expectedValue = 220;

        shape.$height(expectedValue);

        t.equal(shape.$height(), expectedValue, "$height() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testDefaultProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("default property values", t => {
        if (additionalTestCases != null) additionalTestCases(shape, t);

        t.end();
    });
}

export const testStrokeWidthProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$strokeWidth() property", t => {
        const expectedValue = 220;

        shape.$strokeWidth(expectedValue);

        t.equal(shape.$strokeWidth(), expectedValue, "$strokeWidth() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testStrokeColorProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$strokeColor() property", t => {
        const expectedValue = "red";

        shape.$strokeColor(expectedValue);

        t.equal(shape.$strokeColor(), expectedValue, "$strokeColor() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}
export const testToPoint = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$toPoint()", t => {
        const point = {
            x: 404,
            y: 314
        };

        shape.$toPoint(point);

        t.deepEqual(shape.$toPoint(), point, "$toPoint() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testTextProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$text() property", t => {
        const expectedValue = "Some random text";

        shape.$text(expectedValue)

        if (additionalTestCases == null) {
            throw new Error("additionalTestCases must be set for testTextProperty");
        }
        additionalTestCases(shape, t, expectedValue);

        t.end();
    });
}

export const testRadiusProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$radius() property", t => {
        const expectedValue = 220;

        shape.$radius(expectedValue);

        t.equal(shape.$radius(), expectedValue, "$radius() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}

export const testStartAngleProperty = (shape, testCase, additionalTestCases = null) => {
    testCase.test("$startAngle() property", t => {
        const expectedValue = 220;

        shape.$startAngle(expectedValue);

        t.equal(shape.$startAngle(), expectedValue, "$startAngle() should be able to set and read new value");

        if (additionalTestCases != null) {
            additionalTestCases(shape, t, expectedValue);
        }

        t.end();
    });
}