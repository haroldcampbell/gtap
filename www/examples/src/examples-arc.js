import * as gtap from '../../assets/dist/gtap.js'

let exArcData1 = gtap.$data([10, 20, 40, 15, 10]);
let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];

let ctx = gtap.container("arc-1", gtap.$id("example-arc-1"));
gtap.renderVisuals(ctx, [
    gtap.$arcs(exArcData1, [
        gtap.$x(100), gtap.$y(100),
        gtap.$arcSpanUnit(60), gtap.$arcRadius(50), gtap.$arcRadiusOffset(5)
    ]),

    gtap.$arcs(exArcData1, [
        gtap.$x(250), gtap.$y(100),
        gtap.$arcSpanUnit(60), gtap.$arcSpanOffset(10), gtap.$arcRadius(50)
    ]),
]);

ctx = gtap.container("arc-2", gtap.$id("example-arc-2"));
gtap.renderVisuals(ctx, [
    gtap.$arcs(exArcData1, [
        gtap.$x(100), gtap.$y(100),
        gtap.$arcSpanUnit(60), gtap.$arcSpanOffset(10),
        gtap.$arcRadius(50), gtap.$arcRadiusOffset(5)
    ]),
]);

ctx = gtap.container("arc-3", gtap.$id("example-arc-3"));
gtap.renderVisuals(ctx, [
    gtap.$arcs(exArcData1, [
        gtap.$x(100), gtap.$y(100),
        gtap.$arcSpanUnit(60),
        gtap.$arcRadius(50), gtap.$arcRadiusOffset(5),
        // $arcRotateBy(0),
        gtap.$animate(2, "ease-in-out", gtap.$arcRotateBy(30)),
    ]),
]);
// arcs(exArcData1, [$x(250), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50), $arcRotateBy(30)]),
// arcs(exArcData1, [$x(400), $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50), $arcRadiusOffset(5), $arcRotateBy(30)]),

ctx = gtap.container("arc-4", gtap.$id("example-arc-4"));
gtap.renderVisuals(ctx, [
    gtap.$arcs(exArcData1, [
        gtap.$x(80), gtap.$y(100),
        gtap.$arcSpanUnit(60), gtap.$arcSpanOffset(10),
        gtap.$arcLambda({
            radius: 50,
            maxWidth: 3
        }, (intent, v, i) => {
            let base = i / (exArcData1.data.length * 1.0);
            v.$strokeColor(gtap.$hsl(base));
            v.$strokeWidth(intent.data.maxWidth);
            v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue / 2.0 + 5);
        }),
    ]),

    gtap.$arcs(exArcData1, [
        gtap.$x(250), gtap.$y(100),
        gtap.$arcSpanUnit(60), gtap.$arcSpanOffset(10),
        gtap.$arcLambda({
            radius: 50,
            maxWidth: 3
        }, (intent, v, i) => {
            let base = i / (exArcData1.data.length * 1.0);
            v.$strokeColor(gtap.$hsl(base));
            v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue / 2.0 + 5);
            v.$strokeWidth(intent.data.maxWidth + intent.data.maxWidth * base * 10);
        }),
    ]),

    gtap.$arcs(exArcData1, [
        gtap.$x(400), gtap.$y(100),
        gtap.$arcSpanUnit(60), gtap.$arcSpanOffset(0),
        gtap.$arcLambda({
            radius: 50,
            maxWidth: 5,
            colors: colorsData
        }, (intent, v, i) => {
            let strokeWidth = intent.data.maxWidth / v._dataValue;
            v.$attr("stroke-linecap", "butt");
            v.$strokeWidth(strokeWidth);
            v.$strokeColor(intent.data.colors[i]);
            v.$radius(intent.data.radius + intent.data.maxWidth * v._dataValue / 2.0 + 5);
        }),
    ]),
]);