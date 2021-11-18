// 抽檢機制用到的產品
//可以隨時掌握產品是Notify Me/Buy Now
//1.先在config.js輸入URL
//2.複製下面的test case,記得改price_selector和log檔名
const puppeteer = require("puppeteer")
const random_useragent = require("random-useragent")
const fs = require('fs')
const {enusMonitorUrlEx3210r, enusMonitorUrlEx2510s, enusMonitorUrl} = require("./config")

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
    await page.setDefaultTimeout(3600000)
    await page.setViewport({width:1200, height:800})
    await page.setUserAgent(random_useragent.getRandom())

    //Get data from EN-US B2C Monitor
    const name_selector = "h1"
    const price_selector = "p.promote-price"
    const button_selector = "#simpleFlow"
    await page.goto(enusMonitorUrlEx3210r)
    await page.waitForSelector(name_selector)
    await page.waitForSelector(price_selector)
    await page.waitForSelector(button_selector)

    const name = await page.$eval(name_selector, e=>e.innerHTML)
    //新增的
    const price = await page.$eval(price_selector, e=>e.innerHTML)
    const button = await page.$eval(button_selector, e=>e.innerHTML)
    const nameTrim = name.trim()
    const priceTrim = price.trim()
    console.log(nameTrim)
    console.log(priceTrim)
    console.log(button)

    //Get current date and time
    const date = new Date()
    function wholeMonth(){
        var getmonth = date.getMonth() + 1
        if(getmonth<10){
            wholeMonth =  "0"+getmonth 
            return wholeMonth
        }else{
            wholeMonth = getmonth 
            return wholeMonth
        }
    }
    function wholeDate(){
        const getDay = date.getDate()
        if(getDay<10){
            wholeDate =  "0"+getDay
            return wholeDate
        }else{
            wholeDate = getDay 
            return wholeDate
        }
    }
    function wholeHours(){
        const getHours = date.getHours()
        if(getHours<10){
            wholeHours =  "0"+getHours
            return wholeHours
        }else{
            wholeHours = getHours 
            return wholeHours
        }
    }
    function wholeMinutes(){
        const getMinutes = date.getMinutes()
        if(getMinutes<10){
            wholeMinutes =  "0"+getMinutes
            return wholeMinutes
        }else{
            wholeMinutes = getMinutes 
            return wholeMinutes
        }
    }
    const month = wholeMonth()
    const day = wholeDate()
    const year = date.getFullYear()
    //const time = ' '+date.getHours()+':'+date.getMinutes();
    const time = ' '+wholeHours()+':'+wholeMinutes();
    const fullTime = `${year}/${month}/${day}${time}`

    //Save Data to the textfile 
    const logger = fs.createWriteStream('./productStatus/enusEx3210r.txt',{flags: 'a'})
    logger.write(`${fullTime} - ${nameTrim} - ${priceTrim} - ${button}\n`)
    logger.close()

    //Close Browser
    await browser.close()

})().catch(error=>{
    console.log(error)
    process.exit(1)
})

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
    await page.setDefaultTimeout(3600000)
    await page.setViewport({width:1200, height:800})
    await page.setUserAgent(random_useragent.getRandom())

    //Get data from EN-US B2C Monitor
    const name_selector = "h1"
    const price_selector = "p.regular-price-block"
    const button_selector = "#simpleFlow"
    await page.goto(enusMonitorUrlEx2510s)
    await page.waitForSelector(name_selector)
    await page.waitForSelector(price_selector)
    await page.waitForSelector(button_selector)

    const name = await page.$eval(name_selector, e=>e.innerHTML)
    //新增的
    const price = await page.$eval(price_selector, e=>e.innerHTML)
    const button = await page.$eval(button_selector, e=>e.innerHTML)
    const nameTrim = name.trim()
    const priceTrim = price.trim()
    console.log(nameTrim)
    console.log(priceTrim)
    console.log(button)

    //Get current date and time
    const date = new Date()
    function wholeMonth(){
        var getmonth = date.getMonth() + 1
        if(getmonth<10){
            wholeMonth =  "0"+getmonth 
            return wholeMonth
        }else{
            wholeMonth = getmonth 
            return wholeMonth
        }
    }
    function wholeDate(){
        const getDay = date.getDate()
        if(getDay<10){
            wholeDate =  "0"+getDay
            return wholeDate
        }else{
            wholeDate = getDay 
            return wholeDate
        }
    }
    function wholeHours(){
        const getHours = date.getHours()
        if(getHours<10){
            wholeHours =  "0"+getHours
            return wholeHours
        }else{
            wholeHours = getHours 
            return wholeHours
        }
    }
    function wholeMinutes(){
        const getMinutes = date.getMinutes()
        if(getMinutes<10){
            wholeMinutes =  "0"+getMinutes
            return wholeMinutes
        }else{
            wholeMinutes = getMinutes 
            return wholeMinutes
        }
    }
    const month = wholeMonth()
    const day = wholeDate()
    const year = date.getFullYear()
    //const time = ' '+date.getHours()+':'+date.getMinutes();
    const time = ' '+wholeHours()+':'+wholeMinutes();
    const fullTime = `${year}/${month}/${day}${time}`

    //Save Data to the textfile 
    const logger = fs.createWriteStream('./productStatus/enusEx2510s.txt',{flags: 'a'})
    logger.write(`${fullTime} - ${nameTrim} - ${priceTrim} - ${button}\n`)
    logger.close()

    //Close Browser
    await browser.close()

})().catch(error=>{
    console.log(error)
    process.exit(1)
})