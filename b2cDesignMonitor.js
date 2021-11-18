//Scraping Top 100 Movie Titles
const cheerio = require("cheerio")
const puppeteer = require('puppeteer')


const sampleResult = {
    title:'	沙丘 (2021)',
    rank:1,
    imdbRating:8.4,
    descriptionUrl:"https://www.imdb.com/title/tt1160419/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=8X55K5BXN3HNPYBA1VVC&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
    posterUrl:"https://www.imdb.com/title/tt1160419/mediaviewer/rm2910452737/"
}

async function alldesignMonitorsTitles(){
    try{
        const browser = await puppeteer.launch({
            headless:false,
            // executablePath:
            // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            executablePath:
            "./node_modules/puppeteer/.local-chromium/win32-901912/chrome-win/chrome",
        })
        const page = await browser.newPage()
        await page.setViewport({width:1200,height:1000})

        await page.goto("https://www.benq.com/en-us/monitor/designer.html")
        const content = await page.content()
        const $ = await cheerio.load(content)
        const productTitles = $("#seriesproducts_copy > div.right > ul.products > ul > li > a > div.b2c-product-card-title").map((i,element)=>{
            return $(element).text()
        }).get()
        console.log(productTitles)
    }catch(error){
        console.error(error)
    }
}

alldesignMonitorsTitles()

// node b2cDesignMonitor.js