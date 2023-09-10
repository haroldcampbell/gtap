/**
    An extension Action lambda that is called on each visual.

    @function $lambda
    @param {Function} callback - Callback is of the form:
        function(shapeNode, shapeNodeIndex, thisAction)

      This allows developers to supply their own  custom actions.
      The lambda is called internally like this: fn(v, index, this);

      EXAMPLE:
      let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];
      _a.container(viewId, _ => {
        _.bars(_a.$data([21, 11, 5, 7], "y"), [
            _a.$y(100), _a.$height(50), _a.$maxWidth(40), _a.$maxX(40), _a.$xOffset(1),
            _a.$lambda((v, i, action) => {
              v.$style(`fill: ${action.data.colors[i]}`)
            }, {colors: colorsData})
          ]);
      }, _a.$id(chartId));

    @param {Object} data - this will be passed to the callback lambda.

    @return {Object}
*/
export function $lambda(callback, data=null) {
  return {
    name: "lambda",
    data: data,
    noAnimate: true,

    action(visuals) {
      visuals.shapeNodes.forEach((v, index) => {
        callback(v, index, this);
      })
    } // action
  } // return
}