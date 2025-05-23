const { chromium } = require('playwright');
const fs = require('fs');
const move_to_docker = require('./transfer.js');
const path = require('path');
const updateAuthInDocker = require('./auth_data');


function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


async function loginToAirbnb(platform,email, password) {
        const userDataDir = '/home/berting/.config/google-chrome';
        const profileName = 'Profile 8'; // Profile you want to delete
        const profilePath = path.join(userDataDir, profileName);

        // Delete profile folder if it exists
        if (fs.existsSync(profilePath)) {
            fs.rmSync(profilePath, { recursive: true, force: true });
        }

        const context = await chromium.launchPersistentContext(userDataDir, {
            headless: false,
            args: [
            `--profile-directory=${profileName}`,
            '--disable-blink-features=AutomationControlled',
            '--window-size=1920,1080'
            ],
        });

        const pages = context.pages();
        const page = pages.length ? pages[0] : await context.newPage();

        await page.goto('https://www.airbnb.com/login');
        await page.waitForTimeout(3000);
        
    // loginToAirbnb("justindelavega00@gmail.com", "Emjaycee83849724")
        try{
                const accept_cookies = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/div/div[3]/section/div/div[2]/div[1]/button').isVisible();
                await page.waitForTimeout(2000);
                await accept_cookies.click();
            }
            catch(err){
                console.log('No cookies to accept');
            }
            console.log(email,password);
        
        if(platform == "Google"){
            google_login(page,context,email, password);
        }
        else if(platform == "Email"){
            email_login(page,context,email, password)
        }
        
}


async function google_login(page,context,email, password){
    // await page.waitForTimeout(2000);
    // let google_button = await page.locator('button').filter({ hasText: "Continue with Google"});
    await page.waitForTimeout(2000);
    // await google_button.click();
    const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('button', { hasText: 'Continue with Google' }).click()
  ]);

  await popup.waitForLoadState();
    await popup.waitForTimeout(2000);
    for(const typing of email){
            await popup.keyboard.press(typing);
            await popup.waitForTimeout(1000);
        }
    // await popup.screenshot({ path: "pop1.jpg"});
        await popup.keyboard.press('Enter');
    await popup.waitForTimeout(5000);
    // await popup.screenshot({ path: "pop.jpg"});
    for(const typing of password){
            await popup.keyboard.press(typing);
            await popup.waitForTimeout(1000);
        }
    // await popup.screenshot({ path: "pop2.jpg"});
    await popup.keyboard.press('Enter');
    try{
    await popup.waitForTimeout(20000);
    }catch(e){
        console.log("pop up close");
    }
    const pages = context.pages();
    const mainPage = pages[0]; 
    await mainPage.bringToFront();

    // Optional: verify it's Airbnb
    await mainPage.waitForLoadState();
    await mainPage.waitForTimeout(20000);

    if (await mainPage.url() === 'https://www.airbnb.com/') {
        const uuid = generateUUID();
        await mainPage.screenshot({ path : 'correct.png', fullPage: true });
        const cookies = await context.cookies();
        
        fs.writeFileSync(`${uuid}.json`, JSON.stringify(cookies, null, 2));
        await move_to_docker(uuid);
        await updateAuthInDocker(email, uuid);

        await mainPage.waitForTimeout(10000);
        await context.close();
        return uuid;
    } else {
        await mainPage.screenshot({ path : 'error.png', fullPage: true });
        await context.close();
        throw new Error('Login failed: Final URL did not match expected Airbnb homepage');
    }

    // Wait for redirect to your app
    // await popup.waitForURL('**/dashboard');
    
}

async function email_login(page,context,email, password){
    
        
        await page.waitForTimeout(2000);
        let email_button = await page.locator('xpath=//*[@id="FMP-target"]/div/div/div/div[3]/div/div[1]/form/button');
        await email_button.click();
        await page.waitForTimeout(2000);
        
        // let email_input = await page.locator("xpath=user[email]");
        for(const typing of email){
            await page.keyboard.press(typing);
            await page.waitForTimeout(1000);
        }
        await page.keyboard.press('Enter');
        await page.waitForTimeout(15000);
        await page.waitForTimeout(2000);
        for(const typing of password){
            await page.keyboard.press(typing);
            await page.waitForTimeout(1000);
        }
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        console.log(await page.url());
        await page.waitForTimeout(10000);
        await page.waitForTimeout(10000);
        await page.goto('https://www.airbnb.com/');
        await page.waitForTimeout(20000);
        if (await page.url() == 'https://www.airbnb.com/') {
           let uuid = generateUUID();
            await page.screenshot({ path : 'correct.png', fullPage: true });
            const cookies = await context.cookies();
            fs.writeFileSync(`${uuid}.json`, JSON.stringify(cookies, null, 2));
            page.waitForTimeout(10000);
            move_to_docker(uuid);
            updateAuthInDocker(email, uuid);
            page.waitForTimeout(10000);
            await context.close();
            return uuid;
        }
        else {
            await page.screenshot({ path : 'error.png', fullPage: true });
            await context.close();
            return false;
        }
}



module.exports = { loginToAirbnb };



// const { chromium } = require('playwright-extra');
// const stealth = require('playwright-extra-plugin-stealth')();
// chromium.use(stealth);

// const userAgentStrings = [
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.2228.0 Safari/537.36',
//   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
//   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
// ];

// const randomUA = userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)];

// (async () => {
//   const browser = await chromium.launch({
//     headless: false, // show browser for realism
//     args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
//   });

//   const context = await browser.newContext({
//     userAgent: randomUA,
//     viewport: { width: 1366, height: 768 },
//     deviceScaleFactor: 1,
//     isMobile: false,
//     hasTouch: false,
//     locale: 'en-PH',
//     timezoneId: 'Asia/Manila',
//     geolocation: { latitude: 14.5995, longitude: 120.9842 }, // Manila, PH
//     permissions: ['geolocation'],
//   });

//   // Hide WebDriver fingerprint
//   await context.addInitScript(() => {
//     Object.defineProperty(navigator, 'webdriver', {
//       get: () => false,
//     });
//   });

//   // Set common headers for a Filipino user
//   await context.setExtraHTTPHeaders({
//     'accept-language': 'en-PH,en;q=0.9',
//   });

//   const page = await context.newPage();

//   await page.goto('https://www.airbnb.com/', { waitUntil: 'domcontentloaded' });

//   // Optional: simulate human activity
//   await page.mouse.move(200, 200);
//   await page.waitForTimeout(1000);

//   // 🛠️ Add your automation code here...

//   // await browser.close();
// })();


// loginToAirbnb("Google",'malta.ger.bkk@gmail.com','xurvyF-0zabqi-viwpiw');