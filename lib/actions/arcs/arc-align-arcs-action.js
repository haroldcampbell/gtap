/**
 * Aligns the arc based on the largest arc.
 *
 * @function $arcAlignArcs
 *
 * @param {Number} data - describes the alignment type.
 * -1 : Left algin (does the same as the $arcStartAngle(x))
 * 0 :  Center align
 * 1 : Right align
 *
 * @return {Object}
 */
export function $arcAlignArcs(data = 0) {
    return {
        name: "arcAlignArcs",
        noAnimate: true,
        data,
        action(visuals) {
            const maxArcSpan = visuals.shapeNodes
                .map(node => node.$arcSpan())
                .reduce((prev, curr) => {
                    return curr > prev ? curr : prev
                }, 0);

            switch (data) {
                case -1:
                    this.alignLeft(visuals);
                    break;
                case 0:
                    this.alignCenter(visuals, maxArcSpan);
                    break;
                case 1:
                    this.alignRight(visuals, maxArcSpan);
                    break;
            }
        },
        alignLeft(visuals) {
            const maxArcStartAngle = visuals.shapeNodes
                .map(node => node.$startAngle())
                .reduce((prev, curr) => {
                    return curr > prev ? curr : prev
                }, 0);

            for (let v of visuals.shapeNodes) {
                v.$startAngle(maxArcStartAngle)
                v.__renderPath();
            }
        },
        alignCenter(visuals, maxArcSpan) {
            for (let v of visuals.shapeNodes) {
                const offset = (maxArcSpan - v.$arcSpan()) / 2.0;
                const newStartAngle = v.$startAngle() + offset;
                v.$startAngle(newStartAngle)
                v.__renderPath();
            }
        },
        alignRight(visuals, maxArcSpan) {
            for (let v of visuals.shapeNodes) {
                const offset = maxArcSpan - v.$arcSpan();
                const newStartAngle = v.$startAngle() + offset;
                v.$startAngle(newStartAngle)
                v.__renderPath();
            }
        },
    }
}