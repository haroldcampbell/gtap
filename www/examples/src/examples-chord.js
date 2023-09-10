import * as gtap from '../../assets/dist/gtap.js'

let exChordData1 = gtap.$data([10, 20, 30, 60, 120]);
let exChordData2 = gtap.$data([10, 10, 10, 10, 10]);

const [x1, x2, x3, x4] = [60, 180, 300, 425];
const [y1, y2, y3] = [80, 190, 325];

const ctx = gtap.container("chord-1", gtap.$id("example-chords"));
gtap.renderVisuals(ctx, [
    gtap.$segments(exChordData1, [
        gtap.$group("y1-x1"),
        gtap.$x(x1), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(5),
    ]),

    gtap.$arcs(exChordData1, [
        gtap.$group("y1-x2"),
        gtap.$x(x2), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(5),
    ]),

    gtap.$chords(exChordData1, [
        gtap.$group("y1-x3"),
        gtap.$x(x3), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(5),
    ]),

    // ROW 2
    gtap.$segments(exChordData1, [
        gtap.$group("y2-x1"),
        gtap.$x(x1), gtap.$y(y2),
        gtap.$arcSpread(360), gtap.$arcRadius(40), gtap.$arcSpanInset(2), gtap.$radialOffset(10, 2),
    ]),

    gtap.$arcs(exChordData1, [
        gtap.$group("y2-x2"),
        gtap.$x(x2), gtap.$y(y2),
        gtap.$arcSpread(360), gtap.$arcRadius(40), gtap.$arcSpanInset(2), gtap.$radialOffset(10, 2),
    ]),

    gtap.$chords(exChordData1, [
        gtap.$group("y2-x3"),
        gtap.$x(x3), gtap.$y(y2),
        gtap.$arcSpread(360), gtap.$arcRadius(40), gtap.$arcSpanInset(2), gtap.$radialOffset(10, 2),
    ]),

    // ROW 3
    gtap.$chords(exChordData1,
        radialIntents("y3-x1-1", x1, y3, [
            gtap.$arcRadiusOffset(5),
        ])),
    gtap.$chords(exChordData1,
        radialIntents("y3-x1-2", x1, y3, [
            gtap.$arcRadiusOffset(5),
            gtap.$arcRotateBy(30)
        ])),
    gtap.$chords(exChordData1,
        radialIntents("y3-x1-3", x1, y3, [
            gtap.$arcRadiusOffset(5),
            gtap.$arcRotateBy(60),
            // $arcAlignArcs(0),
        ])),

    // --
    gtap.$chords(exChordData1,
        radialIntents("y3-x2", x2, y3, [
            gtap.$arcRadiusOffset(5),
            gtap.$arcAlignArcs(1),
        ])),
        gtap.$chords(exChordData1,
        radialIntents("y3-x2", x2, y3, [
            gtap.$arcRadiusOffset(5),
            gtap.$arcRotateBy(30)
        ])),

        gtap.$arcs(gtap.$data([82, 75, 62, 50]),
        [gtap.$x(x4), gtap.$y(y3),
            gtap.$arcRadius(20),
            gtap.$arcRadiusOffset(15),
            gtap.$arcSpanUnit(295.2), // max of data => 82 => 82% of 360 => 295.2
            gtap.$arcRotateBy(-114.8),
            gtap.$strokeWidth(10),
            gtap.$strokeLineCap("square"),
            gtap.$arcAlignArcs(1),
            gtap.$lambda((v, index, action) => {
                v.$style(`${v.$style()}; opacity:${action.data[index]}`);
            }, [.25, .5, .75, 1]),
        ]),

]);

// radarComponent(exChordData2, x3, y3),

function radialIntents(name, x, y, additionalIntents) {
    const baseIntents = [
        gtap.$group(name),
        gtap.$x(x), gtap.$y(y),
        gtap.$arcRadius(40),
        gtap.$arcSpanUnit(30),
    ]
    return [...baseIntents, ...additionalIntents]
}

function radarIntentTemplate(x, y, segment, segmentSpan) {
    return [gtap.$group(`y3-x3-${segment+1}`),
        gtap.$x(x), gtap.$y(y),
        gtap.$arcRadius(20),
        gtap.$arcSpanUnit(segmentSpan),
        gtap.$arcRadiusOffset(8),
        gtap.$arcRotateBy(segmentSpan * segment),
    ]
}

function radarComponent(data, x, y, visuals) {
    const segmentCount = 5;
    const componentList = [];
    const segmentSpan = (360) / segmentCount;

    for (let segment = 0; segment < segmentCount; segment++) {
        componentList.push(
            gtap.$chords(data, radarIntentTemplate(x, y, segment, segmentSpan)),
            gtap.$arcs(data, [...radarIntentTemplate(x, y, segment, segmentSpan),
                gtap.$appendCSS('filled-chord')
            ])
        );
    }
    return componentList;
}