import * as gtap from '../../assets/dist/gtap.js'

let tableData = gtap.$tableData([
    [],
    ["one"],
    ["water", "tea", "cola"],
    ["apple", "orange", "pear"],
    ["chairs", "lamps", "beds", "fans"],
    // ["chairs", "lamps", "beds", "fans"],
    // ["chairs", "lamps", "beds", "fans"],
    // ["chairs", "lamps", "beds", "fans"],
    // ["xxx", "ccc", "zzz", "fans"],
]);

// let structuredData = gtap.$tableData([{
//         "name": "drinks",
//         "values": [
//             "water", "tea", "cola"
//         ]
//     },
//     {
//         "name": "fruits",
//         "values": ["apple", "orange", "pear"]
//     },
//     {
//         name: "furniture",
//         values: ["chairs", "lamps", "beds", "fans"]
//     }
// ]);

// let spanStructuredData = gtap.$tableData([{
//     "name": "drinks",
//     "values": [
//         "water", "tea", "cola"
//     ]
// },
// {
//     "name": "fruits",
//     "values": ["apple", "orange", "pear"]
// },
// {
//     name: "furniture",
//     values: ["chairs", "lamps", "beds", "fans"]
// }
// ]);

let ctx = gtap.container("table-1", gtap.$id("example-table-1"));
gtap.renderVisuals(ctx, [
    /* Example with array of arrays */
    gtap.$table(tableData, [
        gtap.$x(20),
        gtap.$y(20),
        gtap.$width(400),
        gtap.$height(150),
    ], (context) => {
        context.textNode.$text(context.dataItemText)
        context.textNode.$fontSize(1);
        context.textNode.$style("fill:red; font-size: 0.5em");
    }),

    /* Example with structured data */
    // gtap.$table(structuredData, [
    //     gtap.$x(20),
    //     gtap.$y(180),
    //     gtap.$width(220),
    //     gtap.$height(120),
    // ], (context) => {
    //     context.textNode.$text(context.dataItemText)
    //     context.textNode.$fontSize(1);
    //     context.textNode.$style("fill:red; font-size: 0.5em");
    // }),
]);