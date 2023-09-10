let dataCache = {};

export function $cacheData(name, data) {
    dataCache[name] = data;
}

export function $getCachedData(name) {
    return dataCache[name];
}

export function $purgeCachedData(name) {
    dataCache[name] = null;
    delete dataCache[name];
}

export function $resetCache() {
    dataCache = {};
}

function isDataForKeyAvailable(cacheKey) {
    let value = $getCachedData(cacheKey);

    return value === undefined ? false : true;
}

export function $onCacheDataAvailable(cacheKey, onReadyCallback = () => { }, maxWaitAttempts, waitDuration = 1) {
    if (isDataForKeyAvailable(cacheKey)) {
        return;
    }

    let waitAttempts = 0;
    let dataIsReady = false;
    const startTime = Date.now();

    const waitAgain = () => {
        waitAttempts++;
        setTimeout(func, waitDuration * 1000)
    }
    const shouldWaitAgain = () => waitAttempts < maxWaitAttempts && !dataIsReady;

    const func = () => {
        if (isDataForKeyAvailable(cacheKey)) {
            dataIsReady = true;
        }

        if (shouldWaitAgain()) {
            waitAgain()
        } else {
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000.0;
            console.log("[$waitForData] exiting:", `key:${cacheKey}`, `waited: ${duration} seconds`);

            if (dataIsReady) {
                onReadyCallback(cacheKey, $getCachedData(cacheKey))
            }
        }
    }

    setTimeout(func, waitDuration * 1000)
}