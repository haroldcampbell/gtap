import {
    $isTruthy,
} from '../utils'

import {
    triggerAnimation
} from '../animation/animation-core'

function cloneVisual(visual) {
    const newVisual = createVisual();

    newVisual.__createSVGShapeCallback = visual.__createSVGShapeCallback
    newVisual.withData(visual.getData());
    newVisual.withActions(visual.getActions());
    newVisual.withPostActions(visual.getPostActions());
    newVisual.setContainer(visual.getContainer());

    return newVisual;
}

function getData(visual) {
    return visual.__data;
}

function getDataTarget(visual) {
    if (visual.__data == null) {
        return null;
    }
    return visual.__data.target
}

function getActions(visual) {
    return visual.__actions;
}

function getPostActions(visual) {
    return visual.__postActions;
}

function getContainer(visual) {
    return visual.container;
}

function setContainer(visual, newContainer) {
    visual.container = newContainer;

    if ($isTruthy(visual.onSetContainer)) {
        visual.onSetContainer(newContainer);
    }
}

function withSetContainerCallback(visual, callback) {
    visual.onSetContainer = callback

    return visual;
}

function withData(visual, newData) {
    /* TODO: Add test to check that the event handlers are wired */
    visual.__data = newData;
    if ($isTruthy(visual.__data)) {
        visual.__data.withDataChangedCallback(() => visual.onDataDidChange());
    }

    return visual;
}

function onDataDidChange(visual) {
    visual.removeExistingShapes();
    visual.createShapes();
    visual.applyActions();
}

/**
 * The callback that will be used to create the actual shape.
 * The function will be called as callback(container)
 *
 * @param {Object} visual - the visual object
 * @param {Function} callback - used to create the actual shape node. The function
 *  will be called as callback(container)
 *
 * @return {Object} the visual
 */
function withSVGShapeCreator(visual, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Invalid callback parameter.' +
            'The callback must be of the form callback(container)')
    }

    visual.__createSVGShapeCallback = callback;

    return visual;
}


/**
 * Sets the callback that will be used to control how rendering happens
 * for a particular visuals
 *
 * @param {Object} visual - the visual object
 * @param {Function} callback - the render. Typically this will be something
 * that has a functionality similar to __defaultMultipleShapesCreator
 *
 * @return {Object} the newly created visual
 */
function withCreateShapesCallback(visual, callback) {
    visual.__createShapesCallback = callback;

    return visual;
}

/**
 * Sets the main action queue
 *
 * @param {Object} visual
 * @param {Array} newActions

 * @return {Object} the newly created visual
 */
function withActions(visual, newActions) {
    visual.__actions = newActions;

    return visual;
}

/**
 * Sets the post action queue
 *
 * @param {Object} visual
 * @param {Array} newActions

 * @return {Object} the newly created visual
 */
function withPostActions(visual, newActions) {
    visual.__postActions = newActions;

    return visual;
}

/**
 * Adds additional actions to the main action queue without replacing the existing ones.
 *
 * @param {Object} visual - the visual object
 * @param {Array} newActions
 *
 * @return {Object} the newly created visual
 */
function addActions(visual, newActions) {
    if (visual.__actions === undefined || visual.__actions === null) {
        return visual;
    }

    visual.__actions = [...visual.__actions, ...newActions];

    return visual;
}

export function actionsRunner(visual, shapeNodes, preferredActions, actions) {
    const clonedVisual = cloneVisual(visual);

    clonedVisual.shapeNodes = shapeNodes;

    if (clonedVisual.shapeNodes.length == 0 || preferredActions == null) {
        return;
    }

    if (actions === undefined || actions === null) {
        actions = preferredActions;
    }

    for (let action of actions) {
        if (action.isAnimationContext && (action.noAnimate === null || !action.noAnimate)) {
            triggerAnimation(clonedVisual, action)
        } else {
            try {
                action.action(clonedVisual, () => action.getData());
            } catch (error) {
                console.log(`[actionsRunner] failed:`, error, "\n",
                    "\n\t[actionsRunner] >> action:", action,
                     "\n\t[actionsRunner] >> visual:", visual,
                      "\n\t[actionsRunner] >> preferredActions:", preferredActions,
                       "\n\t[actionsRunner] >> actions:", actions)
            }
        }
    }
}


/**
 * Triggers the actions in the main action queue.
 *
 * @param {Object} visual - the visual object
 * @param {Array} actions
 */
function applyActions(visual, actions) {
    try {
        actionsRunner(visual, visual.shapeNodes, visual.__actions, actions);
    } catch (error) {
        console.log("applyActions failed:", error)
    }
}

