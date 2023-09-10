export function $arcEquiSpan(data) {
    return {
        name: "arcEquiSpan",
        getData: () => data,

        action(visuals, getDataStep = this.getData) {
            const span = getDataStep() / visuals.shapeNodes.length;

            let prevStartAngle = 0;
            for (let v of visuals.shapeNodes) {
                v.$arcSpan(span);
                v.$startAngle(prevStartAngle);
                v.__renderPath();
                prevStartAngle = prevStartAngle + span;
            }
        }
    }
}