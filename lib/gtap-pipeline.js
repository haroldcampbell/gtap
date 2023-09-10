import {
    $isTruthy
} from './utils'

import {
    _$,
    $id,
    $svgNode,
} from './gtap-dom'

import {
    prepareVisuals,
    createVisualContext,
} from './visuals/create-visual'

import {
    animationController,
} from './animation/.gtap-animation'

function cloneContainerContext(context, visuals = []) {
    // TODO: This cloning is not pure. The nested objects will still
    // reference the objects in the old context
    return {
        visuals: visuals,
        domContainer: context.domContainer,
        animationController: context.animationController,
        __renderCompletedCallback: context.__renderCompletedCallback,
    }
}

function createVisualContexts(containerContext, visuals) {

    if (typeof visuals !== "object" && visuals.forEach === undefined) {
        console.log("[createVisualContexts] Can't create visuals. Expected visuals (param 2) to be an array of visuals.")
        return
    }
    const newContainerContext = cloneContainerContext(containerContext);

    visuals.forEach(visual => {
        newContainerContext.visuals.push(
            createVisualContext(newContainerContext, visual)
        );
    });

    return newContainerContext;
}

function animateVisuals(containerContext) {
    containerContext.animationController.onAnimationComplete(() => {
        __raiseRenderCompletedEvent(containerContext);
    });

    containerContext.animationController.run(containerContext.visuals);
}

/**
 * Raises the renderCompleted callback.
 *
 * This method will be called after the renderVisual method
 *
 * @function __raiseRenderCompletedEvent
 *
 * @param {Object} containerContext
 * @param {callback} callback
 */
function __raiseRenderCompletedEvent(containerContext) {
    if ($isTruthy(containerContext.__renderCompletedCallback)) {
        const callback = containerContext.__renderCompletedCallback;

        // The new context will have a different completedCallback to prevent race-conditions
        const newContext = cloneContainerContext(containerContext);
        newContext.__renderCompletedCallback = null;

        // Kill the callback so that things like mouseover events don't trigger a new event.
        containerContext.__renderCompletedCallback = null;

        callback(newContext);
    }
}

/**
 * Creates a container that contains the visuals defined in the block.
 *
 * @function container
 *
 * @param {string} id - The id of the container.
 * @param {Node} parentElm -
 * @param {String} style - is the optional CSS style
 *
 * @return {Object}
 */
export function container(id, parentElm, style = "") {
    if (parentElm != null && typeof parentElm == "string") {
        throw new Error("container(id, parentElm) expected an object for the 'parentElm'");
    }
    const domContainer = $svgNode("svg", parentElm);

    domContainer.$attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

    domContainer.$id(id);
    domContainer.containerName = `context[${id}]`
    domContainer.$height = _$._height(domContainer);
    domContainer.$width = _$._width(domContainer);
    domContainer.$style(style);

    const containerContext = {
        visuals: [],
        domContainer: domContainer,
        animationController: animationController(),
        __renderCompletedCallback: null,
        getContainer: () => domContainer,

        $parentElm: $id(parentElm),
    }

    return containerContext;
}

/**
 * Internal function used to actually render all of the visuals that were added.
 *
 * @function renderVisuals
 *
 * @param {Object} containerContext
 * @param {Array} visuals
 *
 * @return {Object} the newly cloned containerContext
 */
export function renderVisuals(containerContext, visuals) {
    const newContainerContext = createVisualContexts(containerContext, visuals);

    prepareVisuals(newContainerContext);
    animateVisuals(newContainerContext);

    return newContainerContext
}

export function onRenderCompleted(containerContext, callback) {
    const newContainerContext = cloneContainerContext(containerContext);

    newContainerContext.__renderCompletedCallback = callback;

    return newContainerContext;
};