/**
 * Triggers actions after actions in the main action queue.
 * This method runs after applyActions(...) and the onFinalizeRender() callback.
 *
 * @param {Object} visual - the visual object
 * @param {Array} actions
 */
export function applyPostActions(visual, actions) {
    actionsRunner(visual, visual.shapeNodes, visual.__postActions, actions);
}

function __saveSVGShape(visual, svgShape) {
    visual.shapeNodes.push(svgShape);
}

function __saveSVGShapeData(visual, svgShape, dataIndex, dataValue, rawDataValue) {
    svgShape.bindData({
        dataValue,
        rawDataValue,
        dataIndex,
        target: visual.getDataTarget()
    });
}

function __defaultMultipleShapesCreator(visual) {
    const data = visual.getData();

    data.activeDataItems().forEach((d, index) => {
        const rawDataItem = data.rawDataItem(index);
        let svgShape = visual.__createSVGShapeCallback(visual.container);

        visual.__saveSVGShape(svgShape);
        visual.__saveSVGShapeData(svgShape, index, d, rawDataItem);
    });
}

function __defaultSingleShapeCreator(visual) {
    let svgShape = visual.__createSVGShapeCallback(visual.container);
    visual.__saveSVGShape(svgShape);
}

function createShapes(visual) {
    visual.shapeNodes = [];
    visual.__createShapesCallback(visual);
}

function removeExistingShapes(visual) {
    visual.shapeNodes.forEach(shape => {
        shape.remove();
    });
}

export function createVisualContext(containerContext, visual) {
    return {
        visual: visual,
        context: containerContext,
    }
}

export function createVisual() {
    const visual = {
        container: null,
        __totalVisualsCreated: 0,
        __data: null,

        __actions: null,
        __postActions: null,

        /* Used to store the shapes that are created */
        shapeNodes: [],
        /* The callback must be of the form callback(container) */
        __createSVGShapeCallback: null,
        /* Callback that is used determine how shapes are create */
        __createShapesCallback: null,

        /* Called once all of the visuals shapes are created and
        after the intents are applied */
        onFinalizeRender: null,
    };

    visual.getContainer = () => getContainer(visual);
    visual.setContainer = newContainer => setContainer(visual, newContainer);
    visual.withSetContainerCallback = callback => withSetContainerCallback(visual, callback);
    visual.getData = () => getData(visual);
    visual.getDataTarget = () => getDataTarget(visual);
    visual.withData = newData => withData(visual, newData);
    visual.onDataDidChange = () => onDataDidChange(visual);

    visual.withSVGShapeCreator = callback => withSVGShapeCreator(visual, callback);
    visual.withCreateShapesCallback = (callback) => withCreateShapesCallback(visual, callback);
    visual.addSVGShapeNode = svgShape => __saveSVGShape(visual, svgShape); // Add shape nodes that were created externally
    visual.__saveSVGShape = svgShape => __saveSVGShape(visual, svgShape);
    visual.__saveSVGShapeData = (svgShape, dataIndex, dataValue, rawDataValue) => __saveSVGShapeData(visual, svgShape, dataIndex, dataValue, rawDataValue);

    visual.getActions = () => getActions(visual);
    visual.getPostActions = () => getPostActions(visual);
    visual.withActions = newActions => withActions(visual, newActions);
    visual.withPostActions = newActions => withPostActions(visual, newActions);

    visual.applyActions = actions => applyActions(visual, actions);
    visual.applyPostActions = actions => applyPostActions(visual, actions);
    visual.addActions = actions => addActions(visual, actions);

    visual.createShapes = () => createShapes(visual);
    visual.removeExistingShapes = () => removeExistingShapes(visual);

    visual.__defaultMultipleShapesCreator = () => __defaultMultipleShapesCreator(visual);
    visual.__defaultSingleShapeCreator = () => __defaultSingleShapeCreator(visual);

    visual.withCreateShapesCallback(visual.__defaultMultipleShapesCreator);
    visual.cloneVisual = () => cloneVisual(visual);

    visual.onSetContainer = null;
    visual.onFinalizeRender = null;

    return visual;
};

export function prepareVisual(visual, domContainer) {
    visual.setContainer(domContainer);
    visual.createShapes();
}

export function prepareVisuals(containerContext) {
    containerContext.visuals.forEach(visualContext => {
        prepareVisual(visualContext.visual, containerContext.domContainer)
    });
}

export function applyVisualActions(visual) {
    visual.applyActions();

    if ($isTruthy(visual.onFinalizeRender)) {
        visual.onFinalizeRender()
    }

    visual.applyPostActions();
}