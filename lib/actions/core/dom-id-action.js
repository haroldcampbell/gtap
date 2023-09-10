/**
 * Sets the domId value of the visuals
 * @function $domId
 * @param {Array} data - list of ids to be set on each shape
 * @return {Object} Intent meta-data
 */
export function $domId(data) {
    return {
        name: "domId",
        data,
        noAnimate: true,

        action(visuals) {
            if (!(data instanceof Array)) {
                console.error("data should be an Array");
                return
            }

            if (visuals.shapeNodes.length > data.length) {
                console.error("shapeNodes.length > data.length", visuals.shapeNodes.length, data.length);
               return
            }

            if (visuals.shapeNodes[0].$id) {
                visuals.shapeNodes.forEach((v, index) => v.$id(data[index]));
            } else {
                visuals.shapeNodes.forEach((v, index) => v.$attr("id", data[index]));
            }
        }
    };
}