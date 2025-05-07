const { chromium } = require('playwright');
const fs = require('fs');
const { set } = require('date-fns/set');
const axios = require('axios');

async function listing_main(data) {
  console.log(data);
    const browser = await chromium.launch({ headless: true ,args: ['--window-size=1920,1080'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',viewport: { width: 1920, height: 1080 }});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    try{
    const cookies = JSON.parse(fs.readFileSync('airbnb_listing.json', 'utf-8'));
    await context.addCookies(cookies);
    console.log("done");
    }catch(err){
        console.log('No cookies to add');
    }
    await page.goto('https://www.airbnb.com');
    await page.waitForTimeout(2000);
    await page.goto('https://www.airbnb.com/hosting/reservations/completed');
    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="site-content"]/div[1]/section/div[2]/div[1]/div/div/div[1]/div/button').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div[1]/div[1]/div[1]/label/div[2]').click();
    const StartDate = data['filter_start_date'];
    const [start_year,start_month, start_day] = StartDate.split('-').map(Number);
    await selectDateFromCalendar(page, start_day, start_month, start_year, true);  

    await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div[1]/div[2]/div[1]/label/div[2]').click();
    const EndDate = data['filter_end_date'];
    const [end_year,end_month, end_day] = EndDate.split('-').map(Number);
    await selectDateFromCalendar(page, end_day, end_month, end_year, false); 
    await page.waitForTimeout(2000);
    
    // await footer.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await page.waitForTimeout(500);
    let apply = await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/footer/button').nth(1);
    await apply.click({ force: true});
    
    await page.waitForTimeout(20000);
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    let number_of_lines = await page.locator('[data-testid="host-reservations-table-row"]').count();
    let final_listing;
    let sets = [];
    
    for(let i = 0; number_of_lines>i; i++){
        let lines = await page.locator('[data-testid="host-reservations-table-row"]').nth(i);
        let guest_name = await lines.textContent('ol.lgx66tx li.l7n4lsf:nth-of-type(2)');
        let check_in = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(3).textContent();
        let check_out = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(4).textContent();
        let listing = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(6).textContent();
        let price = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(8).textContent();
        let code = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(7).textContent();
        const page1 = await context.newPage();
        let url = `https://www.airbnb.com/hosting/reservations/completed?confirmationCode=${code}`
        await page1.goto(url);
        final_listing = await page1.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div/div/div/div[2]/div/div[1]/div[1]/div[2]').textContent();
        await page1.close();
        await page.bringToFront();
        const uid = findUID(final_listing,data);
        const result = separateCurrencySymbol(price);
        sets.push({
            'reservation_code': code,
            'guest_name':guest_name.trim(),
            'check_in':convertDateToDigits(check_in),
            'check_out': convertDateToDigits(check_out),
            'currency': result.symbol,
            'price':result.amount,
            'airbnb_uid': uid
        });
        
    
    }
    // console.log(sets);
    // await page.waitForTimeout(50000);
    
    await page.close();
    let finaL_response = await response(sets);
    // console.log(sets);
    return finaL_response;
};

async function selectDateFromCalendar(page, day, month, year, isStartDate = true) {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const dateSelector = `[data-testid="calendar-day-${mm}/${dd}/${year}"]`;

  const dateInputSelector = isStartDate
    ? '[data-testid="toolbar_filter_startdate_input"]'
    : '[data-testid="toolbar_filter_enddate_input"]';

  // Click on the date input field to open the calendar
  await page.click(dateInputSelector);

  // Wait for the date to appear in the calendar
  await page.waitForSelector(dateSelector);

  // Click the date
  await page.click(dateSelector);
}

