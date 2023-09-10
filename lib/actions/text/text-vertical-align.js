
/**
 * Aligns the text around the dominant-baseline
 * @param {string} data - the options are top | middle \ bottom
 * @return {Object} Intent meta-data
 */
export function $textVerticalAlign(data) {
    return {
        type: "effect",
        name: "textVerticalAlign",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$vAlign(this.data);
            });
        }
    };
}

