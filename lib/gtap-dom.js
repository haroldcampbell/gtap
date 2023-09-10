import * as utils from "./utils";

/**
 * Append the specified classname to the html dom node.
 *
 * @param {DOMNode} node - the element that will be modified
 * @param {string} classname - the class that we want to append
 *
 * @return {Object} The DOMNode node
 */
function _$appendCSS(node, classname) {
    if (node.$hasClass(classname)) {
        return node;
    }

    let newClassList = node.$class() + ` ${classname}`;
    /** Remove consecutive spaces */
    newClassList = newClassList.split(" ").filter((e) => {
        return e.length > 0;
    });

    newClassList = newClassList.join(" ");
    node.$class(newClassList);

    return node;
}

/**
 * Remove the specified classname from the html dom node.
 *
 * @param {DOMNode} node  - the element that will be modified
 * @param {string} classname - the class name that will be removed

 * @return {Object} The DOMNode node
 */
function _$removeCSS(node, classname) {
    let arrNames = node
        .$class()
        .split(" ")
        .filter((css) => {
            const cname = css.trim();
            return cname === classname ? false : true;
        });

    const newClassList = arrNames.join(" ");
    node.$class(newClassList);

    return node;
}

function _$hasClass(node, classname) {
    let existingClassnames = node.$class();

    if (existingClassnames == null) {
        node.$class("");

        return false;
    }

    return existingClassnames.toLowerCase().includes(classname.toLowerCase());
}

export function $queryAll(selectors) {
    return document.querySelectorAll(selectors);
}

/**
 * Returns the node specified by the name wrapped with utility functions.
 *
 * @function $id
 *
 * @param {Object} name - either a string with the Id of the Node that we are
 *  looking for or a node.
 *
 * @return {DOMNode} returns the DOM node if found, or null it it doesn't exit.
 * Alternatively, if name is a DOM node, then name is simply returned.
 */
export function $id(name) {
    const addHelperMethods = (elm) => {
        elm.$id = _$._id(elm);
        elm.$class = _$._class(elm);
        elm.$style = _$._style(elm);
        elm.$attr = _$._attr(elm);
        elm.$appendCSS = (classname) => _$appendCSS(elm, classname);
        elm.$removeCSS = (classname) => _$removeCSS(elm, classname);
        elm.$hasClass = (classname) => _$hasClass(elm, classname);
        return elm;
    };

    if (typeof name === "string") {
        const elm = document.getElementById(name);
        return elm ? addHelperMethods(elm) : null;
    } else if (name != null && name.setAttributeNode != null) {
        return addHelperMethods(name);
    }

    /* Bail! No clue */
    return null;
}

/**
 * Returns the nodes specified by the class.
 *
 * @function $id
 *
 * @param {Object} parentOrClassname - If parentOrClassname is a string then
 * get the getElementsByClassName from the document.
 *
 * If parentOrClassname is an object, then getElementsByClassName from that
 * object that match classname parameter.
 *
 * @param {string} classname
 *
 * @return {DOMNode} returns the DOM nodes if found, or null it it doesn't exit.
 */
export function $class(parentOrClassname, classname) {
    if (typeof parentOrClassname === "string") {
        return document.getElementsByClassName(parentOrClassname);
    }

    if (parentOrClassname.setAttributeNode != null) {
        /* parentOrClassname is an element */
        return parentOrClassname.getElementsByClassName(classname);
    }

    /* Bail! No clue */
    return null;
}

/**
 * Positions the 'nodeName' node at the bottom of the render tree.
 *
 * @function $moveBelow
 *
 * @param {String} nodeName - The node that will be placed at the bottom
 * @param {String} referenceNodeName - The node that 'nodeName' should be
 *  placed below.
 */
export function $moveBelow(nodeName, referenceNodeName) {
    let node = $id(nodeName);
    let referenceNode = $id(referenceNodeName);

    /* Positions the node at the bottom of the render tree. */
    node.parentElement.insertBefore(node, referenceNode);
}

