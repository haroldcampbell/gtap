
function validateNumber(number, message) {
    if (typeof number != "number") {
        return {
            isValid: false,
            message: message
        };
    }

    return {
        isValid: true
    };
}

function validateIterations(iterations) {
    if (iterations < 0) {
        return {
            isValid: false,
            message: "Iterations need to be greater than 0"
        };
    }

    return validateNumber(iterations, "Iterations to be a number");
}

function validateCallback(callback) {
    if (callback == null) {
        return {
            isValid: false,
            message: "Callback is null. This should be a function of the form callback(number)."
        };
    }
    if (typeof callback !== 'function') {
        return {
            isValid: false,
            message: "Callback should be a function of the form callback(number)."
        };
    }
    return {
        isValid: true
    };
}

/**
 * Creates an a array of values based on the specified iteratorCallback and
 * the number of iterations.
 *
 * @param {Number} iterations - the number of times to call the iteratorCallback
 * @param {Function} iteratorCallback - a callback of the form function(pre, index) that returns a number
 * @param {Number} startingWith - a number that can be used to seed the iterator. Default value is 0.
 *
 * @example
 *      const dashData = gtap.$arrayFromIterator(5, (_, index) => (index) * 70); // returns [0, 70, 140, 210, 280]
 *      const ringDotsData = gtap.$data(gtap.$arrayFromIterator(4, _ => 1)); // returns [1, 1, 1, 1]
 * @return {Array}
 */
export function $arrayFromIterator(iterations, iteratorCallback, startingWith = 0) {
    let validation = validateIterations(iterations);
    if (!validation.isValid) {
        throw new Error(validation.message)
    }

    validation = validateCallback(iteratorCallback);
    if (!validation.isValid) {
        throw new Error(validation.message)
    }

    validation = validateNumber(startingWith, "startWith should be a number.")
    if (!validation.isValid) {
        throw new Error(validation.message)
    }

    let dataValues = [];
    let prev = startingWith;
    for (let index = 0; index < iterations; index++) {
        const current = iteratorCallback(prev, index);
        dataValues.push(current);

        prev = current;
    }

    return dataValues;
}