/**
 * Based on the work done by:
 *
 * https://easings.net/en
 * https://gist.github.com/gre/1650294
 * */

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

function bounceOut(x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

export const easingFunctions = {
    "linear": x => x <= 0 ? 0 : ((x >= 1) ? 1 : x),
    "ease-in": x => x * x,
    "ease-out": x => 1 - (1 - x) * (1 - x),
    "ease-in-out": x => x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2,
    "ease-in-cubic": x => x * x * x,
    "ease-out-cubic": x => 1 - pow(1 - x, 3),
    "ease-in-out-cubic": x => x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2,
    "ease-in-quart": x => x * x * x * x,
    "ease-out-quart": x => 1 - pow(1 - x, 4),
    "ease-in-out-quart": x => x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2,
    "ease-in-quint": x => x * x * x * x * x,
    "ease-out-quint": x => 1 - pow(1 - x, 5),
    "ease-in-out-quint": x => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2,
    "ease-in-sine": x => 1 - cos((x * PI) / 2),
    "ease-out-sine": x => sin((x * PI) / 2),
    "ease-in-out-sine": x => -(cos(PI * x) - 1) / 2,
    "ease-in-expo": x => x === 0 ? 0 : pow(2, 10 * x - 10),
    "ease-out-expo": x => x === 1 ? 1 : 1 - pow(2, -10 * x),
    "ease-in-out-expo": x => {
        return x === 0 ?
            0 :
            x === 1 ?
            1 :
            x < 0.5 ?
            pow(2, 20 * x - 10) / 2 :
            (2 - pow(2, -20 * x + 10)) / 2
    },
    "ease-in-circ": x => 1 - sqrt(1 - pow(x, 2)),
    "ease-out-circ": x => sqrt(1 - pow(x - 1, 2)),
    "ease-in-out-circ": x => {
        return x < 0.5 ?
            (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
    },
    "ease-in-back": x => c3 * x * x * x - c1 * x * x,
    "ease-out-back": x => 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2),
    "ease-in-out-back": x => {
        return x < 0.5 ?
            (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
    },
    "ease-in-elastic": x => {
        return x === 0 ?
            0 : x === 1 ?
            1 :
            -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
    },
    "ease-out-elastic": x => {
        return x === 0 ?
            0 : x === 1 ?
            1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
    },
    "ease-in-out-elastic": x => {
        return x === 0 ?
            0 : x === 1 ?
            1 : x < 0.5 ?
            -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1
    },
    "ease-in-bounce": x => 1 - bounceOut(1 - x),
    "ease-out-bounce": bounceOut,
    "ease-in-out-bounce": x => {
        return x < 0.5 ?
            (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
    },
};
