import {
    serialize,
} from './helpers'

/**
 * Returns promise that DOM will ready
 * @returns {Promise} Promise object represents the DOM is ready
 */
const ready = () => {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve)
        } else {
            resolve()
        }
    })
}

/**
 * Executes a request to URL with parameters
 * @param {String} method Request method
 * @param {String} url Request URL
 * @param {Object} data Request parameters
 * @returns {Promise}
 */
const request = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest()
        const params = serialize(data)
        http.open(method.toUpperCase(), url, true)
        http.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        )
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
        http.send(params)
    })
}

/**
 * Performs POST request
 * @param {String} url Request URL
 * @param {Object} data Request parameters
 * @returns {Promise}
 */
const post = (url, data) => request('post', url, data)

/**
 * Performs GET request
 * @param {String} url Request URL
 * @param {Object} data Request parameters
 * @returns {Promise}
 */
const get = (url, data) => request('get', url, data)

/**
 * Async version of setTimeout
 * @param {Number} time Request URL
 * @returns {Promise}
 */
const delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


export {
    ready,
    request,
    post,
    get,
    delay,
}
