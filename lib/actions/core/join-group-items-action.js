/**
 * @function $joinGroupItems
 * @param {Array} groupsArray - An array with the id of the groups that contains
 * the elements that visuals that should be connected.
 * @param {bool} isSmooth - True if line should be curved.
 * @return {Object} Intent meta-data
 */
export function $joinGroupItems(groupsArray, isSmooth = true) {
    return {
      name: "joinGroupItems",
      data: groupsArray,
      noAnimate: true,

      action(visuals) {
        if (visuals.shapeNodes.length == 0 || groupsArray.length != 2) {
          return;
        }

        let parent = visuals.shapeNodes[0].parentElement
        let g1 = parent.querySelector("#" + groupsArray[0])
        let g2 = parent.querySelector("#" + groupsArray[1])

        /* Make a guess that the first group has more childNode */
        let [fistGroup, secondGroup] = [g1.childNodes, g2.childNodes];
        if (g1.childNodes.length < g2.childNodes.length) {
          fistGroup = g2.childNodes;
          secondGroup = g1.childNodes;
        }

        let linePairs = [];
        for (let v1 of fistGroup) {
          for (let v2 of secondGroup) {
            linePairs.push({
              p1: {
                x: v1.$x(),
                y: v1.$y()
              },
              p2: {
                x: v2.$x(),
                y: v2.$y()
              }
            });
          }
        }

        if (visuals.shapeNodes.length > linePairs.length) {
          throw new Error("$joinGroupItems: There are more visuals(" + visuals.shapeNodes.length + ") than linePairs(" + linePairs.length + ")")
        }


        for (let index = 0; index < visuals.shapeNodes.length; index++) {
          let v = visuals.shapeNodes[index];
          let {
            p1,
            p2
          } = linePairs[index];
          v.$path(p1, p2, isSmooth);
        }
      }
    }
  }