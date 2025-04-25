const { chromium } = require('playwright');
const fs = require('fs');

async function loginToAirbnb(email, password) {
    try{
        const browser = await chromium.launch({ headless: true, args: ['--start-maximized'] });
        const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
        const page = await context.newPage();
        await page.goto('https://www.airbnb.com/login');
        await page.waitForTimeout(5000);
    // loginToAirbnb("justindelavega00@gmail.com", "Emjaycee83849724")
    await page.screenshot({ path : 'f1.png', fullPage: true });
        console.log(email,password);
        try{
            const accept_cookies = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/div/div[3]/section/div/div[2]/div[1]/button').isVisible();
            await page.waitForTimeout(2000);
            await accept_cookies.click();
        }
        catch(err){
            console.log('No cookies to accept');
        }
        await page.waitForTimeout(2000);
        let email_button = await page.locator("xpath=//*[@id='FMP-target']/div/div/div/div[3]/div/div[3]/button");
        await email_button.click();
        await page.waitForTimeout(2000);
        
        // let email_input = await page.locator("xpath=user[email]");
        for(const typing of email){
            await page.keyboard.press(typing);
            await page.waitForTimeout(1000);
        }
        await page.screenshot({ path : 'f2.png', fullPage: true });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(15000);
        await page.screenshot({ path : 'f3.png', fullPage: true });
        await page.waitForTimeout(2000);
        for(const typing of password){
            await page.keyboard.press(typing);
            await page.waitForTimeout(1000);
        }
        await page.screenshot({ path : 'f4.png', fullPage: true });
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.screenshot({ path : 'screenshot.png', fullPage: true });
        await page.waitForTimeout(5000);
        console.log(await page.url());
        await page.waitForTimeout(10000);
        await page.screenshot({ path : 'result.png', fullPage: true });
        if (await page.url() === 'https://www.airbnb.com/') {
            const cookies = await context.cookies();
            fs.writeFileSync('airbnb.json', JSON.stringify(cookies, null, 2));

            await browser.close();
            return true;
        }
        else {
            await browser.close();
            return false;
        }
    }catch(err){
        console.log('Error:', err);
        return false;
    }
}

module.exports = { loginToAirbnb };