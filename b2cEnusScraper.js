// Web Scraper for EN-US B2C Monitor
//爬monitor page
const puppeteer = require("puppeteer")
const random_useragent = require("random-useragent")
const fs = require('fs')
// const {enusMonitorUrlEx3210r, enusMonitorUrlEx2510s, enusMonitorUrl} = require("./config")

;(async()=>{
    //Open a browser
    const browser = await puppeteer.launch({
        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless:true,//有無需要開視窗,false要開,true不開
        slowMo:110,// slow down by 110ms
        devtools:false//有無需要開啟開發人員工具
    })
    const page = await browser.newPage()

    //SetUp Browser
    await page.setDefaultTimeout(2000000)
    await page.setViewport({width:1200, height:800})
    await page.setUserAgent(random_useragent.getRandom())

    //Get data from EN-US B2C Monitor
    const name_selector = "#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > a > div.b2c-product-card-title"
    const price_selector = "#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-price-area > div > p.b2c-product-card-price-now"
    const button_selector = "#seriesproducts > div.right > ul.products > ul > li:nth-child(1) > div.b2c-product-card-btn-area > div:nth-child(1) > div > p > a"
    const enusMonitorUrl = "https://www.benq.com/en-us/monitor.html"
    await page.goto(enusMonitorUrl)
    await page.waitForSelector(name_selector)
    await page.waitForSelector(price_selector)
    await page.waitForSelector(button_selector)
    const name = await page.$eval(name_selector, e=>e.innerHTML)
    const price = await page.$eval(price_selector, e=>e.innerHTML)
    const button = await page.$eval(button_selector, e=>e.innerHTML)
    const nameTrim = name.trim()
    const priceTrim = price.trim()
    console.log(nameTrim)
    console.log(priceTrim)
    console.log(button)

    //Get current date and time
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const fullDate = `${day}/${month}/${year}`
    console.log(fullDate + " " + nameTrim + " " + priceTrim + " " + button)

    //Save Data to the textfile 
    const logger = fs.createWriteStream('log.txt',{flags: 'a'})
    logger.write(`${fullDate} - ${nameTrim} - ${priceTrim} - ${button}\n`)
    logger.close()

    //Close Browser
    await browser.close()

})().catch(error=>{
    console.log(error)
    process.exit(1)
})