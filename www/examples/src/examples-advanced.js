import * as gtap from '../../assets/dist/gtap.js'

/* Advanced example */
let barsData = gtap.$data([50, 20, 30, 10, 50], "height");
let ex6EllipsesData1 = gtap.$data([50, 20, 30, 10, 50], "diameter");
let ex6EllipsesData2 = gtap.$data([20, 10, 30], "diameter");
let linesData1 = gtap.$data([
    1, 1, 4,
    2, 1, 5,
    1, 1, 7,
    2, 1, 2,
    5, 1, 1,
], "strokeWidth");

let ctx = gtap.container("advanced-1", gtap.$id("example-advanced-1"));
ctx = gtap.onRenderCompleted(ctx, () => {
    gtap.$moveBelow("c6-e3", "c6-be")
});
gtap.renderVisuals(ctx, [
    gtap.$bars(barsData, [
        gtap.$group("c6-be"), gtap.$maxHeight(50),
        gtap.$y(50), gtap.$yOffset(30), gtap.$width(150)
    ]),
    gtap.$ellipses(ex6EllipsesData1, [
        gtap.$group("c6-e1"),
        gtap.$maxDiameter(50),
        gtap.$y(50), gtap.$x(150),
        gtap.$cyOffset(30),
    ]),
    gtap.$ellipses(ex6EllipsesData2, [
        gtap.$group("c6-e2"),
        gtap.$maxDiameter(60),
        gtap.$y(55),
        gtap.$cyOffset(80),
        gtap.$x(400),
    ]),
    gtap.$connectingLines(linesData1, [
        gtap.$joinGroupItems(["c6-e1", "c6-e2"]),
        gtap.$group("c6-e3"),
        gtap.$maxStrokeWidth(15)
    ]),
]);