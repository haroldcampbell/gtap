export function $passThrough(callback, data=null) {
    return {
      name: "passThrough",
      data: data,
      noAnimate: true,

      action(visuals) {
          callback(visuals, data);
      } // action
    } // return
  }