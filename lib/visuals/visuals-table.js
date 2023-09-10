import {
    rect,
    text,
    line,
} from '../nodes/gtap-nodes';

import {
    createVisual,
} from './create-visual'

/**
 *  Describes the table visuals.
 *
 *  @method $table
 *
 *  @param {Object} data - tabledata object
 *  @param {Array} actionsArray - array of actions
 *  @param {Callback} layoutFnc - function of the type (layoutManager, dataItem) => void
 *
 *  @return {Object}
 */
export const $table = function (data, actionsArray, layoutFnc) {
    let visual = createVisual();
    let tableNode = null;

    visual.withCreateShapesCallback(visual.__defaultSingleShapeCreator);

    visual.withCreateShapesCallback(vis => { // vis is an alias for the visual
        let svgShape = visual.__createSVGShapeCallback(visual.container);
        visual.__saveSVGShape(svgShape);

        tableNode = svgShape;
    });

    visual.onFinalizeRender = () => {
        const data = visual.getData();
        const layoutManager = new TableLayoutManager(visual.container, tableNode);

        layoutManager.$traverseRows(data.activeDataItems(), layoutFnc);

        visual.shapeNodes = [tableNode];
    };

    visual.withData(data)
        .withActions(actionsArray)
        .withSVGShapeCreator((container) => {
            return rect(container)
                .$x(0)
                .$y(0)
                .$width(0)
                .$height(0)
                .$class("bar table-bar");
        });

    return visual;
}

class TableContext {
    constructor(container, tableNode) {
        this.tableNode = tableNode;
        this.container = container;

        this.x = tableNode.$x();
        this.y = tableNode.$y();

        this.rowContexts = [];
        this.cellContexts = [];

        this.tableCellSpace = 0;
        this.tableCellWidth = 50;
        this.tableCellHeight = 20;
    }

    getMaxRowCellContextCount() {
        const array = this.rowContexts.map(r => r.cellContexts.length)
        return Math.max(...array, [Number.NEGATIVE_INFINITY]);
    }

    fixTableHoles() {
        const maxCellContextCount = this.getMaxRowCellContextCount();

        this.rowContexts.forEach(rowContext => {
            if (rowContext.cellContexts.length < maxCellContextCount) {
                rowContext.fillHoles(this, maxCellContextCount);
            }
        })
    }

    adjustSizing() {
        const columnCount = this.rowContexts[0].cellContexts.length;
        const maxColumnWidth = this.tableNode.$width() / columnCount;

        this.rowContexts.forEach(rowContext => {
            let x = this.tableNode.$x();
            rowContext.cellContexts.forEach(cell => {
                cell.cellNode.$width(maxColumnWidth)
                cell.cellNode.$x(x);

                if (cell.textNode) {
                    cell.textNode.$width(maxColumnWidth)
                    cell.textNode.$x(x + 2);
                }

                x = this.getNextColumnX(x, maxColumnWidth)
            })
        })
    }

    getNextColumnX(currentX, cellWidth = undefined) {
        if (cellWidth === undefined) {
            return currentX + this.tableCellWidth + this.tableCellSpace;
        }

        return currentX + cellWidth + this.tableCellSpace;
    }
}

class RowContext {
    constructor(y, index, dataItem, layoutFnc) {
        this.y = y;
        this.rowIndex = index;
        this.cellContexts = [];

        this.dataItem = dataItem;
        this.dataItemIndex = index;

        this.layoutFnc = layoutFnc;
    }

    fillHoles(tableContext, maxCellContextCount) {
        let x = 0;
        const lastCellIndex = this.cellContexts.length;

        if (this.cellContexts.length == 0) {
            x = tableContext.x;
        } else {
            const lastCellContext = this.cellContexts[lastCellIndex - 1];
            x = lastCellContext.x + (tableContext.tableCellWidth + tableContext.tableCellSpace);
        }

        for (let index = lastCellIndex; index < maxCellContextCount; index++) {
            const cellContext = new CellContext(x, this.y, index)

            cellContext.initCellNode(tableContext);

            // cellContext.layoutFnc(cellContext, tableContext)
            this.cellContexts.push(cellContext);
            tableContext.cellContexts.push(cellContext);

            x = tableContext.getNextColumnX(x);
        }
    }
}

class CellContext {
    constructor(x, y, dataIndex, dataItem, dataItemText) {
        this.x = x;
        this.y = y;

        this.colIndex = dataIndex;

        this.dataItem = dataItem;
        this.dataItemText = dataItemText;
    }

    initCellNode(tableContext) {
        this.cellNode = rect(tableContext.container);
        this.cellNode.$x(this.x);
        this.cellNode.$y(this.y);
        this.cellNode.$width(tableContext.tableCellWidth);
        this.cellNode.$height(tableContext.tableCellHeight);
        this.cellNode.$style("stroke:red");
    }

    initTextNode(tableContext) {
        this.textNode = text(tableContext.container);
        this.textNode.$x(this.x + 2);
        this.textNode.$y(this.y + tableContext.tableCellHeight / 2.0);

        this.textNode.$vAlign("middle")
    }
}

class TableLayoutManager {
    constructor(container, tableNode) {
        this.tableContext = new TableContext(container, tableNode);
    }

    ensureArrayData(dataItem) {
        if (!Array.isArray(dataItem)) {
            throw new Error("Had a dataItem that wasn't an array");
        }
    }

    traverseChildColumns(rowContext, dataItems) {
        let x = this.tableContext.x;

        dataItems.forEach((dataItem, index) => {
            const cellContext = new CellContext(x, rowContext.y, index, dataItem, dataItem)

            cellContext.initCellNode(this.tableContext);
            cellContext.initTextNode(this.tableContext);

            rowContext.layoutFnc(cellContext, this)
            rowContext.cellContexts.push(cellContext);
            this.tableContext.cellContexts.push(cellContext);

            x = this.tableContext.getNextColumnX(x);
        });
    }

    $traverseRows(dataItems, layoutFnc) {
        let y = this.tableContext.y;

        dataItems.forEach((dataItem, index) => {
            const rowContext = new RowContext(y, index, dataItem, layoutFnc);

            this.ensureArrayData(dataItem);
            this.traverseChildColumns(rowContext, dataItem)
            this.tableContext.rowContexts.push(rowContext);

            y += (this.tableContext.tableCellHeight + this.tableContext.tableCellSpace);
        });

        this.tableContext.fixTableHoles();
        this.tableContext.adjustSizing();

        const l1X = this.tableContext.x;
        const l1Y = this.tableContext.y + this.tableContext.tableCellHeight;
        const l1Width = this.tableContext.tableNode.$width();

        const l1 = line(this.tableContext.container, "dd", l1X, l1Y, l1Width, l1Y);
        l1.$style("stroke: #ccc; stroke-width:1.5px")
    }
}