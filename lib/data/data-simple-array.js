import {
  $isTruthy,
  copyProps
} from '../utils'

import {
  $collectTuples
} from './data-utils'

const normalizeData = (data, maxItem) => {
  let normalized = [];
  data.forEach(d => {
    let n = d / maxItem;
    normalized.push(n);
  })
  return normalized;
}

/* @return {number} - The max value in newData. */
const findMax = (data, oldMax = Number.NEGATIVE_INFINITY) => {
  return Math.max(...data, [oldMax]);
}

/* @return {number} - The min value in newData. */
const findMin = (data, oldMin = Number.POSITIVE_INFINITY) => {
  return Math.min(...data, [oldMin]);
}

const bindAppendActions = (dataObj) => {
  const actions = {
    __appendedData(newData, appenderAction) {
      const oldMax = this.max();
      let newMax = findMax(newData, oldMax);

      if (oldMax > newMax) {
        // Only need to normalize the newData
        console.log(appenderAction)
        appenderAction(...normalizeData(newData, oldMax))
      } else {
        // Re-normalize everything
        this._normalizedData = [...normalizeData(this.data, newMax)];
      }
      this.onDataChanged();
    },

    appendDataStart(newData) {
      // insert newData onto the start of the existing raw data
      this.data.unshift(...newData);
      this.__appendedData(newData, (d) => this._normalizedData.push(d));

      return this._normalizedData;
    },

    appendDataEnd(newData) {
      // append newData to the existing raw data
      this.data.push(...newData);
      this.__appendedData(newData, (d) => this._normalizedData.unshift(d));

      return this._normalizedData;
    },
  }

  copyProps(actions, dataObj)
}

const bindWindowingActions = (dataObj, data) => {
  const actions = {
    _startIndex: 0,
    _visibleItems: 0,
    _isClippingData: false,
    _activeDataItems: null,
    _onDataChangedCallback: null,
    _clippedData: null,

    _asClipped() {
      if ($isTruthy(this._clippedData)) {
        return this._clippedData;
      }

      this._asNormalized();
      this._clippedData = [
        ...this._normalizedData.slice(this._startIndex, this._startIndex + this._visibleItems)
      ]

      return this._clippedData;
    },

    _resetCachedValues() {
      this._clippedData = null; // Reset cached values
      this._activeDataItems = null;
    },

    activeDataItems() {
      if ($isTruthy(this._activeDataItems)) {
        return this._activeDataItems;
      }

      this._activeDataItems = this._isClippingData ? this._asClipped() : this._asNormalized();

      return this._activeDataItems;
    },

    collectTuples(tupleLength) {
      return $collectTuples(this.activeDataItems(), tupleLength, (item, index) => {
        return {
          d: item,
          index: index,
          rawValue: this.rawDataItem(index),
          _dataProperty: this.target,
        };
      });
    },

    /* @return {Number} - The un-normalized value at the specified index */
    rawDataItem(index) {
      return this.data[index]
    },

    onDataChanged() {
      this._resetCachedValues();

      if ((this._onDataChangedCallback == null) || (typeof this._onDataChangedCallback != "function")) {
        return;
      }
      this._onDataChangedCallback();
    },

    withVisibleItems(numVisibleItems, startFrom = 0) {
      this._visibleItems = numVisibleItems;
      this._isClippingData = (this._visibleItems < data.length);
      this._startIndex = startFrom < data.length ? startFrom : 0;
      this.onDataChanged();

      return this
    },

    withDataChangedCallback(callback) {
      if ((callback != null) && (typeof callback == "function")) {
        this._onDataChangedCallback = callback
      }

      return this;
    },
  }

  actions.withVisibleItems(data.length)

  copyProps(actions, dataObj)
}

/**
 * Represents an array of data times. Each data item is a single value.
 *
 * @function $data
 *
 * @param {Array} data - an array of values (e.g [1,4,5,8])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)

 * @return {Object}
 */
export function $data(data, targetAttr = null) {
  let dataObj = {
    type: "data",
    target: targetAttr,
    _maxData: null,
    _normalizedData: null,
    _summedData: null,
    data,

    sortAscending() {
      return this.data.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
    },

    sortDescending() {
      return this.data.sort((a, b) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
      });
    },

    rawData() {
      return this.data;
    },

    rawItemAtIndex(index) {
      return this.data[index]
    },

    itemAtIndex(index) {
      if (!$isTruthy(this._normalizedData)) {
        this._asNormalized();
      }
      return this._normalizedData[index];
    },

    /* @return {number} - Zero or the length of the data array.*/
    itemCount() {
      if ($isTruthy(this.data)) {
        return this.data.length;
      }
      return 0;
    },

    /* @return {Array} - An array of normalized values (i.e. between 0 t0 1.0).*/
    _asNormalized() {
      if ($isTruthy(this._normalizedData)) {
        /* Return the cached value if it exists. */
        return this._normalizedData;
      }

      this._normalizedData = [];
      let maxData = this.max();

      this.data.forEach(d => {
        if (d === null) {
          this._normalizedData.push(d);
          return;
        }
        let n = d / maxData;
        this._normalizedData.push(n);
      })

      return this._normalizedData;
    },

    /* @return {Number} - The sum of all the raw data items */
    summedData() {
      if ($isTruthy(this._summedData)) {
        /* Return the cached value if it exists. */
        return this._summedData;
      }
      this._summedData = this.data.reduce((a, b) => a + b, 0);

      return this._summedData;
    },

    /*
      Allows us to set the max value to a value that may not be in the data set.
      Calling this function can be expensive as it will trigger a re-normalization of the data.
    */
    forcedMax(arbitraryMaxValue) {
      this._maxData = arbitraryMaxValue;
      this._normalizedData = null;
      this._asNormalized();

      return this;
    },

    forcedMin(arbitraryMinValue) {
      this._minData = arbitraryMinValue;
    },

    /* @return {number} - The max value in values array.*/
    max() {
      if ($isTruthy(this._maxData)) {
        /* Return the cached value if it exists. */
        return this._maxData;
      }
      this._maxData = findMax(data);

      return this._maxData;
    },

    /* @return {number} - The min value in values array.*/
    min() {
      if ($isTruthy(this._minData)) {
        /* Return the cached value if it exists. */
        return this._minData;
      }
      this._minData = findMin(data);

      return this._minData;
    },
  };

  bindAppendActions(dataObj);
  bindWindowingActions(dataObj, data);

  return dataObj;
}