/**
 * Utility function that converts rgb to hex
 *
 *  rgbToHex(0, 51, 255); // Result: #0033ff
 *
 * Source https://javascript.plainenglish.io/27-essential-one-line-javascript-functions-used-by-developers-daily-2cda9826700e
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @returns {String} hex color value
 */
export const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * Utility function to calculate the hsl based on a base offset.
 * @param {Number} base - hue offset
 * @return {String} hsl value
 */
export function $hsl(base) {
    let h = 220.8 * 0.6 * (1 + base);
    let l = 69.2 * 0.5 * (1 + base);

    return "hsl(" + h + ", 100%, " + l + "%)";
}

let __enableLogging = false;
export function $enableLogging(status) {
    __enableLogging = status;
}

export let _$ = {
    /* name is going to be turned to lowercase. */
    __attr: function (node, name, setterCallback) {
        return function (val) {
            if (
                arguments.length == 0 ||
                typeof val === "undefined" ||
                val == null
            ) {
                /*
         Allows the function to be used as a getter.
         */
                let val = node.getAttribute(name);
                if (val == null) {
                    return null;
                }

                if (`${val}`.endsWith("%")) {
                    return val;
                }

                let number = parseFloat(val);
                if (typeof number === "number" && !isNaN(number)) {
                    return number;
                }
                if (isNaN(number)) {
                    if (__enableLogging) {
                        console.log("Found nan while processing:", name, number, val);
                    }
                    if (__enableLogging) console.trace();
                    return 0;
                }
                return val;
            }

            let att = document.createAttribute(name);
            if (
                setterCallback == null ||
                typeof setterCallback === "undefined"
            ) {
                att.value = val;
            } else {
                att.value = setterCallback(val);
            }
            node.setAttributeNode(att);

            return node;
        };
    },
    /* Specifically for text attributes.
     name is going to be turned to lowercase
   */
    __attrText: function (node, name, setterCallback) {
        return function (val) {
            if (
                arguments.length == 0 ||
                typeof val === "undefined" ||
                val == null
            ) {
                /*
         Allows the function to be used as a getter.
         */
                let val = node.getAttribute(name);
                if (val == null) {
                    return null;
                }

                return val;
            }

            let att = document.createAttribute(name);
            if (
                setterCallback == null ||
                typeof setterCallback === "undefined"
            ) {
                att.value = val;
            } else {
                att.value = setterCallback(val);
            }
            node.setAttributeNode(att);

            return node;
        };
    },

    _id: function (node) {
        return this.__attrText(node, "id");
    },
    _x: function (node) {
        return this.__attr(node, "x");
    },
    _y: function (node, setterCallback) {
        return this.__attr(node, "y");
    },
    _cx: function (node) {
        return this.__attr(node, "cx");
    },
    _cy: function (node, setterCallback) {
        return this.__attr(node, "cy");
    },
    _rx: function (node) {
        return this.__attr(node, "rx");
    },
    _ry: function (node, setterCallback) {
        return this.__attr(node, "ry");
    },
    _style: function (node) {
        return this.__attrText(node, "style");
    },
    _class: function (node) {
        return this.__attrText(node, "class");
    },
    _height: function (node) {
        return this.__attr(node, "height");
    },
    _width: function (node) {
        return this.__attr(node, "width");
    },
    _attr: function (node) {
        return function (attrName, val) {
            if (arguments.length == 1) {
                /** If there is no value being set, try to
                 *  return the current value of the attribute
                 */
                return node.getAttribute(attrName);
            }

            let att = document.createAttribute(attrName);
            att.value = val;
            node.setAttributeNode(att);
            return node;
        };
    },
};

