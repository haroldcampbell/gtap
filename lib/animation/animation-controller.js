import {
    $isTruthy
} from '../utils'

import {
    applyVisualActions,
} from '../visuals/create-visual'


export function animationController() {
    const controllerContext = {
        run: null,
        __onCompleteCallback: null,
        onAnimationComplete: null,
    }

    controllerContext.run = (visuals) => __run(visuals, controllerContext);
    controllerContext.onAnimationComplete = (callback) => controllerContext.__onCompleteCallback = callback;

    return controllerContext;
}

function __run(visuals, controllerContext) {
    visuals.forEach((visualContext) => {
        applyVisualActions(visualContext.visual);
    });

    __raiseAnimationCompletedEvent(controllerContext);
}

function __raiseAnimationCompletedEvent(controllerContext) {
    if ($isTruthy(controllerContext.__onCompleteCallback)) {
        controllerContext.__onCompleteCallback();
    }
}