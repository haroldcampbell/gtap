/**
 * Returns the maximum value in an array.
 *
 * @param {Array} array - a single columned array of numbers
 *
 * @return {Number} the max value in the array
 */
export function findArrayMax(array) {
    return Math.max(...array, [Number.NEGATIVE_INFINITY]);
}

/**
 * Takes an mxn array and reduces it to an mx1 array. Each value of the new
 * array is the result of the summing of the columns.
 *
 * @example
 *
 *      If we started with the array:
 *      arr = [
 *          [1, 0, 3],
 *          [2, 4, 3],
 *          [7, 1, 0],
 *          [0, 0, 5],
 *      ]
 *
 *      newArr = reduceColumns(arr)
 *
 *      Will result in newArr =>
 *      [
 *          4,
 *          9,
 *          8,
 *          5
 *      ]
 *
 * @param {Array} oldArray - an mxn array
 *
 * @return {Array} returns a single dimensional array
 */
export function reduceColumns(oldArray) {
    return oldArray.map(columns => columns.reduce((acc, curr) => acc + curr));
}

export function maxAcrossColumns(rawData) {
    const array = reduceColumns(rawData)
    const maxVal = findArrayMax(array);

    return [maxVal, maxVal];
}


export function maxInColumns(rawData, columnCount) {
    const columnMaxValues = [];

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        let itemsByColumn = rawData.map(i => i[columnIndex])
        const colMax = findArrayMax(itemsByColumn);

        columnMaxValues.push(colMax);
    }

    return columnMaxValues;
}

export function $collectTuples(list, tupleLength, tupleDataCallback) {
    if (list.length <= 1) {
        return []
      }

      let tuples = [];
      let currentTuple = [];

      list.forEach((item, index) => {
        let tupleData = tupleDataCallback(item, index);
        currentTuple.push(tupleData);

        if (currentTuple.length == tupleLength) {
          tuples.push(currentTuple);
          currentTuple = [];
          currentTuple.push(tupleData);
        }
      });

      return tuples;
}