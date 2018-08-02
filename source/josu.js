/**
 * Returns promise that DOM will ready
 * @returns {Promise} Promise object represents the DOM is ready
 */
const ready = () => {
    return new Promise((resolve) => {
        if (document.readyState != 'loading') {
            resolve()
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    })
}

/**
 * Executes a request to URL with parameters
 * @param {string} method Request method
 * @param {string} url Request URL
 * @param {Object} data Request parameters
 */
const request = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        const params = serialize(data);
        http.open(method.toUpperCase(), url, true);
        http.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        );
        http.onreadystatechange = () => {
            if (http.readyState === 4 &&
                http.status === 200) {
                try {
                    resolve(JSON.parse(http.responseText))
                } catch (error) {
                    reject(http.responseText)
                }
            }
        }
        http.send(params);
    })
}

const serialize = (object, prefix) => {
    const args = []
    for (const property in object) {
        if (object.hasOwnProperty(property)) {
            const value = prefix ? prefix + "[" + property + "]" : property
            if (object[property] !== null &&
                typeof object[property] === "object") {
                args.push(serialize(object[property]))
            } else {
                args.push(encodeURIComponent(object[property]) + "=" + encodeURIComponent(value));
            }
        }
    }
    return args.join("&");
}

/**
 * Performs POST request
 * @param {string} url Request URL
 * @param {Object} data Request parameters
 */
const post = (url, data) => request('post', url, data)

/**
 * Performs GET request
 * @param {string} url Request URL
 * @param {Object} data Request parameters
 */
const get = (url, data) => request('get', url, data)

/**
 * Async version of setTimeout
 * @param {number} time Request URL
 */
const delay = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}


export { ready, request, post, get, delay }