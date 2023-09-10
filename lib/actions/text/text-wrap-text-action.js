

/**
 * Wraps the text if it pass the specified width
 *
 * @function $wrapText
 * @param {number} maxWidth - the length of the text that trigger wrapping
 * @param {number} lineGapHeight - the space between lines
 * @param {boolean} breakOnWord - True to break on word-boundary, False for character-boundary
 * @return {Object} Intent meta-data
 */
export function $wrapText(maxWidth, lineGapHeight=0, breakOnWord=true) {
    return {
        name: "wrapText",
        maxWidth,
        lineGapHeight,

        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$wrapText(maxWidth, lineGapHeight, breakOnWord);
            });
        }
    };
}
