import {
    $arrayFromIterator
} from "./array-from-iterator"
import {
    $data
} from "./data-simple-array"

/**
 * Short-cut to create a list of numbers.
 *
 * @param {Number} count - the number of numbers that will be created
 * @param {Number} increment - the value that will be used to increment the numbers
 * @param {Number} startFrom - the starting value of the list. The default is 0
 *
 * @return {$data} - a data object with the list as input
 */
export function $dataWithIncrement(count, increment, startFrom = 0) {
    const array = $arrayFromIterator(count, pre => pre + increment, startFrom);

    return $data(array);
}