import * as gtap from '../dist/gtap.js'

let barsData = gtap.$data([50, 20, 30, 10, 50]);

let ctx = gtap.container("bar-1", gtap.$id("example-bar-1"));
gtap.renderVisuals(ctx, [
    gtap.$bars(barsData, [
        gtap.$maxHeight(50),
        gtap.$animate(.8, "ease-in-out", gtap.$maxHeight(50)),
        gtap.$animate(1.2, "ease-in-out", gtap.$width(150)),
        gtap.$animate(1.0, "ease-out", gtap.$yOffset(30)),
    ]),

    gtap.$bars(barsData, [
        gtap.$x(200),
        gtap.$maxHeight(50),
        gtap.$yOffset(30),
        gtap.$width(150)
    ]),
]);

// ctx = gtap.container("bar-2", gtap.$id("example-bar-2"))
// gtap.renderVisuals(ctx, [
//     gtap.$bars(barsData, [
//         gtap.$maxHeight(50),
//         gtap.$xOffset(30),
//         gtap.$animate(0.8, "ease-out", gtap.$width(150)),
//         gtap.$yOffset(30)
//     ]),

//     gtap.$bars(barsData, [
//         gtap.$x(200),
//         gtap.$maxHeight(50),
//         gtap.$xOffset(30),
//         gtap.$width(150),
//         gtap.$yOffset(30)
//     ])
// ]);

// ctx = gtap.container("bar-3", gtap.$id("example-bar-3"))
// gtap.renderVisuals(ctx, [
//     gtap.$bars(gtap.$data(barsData.rawData()), [
//         gtap.$maxWidth(50), gtap.$yOffset(30), gtap.$height(20)
//     ])
// ]);

// ctx = gtap.container("bar-4", gtap.$id("example-bar-4"))
// gtap.renderVisuals(ctx, [
//     gtap.$bars(gtap.$data(barsData.rawData()), [
//         gtap.$maxWidth(50), gtap.$alignRight(), gtap.$yOffset(30), gtap.$height(20)
//     ])
// ]);

// ctx = gtap.container("bar-5", gtap.$id("example-bar-5"))
// gtap.renderVisuals(ctx, [
//     gtap.$bars(barsData, [gtap.$maxHeight(50), gtap.$xOffset(30), gtap.$width(15)])
// ]);

// ctx = gtap.container("bar-6", gtap.$id("example-bar-6"))
// gtap.renderVisuals(ctx, [
//     gtap.$bars(barsData, [gtap.$maxHeight(50), gtap.$alignBottom(100), gtap.$xOffset(30), gtap.$width(15)])
// ]);