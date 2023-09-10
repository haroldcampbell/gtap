import {
  cloneShapeProperties
} from '../utils'
/**
 * Offset an element along the center-most radial line relative to the max data point
 *
 * @function $maxRadialOffset
 *
 * @param {*} data
 * @param {Integer} indexOfItemToOffset - If null, all points are radially offset.
 * Otherwise, only radially offset the point at the specific index
 *
 * @return {Object}
 */
export function $maxRadialOffset(data, indexOfItemToOffset = null) {
  return {
    name: "radialOffset",
    getData: () => data,
    model: null,

    action(visuals, getDataStep = this.getData) {
      this.model = cloneShapeProperties(this.model, visuals, v => {
        return {
          x: v.$x(),
          y: v.$y(),
          startAngle: v.$startAngle(),
        }
      });

      visuals.shapeNodes.forEach((v, index) => {
        if ((indexOfItemToOffset == null) || (index == indexOfItemToOffset)) {
          const m = this.model[index];
          v.$x(m.x);
          v.$y(m.y);
          v.$startAngle(m.startAngle);

          const radialCenter = v.$radialCenter(m.x, m.y, v._dataValue * getDataStep(), m.startAngle);

          v.$x(radialCenter.x);
          v.$y(radialCenter.y);

          v.__renderPath();
        }
      });
    }
  }
}