async function response(sets)
{
  try {
    const response = await axios.post('http://ds2.d3.net:8069/jsonrpc', {
      "jsonrpc": "2.0",
      "method": "call",
      "params": {
        "service": "object",
        "method": "execute_kw",
        "args": [
          "odoo_botification_dryrun",
          2,
          "ef9b3ff8cf437acfc67a832497aece3e727b0bc4",
          "managebnb.property",
          "collect_scrape_airbnb_bookings",
          [sets]
        ]
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Result:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function convertDateToDigits(dateStr) {
    // Create a Date object from the input string
    const date = new Date(dateStr);
  
    // Format the date to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');  // Ensures day is always 2 digits
    
    // Return the formatted date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  }

function separateCurrencySymbol(amount) {
    const match = amount.match(/([^\d.,\s]+)(\d+[\d,.]*)/); 
    if (match) {
        const symbol = match[1];  
        const amountString = match[2];
        const numericValue = parseFloat(amountString.replace(/,/g, ''));
      return {
        symbol: sign(symbol),
        amount: numericValue  
      };
    }
    return null;
  }

function findUID(entry,dataParam) {
    const data = dataParam['for_catching_airbnb_uid'];
    // {
        // names: [
        //   "A1 Chaweng Mountain View, 1th floor", "A2 Chaweng Mountain View, 1th floor",
        //   "A3 Chaweng Lake View, 2nd floor",     "A4 Chaweng Lake View, 2nd floor",
        //   "A5 Chaweng Panorama View, 3rd floor", "A6 Chaweng Panorama View, 3rd floor",
        //   "B1 Chaweng Mountain View, 1th floor", "B2 Chaweng Mountain View, 1th floor",
        //   "B3 Chaweng Lake View, 2nd floor",     "B4 Chaweng Lake View, 2nd floor",
        //   "B5 Chaweng Panorama View, 3rd floor", "B6 Chaweng Panorama View, 3rd floor",
        //   "C1 Chaweng Mountain View, 1th floor", "C2 Chaweng Mountain View, 1th floor",
        //   "C3 Chaweng Lake View, 2nd floor",     "C4 Chaweng Lake View, 2nd floor",
        //   "C5 Chaweng Panorama View, 3rd floor", "C6 Chaweng Panorama View, 3rd floor",
        //   "D1 Chaweng Mountain View, 1th floor", "D2 Chaweng Mountain View, 1th floor",
        //   "D3 Chaweng Lake View, 2nd floor",     "D4 Chaweng Lake View, 2nd floor"
        // ],
        // airbnb_uids: [
        //   "1214205284926186484", "1326436699315156206", "1217189681070539446",
        //   "1326425673876377173", "1217258250370046916", "1285062459552924609",
        //   "1217089201544101425", "1326439048034779048", "1283052734931254218",
        //   "1326427239457519760", "1236555571957374980", "1284522361461507064",
        //   "1326432967356919229", "1217089201544101425", "1326420020033729942",
        //   "1326429385889305030", "1284492686085392718", "1285074523204401588",
        //   "1326435610236794917", "753379668429308358", "1326423041028890706",
        //   "1326430672093829098"
        // ]
        
      // };
    const codeMatch = entry.match(/\b[A-Z]\d\b/); // Find room code like A4, B5
    const floorMatch = entry.match(/(Chaweng .*?floor)/); // Extract floor description
  
    if (codeMatch && floorMatch) {
      const search = `${codeMatch[0]} ${floorMatch[1]}`.toLowerCase();
  
      for (let i = 0; i < data.names.length; i++) {
        if (data.names[i].toLowerCase() === search) {
          return data.airbnb_uids[i];
        }
      }
    }
    return false; // Not found
  }

function sign(symbol){
    const currencyMap = {
        '$': 'USD',  // United States Dollar
        '€': 'EUR',  // Euro
        '£': 'GBP',  // British Pound
        '¥': 'JPY',  // Japanese Yen
        '₹': 'INR',  // Indian Rupee
        '₩': 'KRW',  // South Korean Won
        '₽': 'RUB',  // Russian Ruble
        '₱': 'PHP',  // Philippine Peso
        '฿': 'THB',  // Thai Baht
        '₫': 'VND',  // Vietnamese Dong
        '₪': 'ILS',  // Israeli New Shekel
        '₴': 'UAH',  // Ukrainian Hryvnia
        '₦': 'NGN',  // Nigerian Naira
        'R$': 'BRL', // Brazilian Real
        '₺': 'TRY',  // Turkish Lira
        '₡': 'CRC',  // Costa Rican Colón
        '₨': 'PKR',  // Pakistani Rupee
        '៛': 'KHR',  // Cambodian Riel
        '₣': 'FRF',  // French Franc (Historical)
        '₴': 'UAH',  // Ukrainian Hryvnia
        '₳': 'ARA',  // Argentine Austral (Historical)
        '₼': 'AZN',  // Azerbaijani Manat
        '₯': 'GRD',  // Greek Drachma (Historical)
        '₯': 'SIT',  // Slovenian Tolar (Historical)
        '₭': 'LAK',  // Lao Kip
        '₮': 'MNT',  // Mongolian Tugrik
        '₨': 'SCR',  // Seychellois Rupee
        '₾': 'GEL',  // Georgian Lari
        '₹': 'IRR',  // Iranian Rial
        '₵': 'GHS',  // Ghanaian Cedi
        '₩': 'KPW',  // North Korean Won
        '₴': 'BAM',  // Bosnian Convertible Mark
        '₤': 'SYP',  // Syrian Pound
        '₮': 'AFN'   // Afghan Afghani
      };
      return currencyMap[symbol];
}



module.exports = { listing_main }