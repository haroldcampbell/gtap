export function cloneShapeProperties(existingModel, visuals, callback) {
    if (existingModel != null) {
        return existingModel;
    }

    existingModel = [];

    for (let v of visuals.shapeNodes) {
        const state = callback(v);
        existingModel.push(state);
    }

    return existingModel;
}