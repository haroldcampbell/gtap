import {
    $id
} from '../../gtap-dom'

import {
    arc,
    textAlongPath
} from '../../nodes/gtap-nodes'
/**
 * Wraps the text if it pass the specified width
 *
 * @function $wrapText
 * @param {function} [wrapperCallback] - the length of the text that trigger wrapping
 * @return {Object} Intent meta-data
 */
export function $wrapTextAlongPath(wrapperCallback = defaultArcWrapperCallback) {
    return {
        name: "wrapTextAlongPath",
        wrapperCallback,

        action(visuals) {
            visuals.shapeNodes.forEach(v => {
                const configOptions = getConfigOptions(v);

                /* This is the call to actually make new lines of text */
                createNewLinesOText(configOptions, wrapperCallback)
            });
        }
    };
}

function getConfigOptions(v) {
    const parentPath = $id(v.$pathRefId());

    return {
        parentNode: v,
        pathRefId: v.$pathRefId(),
        /* Convert the text into an array of characters */
        totalCharacters: v.$text().split(""),
        parentPath: parentPath,
        lineHeight: Math.round(v.getBBox().height),
        pathProperties: parentPath.$properties(),
        /* Check if parentPath.getTotalLength is supported when trying to get the target width */
        targetWidth: getTargetWidth(parentPath, v)
    }
}

function createNewLinesOText(configOptions, characterFillerCallback) {
    let tries = 100; // Sanity check to ensure we'll always exit the loop
    let pathIndex = 0;
    let remainingCharacters = [...configOptions.totalCharacters];

    do {
        const usedCharacters = characterFillerCallback(configOptions, remainingCharacters, pathIndex++)
        remainingCharacters = remainingCharacters.slice(usedCharacters.length)
    } while (remainingCharacters.length != 0 && tries-- > 0)
}

function defaultArcWrapperCallback(configOptions, remainingCharacters, pathIndex) {
    const newProperties = Object.assign({}, configOptions.pathProperties)
    /* If it's the first index, then set the existing node, otherwise create a new node */
    const pathNode = pathIndex == 0 ? configOptions.parentPath : createSubpath(configOptions.parentNode, configOptions.pathRefId, pathIndex)

    newProperties.radius = newProperties.radius + 4 - pathIndex * configOptions.lineHeight;
    pathNode.$properties(newProperties)

    const shadowText = pathIndex == 0 ? configOptions.parentNode : createSubtextNode(configOptions.parentNode, pathNode.$id());
    const usedCharacters = fillTextAlongPathTillLength(remainingCharacters, shadowText, configOptions.targetWidth);

    return usedCharacters;
}

function createSubpath(parentNode, pathRefId, pathIndex) {
    const pathNode = arc(parentNode);
    const subRefId = `${pathRefId}-${pathIndex}`;
    pathNode.$id(subRefId)

    return pathNode
}

function createSubtextNode(parentNode, subRefId) {
    const shadowText = textAlongPath(parentNode.$parentElm)
    shadowText.$pathRefId(subRefId);
    shadowText.$class(parentNode.$class());
    shadowText.$style(parentNode.$style());
    shadowText.$vAlign(parentNode.$vAlign());
    shadowText.$textAnchor(parentNode.$textAnchor());

    return shadowText;
}

function fillTextAlongPathTillLength(characters, shadowText, targetWidth) {
    let usedCharacters = [];
    characters.some(char => {
        usedCharacters.push(char);
        shadowText.$clearText();
        shadowText.$text(usedCharacters.join(""));
        return Math.ceil(shadowText.getBBox().width) >= targetWidth
    })

    return usedCharacters;
}

function getTargetWidth(parentPath, parentNode) {
    return parentPath.getTotalLength === undefined ? Math.round(parentNode.getBBox().width) : Math.round(parentPath.getTotalLength());
}
