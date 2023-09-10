import * as gtap from '../../assets/dist/gtap.js'

let ellipsesData1 = gtap.$data([10, 60, 30, 40, 50]);

let ctx = gtap.container("ellipses-1", gtap.$id("example-ellipses-1"));
gtap.renderVisuals(ctx, [
    gtap.$ellipses(ellipsesData1, [gtap.$group("c4-e1"), gtap.$y(50), gtap.$x(30), gtap.$xOffset(70), gtap.$max(30)])
]);

let ex4EllipsesData2 = gtap.$data([50, 25, 60, 10, 100]);
let ex4EllipsesData3 = gtap.$data([15, 80, 20, 60, 70]);
let ex4EllipsesData4 = gtap.$data([30, 40, 40, 30, 50]);

ctx = gtap.container("ellipses-2", gtap.$id("example-ellipses-2"));
gtap.renderVisuals(ctx, [
    gtap.$ellipses(ellipsesData1, [gtap.$group("c5-e1"), gtap.$y(50), gtap.$x(40), gtap.$xOffset(80), gtap.$max(20)]),
    gtap.$ellipses(ex4EllipsesData2, [gtap.$group("c5-e2"), gtap.$y(50), gtap.$x(40), gtap.$xOffset(80), gtap.$max(40)]),
    gtap.$ellipses(ex4EllipsesData3, [gtap.$group("c5-e3"), gtap.$y(50), gtap.$x(40), gtap.$xOffset(80), gtap.$max(30)]),
    gtap.$ellipses(ex4EllipsesData4, [gtap.$group("c5-e4"), gtap.$y(50), gtap.$x(40), gtap.$xOffset(80), gtap.$max(15)]),
]);