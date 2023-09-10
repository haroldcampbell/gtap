/**
  An Arc Intents lambda. THis allows developers to supply their own arcIntents.

  @function $arcIntentFn
  @param {Object} data - this will be passed to the callback lambda.
  @param {Function} callback - Lambda that accepts the intent itself - @{this},
  and the array of visuals - @{visuals.shapeNodes}.

  @return {Object}

  Developers will need to:
    1.  Iterate over the array of visuals in the visuals.shapeNodes array,
    2.  Apply their own custom intent logic to each visual,
    3.  Then either use the internal:
        A. __calcArcRenderData and their own custom render method, or
        B. __renderPath method which will render the path

    This lambda is called internally like this: callback(this, visuals.shapeNodes)
*/
export function $arcIntentFn(data, callback) {
    return {
      name: "arcIntentFn",
      data,
      noAnimate: true,

      action(visuals) {
        callback(this, visuals.shapeNodes);
      } // action
    } // return
  }