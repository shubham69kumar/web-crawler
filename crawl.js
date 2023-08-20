const {JSDOM} = require('jsdom')

async function crawlpage ( baseUrl,currenturl,pages ){
    
    const baseURLObj = new URL(baseUrl)
    const currentURLObj = new URL(currenturl)
    if (currentURLObj.hostname !==  baseURLObj.hostname){
        return pages
    }

    const normalizeURLObj = normalizeURL(currenturl)
    if (pages[normalizeURLObj] > 0){
        pages[normalizeURLObj]++
        return pages
    }
    pages[normalizeURLObj] = 1
    console.log(`actively crawling ${currenturl}`)
    try {
    
        const resp = await fetch(currenturl)
        if (resp.status > 399){
            console.log(`error while fetch with code ${resp.status} for the page: ${currenturl}`)
            return pages
        }
        const content = resp.headers.get("content-type")
        if (!content.includes("text/html")){
            console.log(`non html response , content type: ${content} , on page ${currenturl}`)
            return pages
        }
        
        const htmlbody = await resp.text()
        const nextURLS = getURLformHTML(htmlbody , baseUrl)
        for (const nextURL of nextURLS){
            pages = await crawlpage(baseUrl , nextURL, pages)
        }

    }
    catch (err){
        console.log(`error while crawling ${err.message} while crawling ${currenturl}`)
    }
    return pages
}

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
    getURLformHTML,
    crawlpage
}