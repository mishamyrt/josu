const serialize = (object, prefix) => {
    const args = []
    for (const property in object) {
        if (object.hasOwnProperty(property)) {
            const value = prefix ? prefix + '[' + property + ']' : property
            if (object[property] !== null &&
                typeof object[property] === 'object') {
                args.push(serialize(object[property]))
            } else {
                args.push(encodeURIComponent(object[property]) + '=' + encodeURIComponent(value))
            }
        }
    }
    return args.join('&')
}
