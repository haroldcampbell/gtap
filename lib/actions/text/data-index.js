/**
 * Sets the text value of the visuals based index of the data value
 * @function $dataIndex
 * @param {number} offset
 * @return {Object} Intent meta-data
 */
export function $dataIndex(offset = 0) {
    return {
        type: "effect",
        name: "data",
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$text(v._dataIndex + offset);
            });
        }
    };
}