const { chromium } = require('playwright');
const fs = require('fs');
const {a_room_function} = require('./a_room_function');
const {shared_function} = require('./shared_function');

async function hotel_listing(data) {
    
    let id;
    const browser = await chromium.launch({ headless: true  ,args: ['--start-maximized'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    try{
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    console.log("done");
    }catch(err){
        console.log('No cookies to add');
    }
    await page.waitForTimeout(2000);
    await page.goto('https://www.airbnb.com');
    await page.waitForTimeout(5000);
    await page.goto('https://www.airbnb.com/become-a-host');
    await page.waitForTimeout(5000);
    let start = await page.getByText('Create a new listing');
    await page.waitForTimeout(5000);
    await start.click();
    let get_started = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[2]/div/div/div/button').nth(0);
    await page.waitForTimeout(2000);
    await get_started.click();
    await page.waitForTimeout(5000)
    let button1 = "Start on your own";
    let button2 = "Match with a Superhost"
    let start_new = await page.getByText(button1).nth(1);
    await start_new.click();
    await page.waitForTimeout(5000);
    let next1 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next1.click({ force: true });

    if(data.place_guest_will == "a_room"){
        id = await a_room_function(page,data);
        console.log("a_room_function done");
        }
    else{
        id = await shared_function(page,data);
        console.log("shared_function done");
    }
    
    
    await page.close();
    return id;
};


module.exports = { hotel_listing }