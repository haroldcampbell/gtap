
/**
 * Aligns the text around its own center.
 *
 * See ref here: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
 *
 * @param {string} data - the options are start | middle | end.
 * @return {Object} Intent meta-data
 */
export function $textAnchor(data) {
    return {
        type: "effect",
        name: "data",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                if (v.childNodes.length > 0 && v.childNodes[0].tagName == "textPath") {
                    v.childNodes[0].$textAnchor(this.data);
                } else {
                    v.$textAnchor(this.data);
                }
            });
        }
    };
}


export const TextAnchor = {
    START: "start",
    MIDDLE: "middle",
    END: "end"
  }