import * as utils from './utils'
import {
    $id,
    $node,
} from "./gtap-dom"

/**
 * Creates an html node along with nested children.
 *
 * This function can be used to consume the babel React jsx files.
 *
 * @example
 *
 *  The following code below...
 *
 *   const profile = (
 *     <div>
 *       <img src="/assets/images/remix/avatars/eric.jpeg" className="profile" />
 *       <h3>{[user.firstName, user.lastName].join(' ')}</h3>
 *     </div>
 *   );
 *
 *   gets converted to the code below
 *
 *   var profile = $jsx("div", null,
 *         $jsx("img", {
 *             src: "avatar.png",
 *             className: "profile"
 *         }),
 *         $jsx("h3", null, [user.firstName, user.lastName].join(' '))
 *    );
 *
 * -> @jsx $jsx must be added before though.
 * See here: https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
 *
 * @function $jsx
 *
 * @param {String} tag - is the type of html node we will create
 * @param {*} properties - are the properties that will be set on the node supplied a json object
 * @param  {...any} children - to be added to the node
 *
 * @return {Object} The newly created node.
 */
export function $jsx(tag, properties, ...children) {
    const node = $node("http://www.w3.org/1999/xhtml", tag, null);

    if (utils.$isTruthy(properties)) {
        processNodeProperty(node, properties);
    }

    if (utils.$isTruthy(children)) {
        children.forEach(child => processChildNode(node, child));
    }

    return node;
}

function processNodeProperty(node, properties) {
    for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
            const value = properties[key];

            if (key == "className") {
                node.$appendCSS(value);
            } else if (key.startsWith("data-")) {
                node.setAttribute(key, value);
            } else {
                node[key] = value;
            }
        }
    }
}

function processChildNode(node, child) {
    if (!utils.$isTruthy(child)) {
        return;
    }

    if (child instanceof Node) {
        $id(node).appendChild(child);
    } else if (child instanceof Array) {
        child.forEach(nested => {
            $id(node).appendChild(nested);
        })
    } else {
        switch (typeof child) {
            case "string":
            case "number":
                node.innerText = child;
                break;
            default:
                console.log("$jsx error. Unknown child type:", typeof child, child, node);
                throw new Error("panic-I-don't know this child")
        }
    }
}