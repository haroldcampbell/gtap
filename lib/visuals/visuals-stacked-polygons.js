import {
    $polygon
} from './visuals-polygon'

/**
 * Creates one of more polygons that may be stacked or layered.
 *
 * @method $stackedPolygons
 *
 * @param {Array} arrayOfData - This can be either an array of $data e.g [$data(), $data(), ..., $data()]
 * @param {Array | Callback} actionsCallback - array of actions or a callback that returns a list of actions.actionsCallback
 *          If a callback is supplied it must be of the form Callback(index:Number) => Array
 *
 * @param {Object | Callback } optionsCallback - the options used to configure the polygons or a callback that will be used.
 *          If a callback is supplied it must be of the form Callback(index:Number) => Object
 *          The polygon config options object is the same used to configure the regular $polygon(...) visual.
 *
 *  @return {Array} Array of $polygon visuals
 */
export function $stackedPolygons(arrayOfData, actionsCallback = (index) => {}, optionsCallback = (index) => {}) {
    return arrayOfData.map((data, index) => {
        const actionsArray = typeof actionsCallback === "function" ? actionsCallback(index) : actionsCallback;
        const options = typeof optionsCallback === "function" ? optionsCallback(index) : optionsCallback;

        return $polygon(data, actionsArray, options)
    })
}