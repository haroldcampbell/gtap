import {
    easingFunctions
} from './easing-functions'

function generateAnimation(visual, animationContext, easingFunction) {
    const context = {
        from: animationContext.from,
        position: 0,
        duration: animationContext.duration, // seconds
        targetData: animationContext.action.getData(),
        updateStep: null,
        getDataStep: null,
    }

    const fps = 60.0;
    const timeSlice = 1000.0 / fps;
    const frames = context.duration * 1000.0 / timeSlice;
    const dx = 1.0 / frames;

    let x = 0;
    let handler = null;

    context.getDataStep = () => context.position
    context.updateStep = () => {
        animationContext.action.action(visual, context.getDataStep);
    }

    const target = context.targetData - context.from;
    context.getNextPosition = () => {
        x += dx;
        const val = easingFunction(x);

        // return context.from + val * context.targetData;
        return context.from + val * target;
    }

    const callback = function () {
        // x += dx;
        // const val = easingFunction(x);
        context.position = context.getNextPosition();
        context.updateStep();

        // Depending on if targetData positive or negative, the done condition differs
        // const isDone = context.targetData > 0 ? context.position >= context.targetData : context.targetData >= context.position;
        const isDone = context.targetData == context.position;
        if (isDone) {
            clearInterval(handler);
        }
    }

    handler = setInterval(callback, timeSlice);
}

/**
 * Returns a new animation context for the specified action.
 *
 * @param {Number} duration - duration of the animation in seconds
 * @param {String} type - ease-in | ease-out | ease-in-out | linear.
 *                        See easing-functions.js for the full list.
 * @param {Object} action - the action that will be updated (e.g. $x(10))
 * @param {Number} from - the starting data value
 *
 * @return {Object} - returns the newly created context
 */
export function $animate(duration, type, action, from = 0) {
    return {
        isAnimationContext: true,
        duration,
        type,
        action,
        from
    }
}

export function triggerAnimation(visual, animationContext) {
    if (animationContext.action.noAnimate) {
        return
    }

    const easingFunction = easingFunctions[animationContext.type];

    if (easingFunction == null) {
        Console.log("[Error] Unknown animation in triggerAnimation: ", animationContext)
        noAnimation(visual, animationContext);

        return
    }

    generateAnimation(visual, animationContext, easingFunction);
}