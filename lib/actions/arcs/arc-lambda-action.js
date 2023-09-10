/**
  An extension Intent arcLambda that is called on each visual, before the renderPath is
  done.

  @function $arcLambda
  @param {Object} data - this will be passed to the callback lambda.
  @param {Function} callback - Callback function should accept three arguments:
    * The first, the intent itself -  @{this},
    * the current visual - @{v}.
    * the index of the current visual in the visuals.shapeNodes - @{index},

    This allows developers to supply their own arcIntents, without the need to
    call the __renderPath.

    The lambda is called internally like this: fn(this, v, index);

  @return {Object}
*/
export function $arcLambda(data, callback) {
    return {
      name: "arcLambda",
      data,
      noAnimate: true,

      action(visuals) {
        visuals.shapeNodes.forEach((v, index) => {
          callback(this, v, index);
          v.__renderPath();
        })
      } // action
    } // return
  }
