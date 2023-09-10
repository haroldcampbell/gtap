import * as gtap from '../../assets/dist/gtap.js'

let exSegmentData1 = gtap.$data([45, 45, 90, 180]);
let textData = gtap.$data(["Bart", "Jenny", "Tod", "Alwin"]);

const [x1, x2, x3, x4] = [60, 180, 300, 425];
const [y1, y2, y3] = [80, 190, 325];

let pathToFollow1 = gtap.$segments(exSegmentData1, [
    gtap.$x(x1), gtap.$y(y2),
    gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(0)]);

let pathToFollow2 = gtap.$arcs(exSegmentData1, [
    gtap.$x(x2), gtap.$y(y2),
    gtap.$arcSpanUnit(60), gtap.$arcSpanOffset(10), gtap.$arcRadius(50)]);

let ctx = gtap.container("text-along-paths-1", gtap.$id("example-text-1"));
gtap.renderVisuals(ctx, [
    gtap.$textAlongPaths(pathToFollow1, textData, []),
    pathToFollow1,

    gtap.$textAlongPaths(pathToFollow2, textData, []),
    pathToFollow2,
]);