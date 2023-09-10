export function loadJSON(path, successHandler, errorHandler) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (successHandler) {
                    successHandler(JSON.parse(xhr.responseText));
                }
            } else {
                if (errorHandler) {
                    errorHandler(xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

export function $fetchData(path, callback) {
    loadJSON(path, data => callback(data), err => {
        console.log("[$fetchData]>> Error loading data", err);
    });
}