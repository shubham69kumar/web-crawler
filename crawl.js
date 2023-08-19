const {JSDOM} = require('jsdom')

function getURLformHTML(htmlbody , baseurl){
    const urls = []
    const dom = new JSDOM(htmlbody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements ){
        if (linkElement.href.slice(0,1) ==='/'){
            try {
                const urlobj = new URL(`${baseurl}${linkElement.href}`)
                urls.push(urlobj.href)
            }
            catch(err) {
                console.log(err.message)
            }
            
        }
        else {
            try {
                const urlobj = new URL(linkElement.href)
                urls.push(urlobj.href)
            }
            catch(err) {
                console.log(err.message)
            }
        }
        
    }
    return urls
}


function normalizeURL(urlString){

    const urlObj = new URL(urlString)

    const hostname = `${urlObj.hostname}${urlObj.pathname}`
    if (hostname.length > 0 && hostname.slice(-1) === '/'){
        return hostname.slice(0,-1)
    }
    return hostname
}

module.exports = { 
    normalizeURL, 
    getURLformHTML
}