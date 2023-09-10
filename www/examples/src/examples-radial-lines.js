import * as gtap from '../../assets/dist/gtap.js'

let exChordData1 = gtap.$data([70, 35, 20, 30, 60, 25]);
let exChordData2 = gtap.$data([1, 15, 30, 45, 60, 70]);
let exLineMarks = gtap.$data([1, 1, 1, 1, 1, 1]);

const [x1, x2, x3, x4] = [60, 180, 300, 425];
const [y1, y2, y3] = [80, 190, 325];

const ctx = gtap.container("radia-1", gtap.$id("example-radial-lines"));
gtap.renderVisuals(ctx, [
    gtap.$ellipses(exChordData2, [
        gtap.$x(x3), gtap.$y(y1),
        gtap.$maxHeight(60),
        gtap.$maxWidth(60),
        gtap.$style("fill: none; stroke: #ccc;")
    ]),

    gtap.$radialLines(exLineMarks, [
        gtap.$x(x3), gtap.$y(y1),
        gtap.$arcMaxRadius(60),
        gtap.$arcEquiSpan(360),
        gtap.$appendCSS("radial-line-dark")
    ]),


    gtap.$radialLines(exChordData1, [
        gtap.$x(x3), gtap.$y(y1),
        gtap.$arcMaxRadius(60),
        gtap.$arcEquiSpan(360),
    ]),
]);