/**
 * Intercepts calls to an attribute/property printing out get/set message
 *
 * @param {Object} node - object created with
 * @param {Function} attrFnc - the attribute/property that is going to be tapped
 * @param {String} attrNameDesc - the name of the attribute
 * @param {[callback]} getterTapCallback - callback of the form (attrNameDesc, node, shadowedAttrName):Any. The callback needs to return the value of the property
 *       @example of a getterTapCallback
 *       (attrNameDesc, node, shadowedAttrName) => {
 *           //Only call the getter once
 *           const result = node[shadowedAttrName]();
 *           console.log(`[get] ${attrNameDesc}:`, result);
 *           return result;
 *       }
 * @param {[callback]} setterTapCallback - callback of the form (attrNameDesc, val)
 *      @example of a setterTapCallback
 *      (attrNameDesc, val) => {
 *           console.log(`[set] ${attrNameDesc}:`, val)
 *      }
 * @return {function} - the replacement attribute/property
 */
export function $tapAttribute(
    node,
    attrFnc,
    attrNameDesc,
    getterTapCallback = null,
    setterTapCallback = null
) {
    const shadowedAttrName = utils.$slug();

    node[shadowedAttrName] = attrFnc;

    return (val) => {
        if (val === undefined) {
            /** I only want to call the getter once */
            if (getterTapCallback) {
                return getterTapCallback(attrNameDesc, node, shadowedAttrName);
            }

            const result = node[shadowedAttrName]();
            console.log(`[get] ${attrNameDesc}:`, result);
            return result;
        }
        if (setterTapCallback) {
            setterTapCallback(attrNameDesc, val);
        } else {
            console.log(`[set] ${attrNameDesc}:`, val);
        }
        /** Set the actual value */
        node[shadowedAttrName](val);
    };
}

/**
 * Creates an node described by the specific tag. If the @parentElm is
 * given, then the node will be appended to the parent.
 *
 * @function node
 *
 * @param {String} namespace - type of node being created.
 *  HTML    -> http://www.w3.org/1999/xhtml
 *  SVG     -> http://www.w3.org/2000/svg
 *  MathML  -> http://www.w3.org/1998/mathml
 *
 * @param {String} tag - tag type that will be created. E.g. rect, path, etc.
 * @param {Object} parentElm - the parent to which the node will be added.
 *
 * @return {Object} The newly created node.
 */
export function $node(namespace, tag, parentElm) {
    let node = document.createElementNS(namespace, tag);

    node.$id = _$._id(node);
    node.$class = _$._class(node);
    node.$style = _$._style(node);
    node.$attr = _$._attr(node);
    node.$text = (text) => {
        node.innerText = text;
        return node;
    };
    node.$parentElm = parentElm;

    node.$appendCSS = (classname) => _$appendCSS(node, classname);
    node.$removeCSS = (classname) => _$removeCSS(node, classname);
    node.$hasClass = (classname) => _$hasClass(node, classname);

    if (utils.$isTruthy(parentElm)) {
        parentElm.appendChild(node);
    } else {
        document.body.appendChild(node);
    }

    return node;
}

/**
 * Creates an html node described by the specific tag. If the @parentElm is
 * given, then the node will be appended to the parent.
 *
 * @function $htmlNode
 *
 * @param {String} tag - svg tag type that will be created. E.g. rect, path, etc.
 * @param {Object} parentElm - the parent to which the node will be added.
 *
 * @return {Object} The newly created node.
 */
export function $htmlNode(tag, parentElm) {
    return $node("http://www.w3.org/1999/xhtml", tag, parentElm);
}

/**
 * Creates an svg node described by the specific tag. If the @parentElm is
 * given, then the node will be appended to the parent.
 *
 * @function $svgNode
 *
 * @param {String} tag - svg tag type that will be created. E.g. rect, path, etc.
 * @param {Object} parentElm - the parent to which the node will be added.
 *
 * @return {Object} The newly created node.
 */
export function $svgNode(tag, parentElm) {
    return $node("http://www.w3.org/2000/svg", tag, parentElm);
}

