import * as gtap from '../../assets/dist/gtap.js'

let ctx = gtap.container("prect-1", gtap.$id("example-prect"));


const r = gtap.prect(gtap.$id("prect-1"))

r.$style("stroke: red; stroke-width:1px;")
r.$draw({ x: 100, y: 100 }, { width: 200, height: 100 }, { c1: 0, c2: 0, c3: 30, c4: 0 });


const rect = gtap.rect(gtap.$id("prect-1"));

rect.$xy(100, 100);
rect.$size(200, 100);
rect.$style("stroke: green; stroke-width:1px; opacity:0.5;")