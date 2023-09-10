/**
 * Sets the text value of the visuals based on the raw data value
 * @function $dataItem
 * @param {String} formatterCallback - callback of the form function(rawDataValue, index) that is used to format each data item.
 * @return {Object} Intent meta-data
 */
export function $rawDataValue(formatterCallback = (s) => s) {
    return {
        type: "effect",
        name: "data",
        action(visuals) {
            visuals.shapeNodes.forEach((v, index) => {
                v.$text(formatterCallback(v._rawDataValue, index));
            });
        }
    };
}