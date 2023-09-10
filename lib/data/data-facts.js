export const facts = {
    $shortMonthNames: (index) => shortMonthNames(index)
}

function shortMonthNames(index) {
    const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (index === undefined) {
        return names;
    }

    return index >= 0 && index < names.length ? names[index] : "";
}