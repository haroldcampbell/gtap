import * as gtap from '../../../lib/gtap'
import {
    setupFixture
} from './_common.fixture'

import test from "tape"

function createFakeProperty(node, getterCallback, setterCallback) {
    node.$fakeProperty = null;
    node.$fakeAttribute = (val) => {
        if (val === undefined) {
            return getterCallback(node);
        }
        setterCallback(node, val);
    }
}

test("$tapAttr", testCase => {
    testCase.test("doesn't affect attributes", t => {
        let actualTapGetterCalled = 0;
        const actualTapSetterValues = [];
        const visual = setupFixture().visual;

        const attrGetter = (node) => {
            actualTapGetterCalled++;
            return node.$fakeProperty;
        }

        const attrSetter = (node, val) => {
            node.$fakeProperty = val
            actualTapSetterValues.push(val);
        }

        /** Create new fakeAttribute */
        visual.shapeNodes.forEach(v => {
            createFakeProperty(v, attrGetter, attrSetter);
        });

        const tapGetterCallback = (attrNameDesc, node, shadowedAttrName) => {
            return node[shadowedAttrName]();
        }
        const tapSetterCallback = (attrNameDesc, val) => { }

        /** Create the tap on the fakeAttribute */
        gtap.$tapAttr("$fakeAttribute", ">>$fakeAttribute<<", tapGetterCallback, tapSetterCallback).action(visual);

        gtap.$each(v => {
            v.$fakeAttribute(101); /** set the fakeAttribute */
            v.$fakeAttribute(); /** get the fakeAttribute */
        }).action(visual);

        t.equal(actualTapGetterCalled, 4, "should have called the property");
        t.deepEqual(actualTapSetterValues, [101, 101, 101, 101], "should have set the property value");
        t.end()
    });

    testCase.test("calls tapGetter and tapSetter", t => {
        const visual = setupFixture().visual;
        const attrGetter = (node) => node.$fakeProperty;
        const attrSetter = (node, val) => node.$fakeProperty = val;

        /** Create new fakeAttribute */
        visual.shapeNodes.forEach(v => {
            createFakeProperty(v, attrGetter, attrSetter);
        });

        /** Setup the callback for tapping the getter */
        let actualTapGetterDesc = [];
        let actualTapGetterCalled = 0;
        let actualGetterResultsAccessed = [];
        const tapGetterCallback = (attrNameDesc, node, shadowedAttrName) => {
            const result = node[shadowedAttrName]();

            actualTapGetterCalled++;
            actualTapGetterDesc.push(attrNameDesc);
            actualGetterResultsAccessed.push(result);

            return result;
        }

        /** Setup the callback for tapping the setter */
        let actualTapSetterDesc = [];
        let actualTapSetterCalled = 0;
        let actualSetterResultsSet = [];
        const tapSetterCallback = (attrNameDesc, val) => {
            actualTapSetterCalled++;
            actualTapSetterDesc.push(attrNameDesc);
            actualSetterResultsSet.push(val);
        }

        /** create the tap on the fakeAttribute */
        const desc = ">>$fakeAttribute<<";
        gtap.$tapAttr("$fakeAttribute", desc, tapGetterCallback, tapSetterCallback).action(visual);

        gtap.$each(v => {
            v.$fakeAttribute(101); /** set the fakeAttribute */
            v.$fakeAttribute(); /** get the fakeAttribute */
        }).action(visual);

        t.equal(actualTapGetterCalled, 4, "should call tap getter");
        t.equal(actualTapSetterCalled, 4, "should call tap setter");

        t.deepEqual(actualTapGetterDesc, [desc, desc, desc, desc], "should have desc for getters");
        t.deepEqual(actualTapSetterDesc, [desc, desc, desc, desc], "should have desc for setters");

        t.deepEqual(actualGetterResultsAccessed, [101, 101, 101, 101], "should intercept the property value being accessed");
        t.deepEqual(actualSetterResultsSet, [101, 101, 101, 101], "should intercept the property value being set");
        t.end()
    });
});