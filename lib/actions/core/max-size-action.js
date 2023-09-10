import {
    $isTruthy
} from '../../utils'

/**
 * Scale both the width and height based on the value of the largest item. This intent can
 * *ONLY* be applied to data has a width and height attributes. See the example below.
 *
 * @function $maxSize
 *
 * @param {Number} width - the maximum width to which visuals will be scaled
 * @param {Number} height - the maximum height to which visuals will be scaled
 * @return {Object} Intent meta-data
 * @example
 *   var barsData = $data([50, 20, 30, 10, 50]);
 *   renderVisuals(context, [
 *     $bars(barsData, [$maxSize(50, 50), $x(50), $yOffset(30)])
 *   })
 */
export function $maxSize(width, height) {
    return {
        name: "maxSize",
        noAnimate: true,

        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                if (v._dataValue === null) {
                    return;
                }

                if ($isTruthy(v._dataValue.map)) {
                    let w = v._dataValue.map(item => item * width);
                    let h = v._dataValue.map(item => item * height);

                    v.$width(w);
                    v.$height(h);
                    return
                }

                let w = v._dataValue * width;
                let h = v._dataValue * height;
                v.$width(w);
                v.$height(h);
            })
        }
    };
}