import * as utils from "../utils"
import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixtures = () => {
    const offset = 20;
    const rawData = [10, 20, 15, 25]
    const parentElement = new utils.MockHTMLNode();

    return {
        offset,
        rawData,
        parentElement: parentElement,

        connectedTuplesData: [
            [10, 20],
            [20, 15],
            [15, 25]
        ],
        connectedTupleOffsets: [
            [0, 20],
            [20, 40],
            [40, 60]
        ],

        dataPairs: [
            [10, 10],
            [20, 20],
            [15, 15],
            [25, 25]
        ],
        offsetPairs: [
            [0, 0],
            [20, 20],
            [40, 40],
            [60, 60]
        ]
    };
};

const createVisualsFixture = (fixture, actions = [], options) => {
    const visuals = [
        gtap.$lines(gtap.$data(fixture.rawData), actions, options)
    ];

    const context = gtap.container("test", fixture.parentElement);
    gtap.renderVisuals(context, visuals);

    return fixture.parentElement.childNodes[0];
}
test("lines visual", testCase => {
    testCase.test("[isConnected:true] add paths to svgNode", t => {
        const fixture = setupFixtures();
        const svgNode = createVisualsFixture(fixture, [], {
            isConnected: true
        });
        const expectedValue = fixture.rawData.length - 1;

        t.equal(svgNode.childNodes.length, expectedValue, "the number of lines visuals should be less than the number of data points");
        t.end();
    });

    testCase.test("[isConnected:false] add paths to svgNode", t => {
        const fixture = setupFixtures();
        const svgNode = createVisualsFixture(fixture, [], {
            isConnected: false
        });
        const expectedValue = fixture.rawData.length;

        t.equal(svgNode.childNodes.length, expectedValue, "the number of lines visuals should be the same as the number of data points");
        t.end();
    });

    testCase.test("[isConnected:undefined] add paths to svgNode", t => {
        const fixture = setupFixtures();
        const svgNode = createVisualsFixture(fixture);
        const expectedValue = fixture.rawData.length;

        t.equal(svgNode.childNodes.length, expectedValue, "the number of lines visuals should be the same as the number of data points");
        t.end();
    });

    testCase.test("[isConnected:true] y-properties lines connected", t => {
        const xValue = 200;
        const fixture = setupFixtures();
        const svgNode = createVisualsFixture(fixture, [
            /** Actions are order-aware */
            gtap.$x(xValue),
            gtap.$y(200),
            gtap.$xOffset(fixture.offset), // offset subsequent visuals
            gtap.$maxY(25), // scales the max y to this value, which is itself 25 :),
        ], {
            isConnected: true
        });

        const expectedYValues = fixture.connectedTuplesData.flat() // flattened pairs of [y1, y2]
        const actualYValues = Array.from(svgNode.childNodes).map(l => [l.$y1(), l.$y2()]).flat()

        const expectedXValues = fixture.connectedTupleOffsets.flat().map(val => val + xValue) // flattened pairs of [x1, x2]
        const actualXValues = Array.from(svgNode.childNodes).map(l => [l.$x1(), l.$x2()]).flat()

        t.deepEqual(actualYValues, expectedYValues, "y values should be set")
        t.deepEqual(actualXValues, expectedXValues, "x values should be set")
        t.end();
    });

    testCase.test("[isConnected:false] y-properties lines connected", t => {
        const fixture = setupFixtures();
        const svgNode = createVisualsFixture(fixture, [
            /** Actions are order-aware */
            gtap.$x(0),
            gtap.$xOffset(fixture.offset), // offset subsequent visuals
            gtap.$maxY(25), // scales the max y to this value, which is itself 25 :),
        ], {
            isConnected: false
        });

        const expectedYValues = fixture.dataPairs.flat() // flattened pairs of [y1, y2]
        const actualYValues = Array.from(svgNode.childNodes).map(l => [l.$y1(), l.$y2()]).flat()

        const expectedXValues = fixture.offsetPairs.flat() // flattened pairs of [x1, x2]
        const actualXValues = Array.from(svgNode.childNodes).map(l => [l.$x1(), l.$x2()]).flat()

        t.deepEqual(actualYValues, expectedYValues, "y values should be set")
        t.deepEqual(actualXValues, expectedXValues, "x values should be set")
        t.end();
    });

    testCase.test("[isConnected:true] x-properties lines connected", t => {
        const fixture = setupFixtures();

        /** Actions are order-aware */
        const visuals = [
            gtap.$lines(gtap.$data(fixture.rawData), [
                gtap.$y(0),
                gtap.$yOffset(fixture.offset), // offset subsequent visuals
                gtap.$maxX(25) // scales the max x to this value, which is itself 25 :)
            ], {
                isConnected: true
            })
        ];

        const context = gtap.container("test", fixture.parentElement);
        gtap.renderVisuals(context, visuals);

        const svgNode = fixture.parentElement.childNodes[0];
        const expectedYValues = fixture.connectedTuplesData.flat()
        const actualYValues = Array.from(svgNode.childNodes).map(l => [l.$x1(), l.$x2()]).flat()

        const expectedXValues = fixture.connectedTupleOffsets.flat()
        const actualXValues = Array.from(svgNode.childNodes).map(l => [l.$y1(), l.$y2()]).flat()

        t.deepEqual(actualYValues, expectedYValues, "y values should be set")
        t.deepEqual(actualXValues, expectedXValues, "x values should be set")
        t.end();
    });

    testCase.test("[isConnected:false] x-properties lines connected", t => {
        const fixture = setupFixtures();
        const svgNode = createVisualsFixture(fixture, [
            gtap.$y(0),
            gtap.$yOffset(fixture.offset), // offset subsequent visuals
            gtap.$maxX(25) // scales the max x to this value, which is itself 25 :)
        ], {
            isConnected: false
        });

        const expectedYValues = fixture.offsetPairs.flat()
        const actualYValues = Array.from(svgNode.childNodes).map(l => [l.$y1(), l.$y2()]).flat()

        const expectedXValues = fixture.dataPairs.flat()
        const actualXValues = Array.from(svgNode.childNodes).map(l => [l.$x1(), l.$x2()]).flat()

        t.deepEqual(actualYValues, expectedYValues, "y values should be set")
        t.deepEqual(actualXValues, expectedXValues, "x values should be set")
        t.end();
    });
});