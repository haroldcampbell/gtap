
/**
 * Rotates the text.
 *
 * If there is a nested textPath's, that center will be used.
 * Otherwise, we attempt to use the specified x and y values.
 *
 * @param {string} data - degrees to rotate the text
 * @param {Number} x - point that will be used if there is no textPath
 * @param {Number} y - point that will be used if there is no textPath
 *
 * @return {Object} Intent meta-data
 */
export function $textRotate(data, x = 0, y = 0) {
    return {
        type: "effect",
        name: "data",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$rotateText(this.data, x, y);
            });
        }
    };
}