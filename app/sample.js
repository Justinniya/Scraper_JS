const { chromium } = require('playwright');
const fs = require('fs');

async function loginToAirbnb(platform,email, password) {
        const userDataDir = '/home/berting/.config/google-chrome'; // Real Chrome user data path
        const profileDir = 'Profile 8'; // Your chosen Chrome profile (check spelling/case)

        const context = await chromium.launchPersistentContext(userDataDir, {
            headless: true,
            args: [
            `--profile-directory=${profileDir}`,
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
            google_login(page,email, password);
        }
        else if(platform == "Email"){
            email_login(page,email, password)
        }
        
}


async function google_login(page,email, password){
    await page.waitForTimeout(2000);
    // let google_button = await page.locator('button').filter({ hasText: "Continue with Google"});
    // await page.waitForTimeout(2000);
    // await google_button.click();
    await page.goto('https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S-1609351912%3A1747888816289396&access_type=offline&client_id=622686756548-j87bjniqthcq1e4hbf1msh3fikqn892p.apps.googleusercontent.com&o2v=1&redirect_uri=https%3A%2F%2Fwww.airbnb.com%2Foauth_callback&response_type=code&scope=profile+email&service=lso&state=JXBFHCHBFIGGGCJRWGRUUWUQIOCRXW&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAPBhj2098laxP5CvRPTs5oth7s7eJavfQee4I9rtLp7S4ETe0hKtm8F_W_lEUajrByld9MatZKHMWT9nQcsolm12mv_v64pfEQk_dSlo1dF2-FCypFrAOJyC0mN747tG_GAYI_Hvo63300aqwIdwHIg5RH0dHr5g-5jbjCaGhCc3Ak4zujNWbzBnCkQC0y94ZFJLsRrB7cf199e_WEixex9TiOyF9-Y5D8Mf19LYY1_TDV68SkLvzWUP44GL8a3w4rm2tX7vyyKjNbLbmg5mGVwmWGoMtAYs0I6_9QF8vCwaUw3PoYWoSzETZF-6zToQWb5hMb847kr8lLdLFwKxHYypMHV5hudBDdOsxrER8H-6yU2LRRNllasDXi98fwZ-lFDwSoFU8MMUnPiuj-yTNchDiU66r4YInNnsARxU41B-hnCcqFYLHWUH6xVcZSGVljyP21ZPVVR7o4aFZP3wSyMVHSgug%26flowName%3DGeneralOAuthFlow%26as%3DS-1609351912%253A1747888816289396%26client_id%3D622686756548-j87bjniqthcq1e4hbf1msh3fikqn892p.apps.googleusercontent.com%23&app_domain=https%3A%2F%2Fwww.airbnb.com&rart=ANgoxcdgjeXrg4p9s_xmVHtCTEh6Fm2fsmpxvth_5gMrJwvIPpNOeJ0nXoJUaDc7SsBZVeLtvaTxnjMMACyRrS1MuSzZkssv1Sc544yXPrCWDk4a14V6EAw');

    // Interact with the Google login page
    await page.waitForLoadState();
    await page.waitForTimeout(2000);
    for(const typing of email){
            await page.keyboard.press(typing);
            await page.waitForTimeout(1000);
        }
    await page.screenshot({ path: "pop1.jpg"});
        await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: "pop.jpg"});
    for(const typing of password){
            await page.keyboard.press(typing);
            await page.waitForTimeout(1000);
        }
    await page.screenshot({ path: "pop2.jpg"});
    await page.keyboard.press('Enter');
    

    // Wait for redirect to your app
    await page.waitForURL('**/dashboard');

    console.log('Logged in!');
}

async function email_login(page,email, password){
    
        
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

            await browser.close();
            return uuid;
        }
        else {
            await page.screenshot({ path : 'error.png', fullPage: true });
            await browser.close();
            return false;
        }
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// module.exports = { loginToAirbnb };



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


loginToAirbnb("Google",'justindelavega00@gmail.com','Emjaycee83849724');