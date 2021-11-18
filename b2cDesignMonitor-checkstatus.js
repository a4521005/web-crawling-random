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

        const response = await page.goto("https://www.benq.com/en-us/monitor/designer.html")
        console.log(response.headers());
        console.log(response.status());
    }catch(error){
        console.error(error)
    }
}

// const [response] = await Promise.all([
//     page.waitForNavigation(),
//     page.click('a')
//   ]);

alldesignMonitorsTitles()

// node b2cDesignMonitor-checkstatus.js