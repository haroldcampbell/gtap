// import {
//     $id,
//     $data,
//     $maxWidth,
//     $maxHeight,
//     $width,
//     $height,
//     $alignBottom,
//     $alignRight,
//     $xOffset,
//     $yOffset,
//     container,
// } from '/assets/dist/gtap.js'

// Function.prototype.construct = function(aArgs) {
//     var oNew = {};
//     oNew.__proto__ = _a.$data
//     this.apply(oNew, aArgs);
//     return oNew
// }
// ...gtap;

let _ = gtap;
// console.log("[site.js]>>gtap: ", gtap.$id("example-bar-1"))

let barsData = _.$data([50, 20, 30, 10, 50]);

let ctx = _.container("bar-1", _.$id("example-bar-1"));
_.renderVisuals(ctx, [_.$bars(barsData, [_.$maxHeight(50), _.$yOffset(30), _.$width(150)])]);

ctx = _.container("bar-2", _.$id("bus-bar-1"));
_.renderVisuals(ctx, [
    _.$bars(barsData, [
        _.$y(20),
        _.$maxHeight(20),
        _.$yOffset(10),
        _.$width(80),
        _.$xIncrement(10)
    ])
]);

// let multiData = _.$multiData([[50, 10], [20, 15], [30, 5], [10, 30], [50, 15]]);

ctx = _.container("bar-3", _.$id("bus-bar-2"));
_.renderVisuals(ctx, [
    _.$bars(barsData, [
        _.$y(15),
        _.$maxWidth(80),
        _.$yOffset(25),
        _.$height(20)
    ])
]);


// let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];
let exArcData1 = _.$data([50, 20, 30, 10, 50], "arc");
ctx = _.container("arc-1", _.$id("bus-arc-1"));
_.renderVisuals(ctx, [
    _.$arcs(exArcData1, [
        _.$x(75),
        _.$y(75),
        _.$arcSpanUnit(60),
        _.$arcRadius(50),
        _.$arcRadiusOffset(5)
    ])
]);

ctx = _.container("arc-2", _.$id("bus-arc-2"));
_.renderVisuals(ctx, [
    _.$arcs(exArcData1, [
        _.$x(75),
        _.$y(75),
        _.$arcSpanUnit(60),
        _.$arcRotateBy(90),
        _.$arcSpanOffset(10),
        _.$arcRadius(50)])
]);