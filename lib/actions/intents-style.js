/**
 * Sets the css class value of the visuals
 * @function $css
 * @param {number} data
 * @return {Object} Intent meta-data
 */
export function $css(data) {
    return {
        type: "effect",
        name: "css",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$class(this.data);
            });
        }
    };
}

/**
 * Appends the css class value to the existing values of the visuals
 * @function $appendCSS
 * @param {number} data
 * @return {Object} Intent meta-data
 */
export function $appendCSS(data) {
    return {
        type: "effect",
        name: "appendCSS",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$appendCSS(this.data);
                // v.$class(`${v.$class()} ${this.data}`);
            });
        }
    };
}

/**
 * Sets the style class value of the visuals
 * @function $style
 * @param {number|function} data
 *      When data is being used as a callback then the expected signature is fn(node, index)
 *
 * @return {Object} Intent meta-data
 */
export function $style(data) {
    return {
        type: "effect",
        name: "style",
        data,
        action(visuals) {
            if (typeof data === "function") {
                /* data is a callback that is being used to set the style */
                visuals.shapeNodes.forEach((v, index) => v.$style(data(index, v)));
                return
            }
            visuals.shapeNodes.forEach(v => {
                v.$style(this.data);
            });
        }
    };
}

/**
 * Appends the style value to the existing values of the visuals
 * @function $appendStyle
 * @param {number} data
 * @return {Object} Intent meta-data
 */
export function $appendStyle(data) {
    return {
        type: "effect",
        name: "appendStyle",
        data,
        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                v.$style(`${v.$style()} ${this.data}`);
            });
        }
    };
}

/**
 * Uses a callback the determine the style for each shape of the visual.
 *
 * @param {Function} callback - Callback is of the form: function(thisAction, shapeNode, shapeNodeIndex)
 *
 * @return {Object} Intent meta-data
 */
export function $styleLambda(callback) {
    return {
        name: "lambda",
        noAnimate: true,

        action(visuals) {
            visuals.shapeNodes.forEach((v, index) => {
                const newStyle = callback(this, v, index);
                v.$style(newStyle);
            })
        } // action
    } // return
}