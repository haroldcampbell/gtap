import * as gtap from '../../assets/dist/gtap.js'

let exSegmentData1 = gtap.$data([45, 45, 90, 180]);

const [x1, x2, x3, x4] = [60, 180, 300, 425];
const [y1, y2, y3] = [80, 190, 325];

let ctx = gtap.container("segment-1", gtap.$id("example-segments"));
ctx = gtap.onRenderCompleted(ctx, _ => {
    const codeMap = loadCodeMaps();
    const codePreviewElm = gtap.$id("segments-code-preview");

    Object.keys(codeMap).forEach(nodeId => {
        const node = gtap.$id(ctx.domContainer.getElementById(nodeId));
        node.onmouseover = () => {
            dehighlightNodes(ctx.domContainer);
            node.$removeCSS("in-active");
            codePreviewElm.innerHTML = codeMap[nodeId]
        }
    });
});

gtap.renderVisuals(ctx, [
    // ROW 1
    gtap.$segments(exSegmentData1, [
        gtap.$group("y1-x1"),
        gtap.$x(x1), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y1-x2"),
        gtap.$x(x2), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcRadiusOffset(5),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y1-x3"),
        gtap.$x(x3), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcRadiusOffset(5), gtap.$arcRotateBy(30),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y1-x4"),
        gtap.$x(x4), gtap.$y(y1),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcRadiusOffset(5), gtap.$radialOffset(20, 2),
    ]),

    // ROW 2
    gtap.$segments(exSegmentData1, [
        gtap.$group("y2-x1"),
        gtap.$x(x1), gtap.$y(y2),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(0),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y2-x2"),
        gtap.$x(x2), gtap.$y(y2),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(10),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y2-x3"),
        gtap.$x(x3), gtap.$y(y2),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(10), gtap.$arcRotateBy(30),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y2-x4"),
        gtap.$x(x4), gtap.$y(y2),
        gtap.$arcRadius(40), gtap.$arcSpanUnit(90), gtap.$arcSpanOffset(10), gtap.$arcRotateBy(30), gtap.$radialOffset(10, 2),
    ]),

    // ROW 3
    gtap.$segments(exSegmentData1, [
        gtap.$group("y3-x1"),
        gtap.$x(x1), gtap.$y(y3),
        gtap.$arcSpread(360), gtap.$arcRadius(40),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y3-x2"),
        gtap.$x(x2), gtap.$y(y3),
        gtap.$arcSpread(360), gtap.$arcRadius(40), gtap.$arcSpanInset(5),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y3-x3"),
        gtap.$x(x3), gtap.$y(y3),
        gtap.$arcSpread(360), gtap.$arcRadius(40), gtap.$arcSpanInset(5), gtap.$radialOffset(10, 2),
    ]),

    gtap.$segments(exSegmentData1, [
        gtap.$group("y3-x4"),
        gtap.$x(x4), gtap.$y(y3),
        gtap.$arcSpread(360),
        gtap.$arcRadius(40),
        gtap.$arcSpanInset(5),
        gtap.$arcRotateBy(30),
        gtap.$animate(0.8, "ease-out", gtap.$radialOffset(20)),
    ]),
]);

function dehighlightNodes(domContainer) {
    domContainer.childNodes.forEach(node => {
        const elm = gtap.$id(node)
        elm.$appendCSS("in-active");
    });
}

function loadCodeMaps() {
    const codeMap = {};

    codeMap["y1-x1"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x1), $y(y1),</span>
    <div class='code-focus'>$arcRadius(<span class='active'>40</span>)</div>,
    <div class='code-focus'>$arcSpanUnit(<span class='active'>90</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y1-x2"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x2), $y(y1),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    <div class='code-focus'>$arcRadiusOffset(<span class='active'>5</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y1-x3"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x3), $y(y1),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcRadiusOffset(<span class='active'>5</span>),
    <div class='code-focus'>$arcRotateBy(<span class='active'>30</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y1-x4"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x4), $y(y1),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcRadiusOffset(<span class='active'>5</span>),
    <div class='code-focus'>$radialOffset(<span class='active'>20</span>, <span class='active'>2</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y2-x1"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x1), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    <div class='code-focus'>$arcSpanOffset(<span class='active'>0</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y2-x2"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x2), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    <div class='code-focus'>$arcSpanOffset(<span class='active'>10</span>)</div>
<span class='noise'>]</span>)`


    codeMap["y2-x3"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x3), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcSpanOffset(<span class='active'>10</span>),
    <div class='code-focus'>$arcRotateBy(<span class='active'>30</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y2-x4"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x4), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcSpanOffset(<span class='active'>10</span>),
    $arcRotateBy(<span class='active'>30</span>),
    <div class='code-focus'>$radialOffset(<span class='active'>10</span>, <span class='active'>2</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x1"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x1), $y(y3),</span>
    <div class='code-focus'>$arcSpread(<span class='active'>360</span>)</div>,
    <div class='code-focus'>$arcRadius(<span class='active'>40</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x2"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x2), $y(y3),</span>
    $arcSpread(<span class='active'>360</span>),
    $arcRadius(<span class='active'>40</span>),
    <div class='code-focus'>$arcSpanInset(<span class='active'>5</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x3"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x3), $y(y3),</span>
    $arcSpread(<span class='active'>360</span>),
    $arcRadius(<span class='active'>40</span>),
    $arcSpanInset(<span class='active'>5</span>),
    <div class='code-focus'>$radialOffset(<span class='active'>10</span>, <span class='active'>2</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x4"] = `$segments(<span class='noise'>exSegmentData1, [
    $x(x4), $y(y3),</span>
    $arcSpread(<span class='active'>360</span>),
    $arcRadius(<span class='active'>40</span>),
    $arcSpanInset(<span class='active'>5</span>),
    <div class='code-focus'>$arcRotateBy(<span class='active'>30</span>)</div>,
    <div class='code-focus'>$radialOffset(<span class='active'>10</span>)</div>
<span class='noise'>]</span>)`

    return codeMap;
}