function normalizeURL(urlString){

    const urlObj = new URL(urlString)

    const hostname = `${urlObj.hostname}${urlObj.pathname}`
    if (hostname.length > 0 && hostname.slice(-1) === '/'){
        return hostname.slice(0,-1)
    }
    return hostname
}

module.exports = { 
    normalizeURL
}