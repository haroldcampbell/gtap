import {
    $tapAttribute,
} from '../../gtap-dom'

/**
 * Intercepts calls to the attribute. Prints a get/set message and the value each time the attribute is read/changed.
 *
 * @function $tapAttr
 * @param {String} attrName - the name of the attribute to tap
 * @param {[String]} attributeDesc - a description of the attribute
 * @param {[callback]} getterCallback - callback of the form (attrNameDesc, node, shadowedAttrName):Any. The callback needs to return the value of the property
 *
 *       @example of a getterCallback
 *       (attrNameDesc, node, shadowedAttrName) => {
 *           //Only call the getter once
 *           const result = node[shadowedAttrName]();
 *           console.log(`[get] ${attrNameDesc}:`, result);
 *           return result;
 *       }
 *
 * @param {[callback]} setterCallback - callback of the form (attrNameDesc, val)
 *
 *      @example of a setterCallback
 *      (attrNameDesc, val) => {
 *           console.log(`[set] ${attrNameDesc}:`, val)
 *      }
 * @return {Object} Intent meta-data
 */
export function $tapAttr(attrName, attributeDesc = null, getterCallback = null, setterCallback = null) {
    return {
        name: "tapAttr",
        noAnimate: true,

        action(visuals) {
            let getterTapCallback = getterCallback || ((attrNameDesc, node, shadowedAttrName) => {
                /** I only want to call the getter once */
                const result = node[shadowedAttrName]();
                console.log(`[get] ${attrNameDesc}:`, result);
                return result;
            });

            let setterTapCallback = setterCallback || ((attrNameDesc, val) => {
                console.log(`[set] ${attrNameDesc}:`, val)
            });

            visuals.shapeNodes.forEach(v => {
                const currAttr = v[attrName];
                v[attrName] = $tapAttribute(v, currAttr, (attributeDesc || attrName), getterTapCallback, setterTapCallback)
            });
        }
    };
}