/**
 * Creates a new html node that can be chained to create nested nodes.
 *
 * @example In this example the divs and img are nested in the li tag
 *     const liElm = $$("li", null, e => {
 *        e.$$("div")
 *            .$$("div")
 *            .$$("div")
 *            .$$("img", e => e.src = imgSource)
 *    });
 *
 * The child nodes that are returned are each extended to have
 *    - $$(tag, functor) where the functor is a callback that is passed the child
 *
 * @function $$
 *
 * @param {String} tag - html tag that we want to add
 * @param {Object} parentElm - the parent node that the new node should be added to
 * @param {Function} parentFunctor - A callback that take the newly created node as a child
 *
 * @return {Object} The newly created html node.
 */
export function $$(tag, parentElm, parentFunctor) {
    const htmlNode = $htmlNode(tag, parentElm);
    const node$$Creator = (parentElm) => {
        parentElm.$$ = (tag, functor) => {
            const childNode = $htmlNode(tag, parentElm);

            node$$Creator(childNode);

            if (functor) {
                functor(childNode);
            }

            return childNode;
        };
    };

    node$$Creator(htmlNode);

    if (parentFunctor) {
        parentFunctor(htmlNode);
    }

    return htmlNode;
}

const emptyOnDataBound = () => { };

const getDataValue = (node) => {
    return node._dataValue;
};
const getRawDataValue = (node) => {
    return node._rawDataValue;
};
const getDataIndex = (node) => {
    return node._dataIndex;
};
const getDataProperty = (node) => {
    return node._dataProperty;
};
const shapeBindData = (node, data) => {
    node._dataValue = data.dataValue;
    node._rawDataValue = data.rawDataValue;
    node._dataIndex = data.dataIndex;
    node._dataProperty = data.target;
    node.onDataBound(data);
};

/**
 * @function addShape
 *
 * @param {String} parentId - is the id or actual object of parent. The method
 *  fails if the parent can't be found.
 *
 * @param {String} id - is the ID of the SVG element being added.
 * @param {String} shape - the type of SVG element to create. E.g. rect, path, etc.
 *
 * @return {Object} The newly created SVG child shape.
 */
export function addShapeNode(parentId, id, shape) {
    let parentElm = $id(parentId);

    if (!utils.$isTruthy(parentElm)) {
        // console.log("parentId>>", parentId)
        throw new Error(
            `[addShape] Can't find element parent with id: "${parentId}"`
        );
    }

    let node = $svgNode(shape, parentElm);

    if (utils.$isTruthy(id)) {
        node.$attr("id", id);
    }

    node.bindData = (data) => shapeBindData(node, data);
    // This should be overridden to provide specific post data-binding behaviour
    node.onDataBound = emptyOnDataBound;

    node.$onData = (callback) => {
        node.onDataBound = callback;

        return node;
    };

    node.getDataValue = () => getDataValue(node);
    node.getRawDataValue = () => getRawDataValue(node);
    node.getDataIndex = () => getDataIndex(node);
    node.getDataProperty = () => getDataProperty(node);

    return node;
}

export function addEmptyShape(parentId) {
    let parentElm = $id(parentId);

    let node = {
        attributes: [],
        childNodes: [],
        $parentElm: parentElm,
    };

    node.getAttribute = (name) => {
        return node.attributes[name];
    };
    node.setAttributeNode = (attr) => {
        node.attributes[attr.name] = attr.value;
    };

    node.appendChild = (child) => {
        node.childNodes.push(child);
    };

    node.bindData = (data) => shapeBindData(node, data);
    // This should be overridden to provide specific post data-binding behaviour
    node.onDataBound = emptyOnDataBound;

    node.getDataValue = () => getDataValue(node);
    node.getRawDataValue = () => getRawDataValue(node);
    node.getDataIndex = () => getDataIndex(node);
    node.getDataProperty = () => getDataProperty(node);

    return node;
}