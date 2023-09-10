
/**
 * Sets the text-size value of the visuals
 * @function $textSize
 * @param {number} data
 * @return {Object} Intent meta-data
 */
export function $textSize(data) {
    return {
        type: "effect",
        name: "data",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$fontSize(this.data);
            });
        }
    };
}
