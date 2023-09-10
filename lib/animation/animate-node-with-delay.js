
import {
    createVisual,
    applyVisualActions,
} from "../visuals/create-visual"

export function $animateNodeWithDelay(node, delay, animationContextArray, postActions) {
    const visual = createVisual();

    if (node.$parentElm) {
        visual.setContainer(node.$parentElm);
    }
    visual.withActions(animationContextArray);
    visual.withPostActions(postActions);
    visual.addSVGShapeNode(node);

    setTimeout(()=> {
        applyVisualActions(visual)
    }, delay * 1000);
}