function printreport(pages) {
    console.log ("==================")
    console.log ("REPORT")  
    console.log ("===================")
    const sortedPages =  sortPages (pages)
    for (const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log (`Found ${hits} links to pages: ${url}`)
    }
    console.log("=================")
    console.log("END REPORT")
    console.log("=================")

}


function sortPages (pages){

    const PagesArr = Object.entries(pages)
    PagesArr.sort((a,b) => {
        aFirst = a[1]
        bFirst = b[1]
        return b[1] - a[1]
    })
    return PagesArr
}

module.exports =  {
    sortPages,
    printreport
}
