import * as gtap from '../../lib/gtap'
import test from "tape"

const setupFixture = () => {
    return {
        iterations: 10
    };
};

test("$arrayFromIterator", testCase => {
    testCase.test("Iterator callback", t => {
        let x = 0;
        let iterations = setupFixture().iterations;

        gtap.$arrayFromIterator(iterations, _ => {
            x += 1;
        });

        t.equal(10, x, "Should called iterator the correct number of times");
        t.end()
    });

    testCase.test("Correct length", t => {
        let iterations = setupFixture().iterations;

        const array = gtap.$arrayFromIterator(iterations, (prev, index) => {
            return prev + 10;
        });

        t.equal(10, array.length, "Should create an array with the correct number of times");
        t.end()
    });

    testCase.test("Correct values", t => {
        const actual = gtap.$arrayFromIterator(5, (prev, index) => {
            return prev + 10;
        });

        const expected = [10, 20, 30, 40, 50]

        t.deepEqual(expected, actual, "Should contain the correct values");
        t.end()
    });

    testCase.test("Correct index", t => {
        let indexes = [];
        gtap.$arrayFromIterator(5, (prev, index) => {
            indexes.push(index);
        });

        const expected = [0, 1, 2, 3, 4]

        t.deepEqual(expected, indexes, "Should contain the correct indexes");
        t.end()
    });


    testCase.test("StartsWith value", t => {
        const actual5 = gtap.$arrayFromIterator(5, (prev, index) => {
            return prev * 2;
        }, 5);
        const actual10 = gtap.$arrayFromIterator(5, (prev, index) => {
            return prev * 2;
        }, 10);

        const expected5 = [10, 20, 40, 80, 160]
        const expected10 = [20, 40, 80, 160, 320]

        t.deepEqual(expected5, actual5, "Should contain the correct value - actual5");
        t.deepEqual(expected10, actual10, "Should contain the correct value - actual10");
        t.end()
    });

    testCase.test("Ignoring index", t => {
        const actual = gtap.$arrayFromIterator(5, prev => {
            return prev + 2;
        });

        const expected = [2, 4, 6, 8, 10]

        t.deepEqual(expected, actual, "Should contain the correct value when index ignored");
        t.end()
    });
});