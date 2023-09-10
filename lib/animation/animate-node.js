
import {
    createVisual,
    applyVisualActions,
} from "../visuals/create-visual"

export function $animateNode(node, animationContextArray, postActions) {
    const visual = createVisual();

    if (node.$parentElm) {
        visual.setContainer(node.$parentElm);
    }
    visual.withActions(animationContextArray);
    visual.withPostActions(postActions);
    visual.addSVGShapeNode(node);

    applyVisualActions(visual)
}