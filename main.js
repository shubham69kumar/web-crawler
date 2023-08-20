const {crawlpage} = require('./crawl.js')
const {printreport} = require('./report.js')

async function main (){
    if (process.argv.length < 3 ){
        console.log("no website given")
        process.exit(1)
    }

    else if  (process.argv.length > 3 ) {
        console.log("Too many command line argumnets ")
        process.exit(1)
    }
    const baseUrl = process.argv[2]
    console.log (`Starting crawl of ${baseUrl}`)
    const pages = await crawlpage(baseUrl , baseUrl, {})
    
    printreport(pages)
}

main()