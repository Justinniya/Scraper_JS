const { chromium } = require('playwright');
const fs = require('fs');
const { set } = require('date-fns/set');

async function listing_main() {
    const browser = await chromium.launch({ headless: true  ,args: ['--start-maximized'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
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
    let number_of_lines = await page.locator('[data-testid="host-reservations-table-row"]').count();
    let final_listing;
    let sets = [];
    
    for(let i = 0; number_of_lines>i; i++){
        let lines = await page.locator('[data-testid="host-reservations-table-row"]').nth(i);
        let guest_name = await lines.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.b1uxatsa.atm_c8_1kw7nm4.atm_bx_1kw7nm4.atm_cd_1kw7nm4.atm_ci_1kw7nm4.atm_g3_1kw7nm4.atm_9j_tlke0l_1nos8r_uv4tnr.atm_7l_1kw7nm4_pfnrn2.atm_rd_8stvzk_pfnrn2.c1qih7tm.atm_1s_glywfm.atm_26_1j28jx2.atm_3f_idpfg4.atm_9j_tlke0l.atm_gi_idpfg4.atm_l8_idpfg4.atm_vb_1wugsn5.atm_7l_jt7fhx.atm_rd_8stvzk.atm_5j_1896hn4.atm_cs_10d11i2.atm_r3_1kw7nm4.atm_mk_h2mmj6.atm_kd_glywfm.atm_9j_13gfvf7_1o5j5ji.atm_7l_jt7fhx_v5whe7.atm_rd_8stvzk_v5whe7.atm_7l_177r58q_1nos8r_uv4tnr.atm_rd_8stvzk_1nos8r_uv4tnr.atm_7l_9vytuy_4fughm_uv4tnr.atm_rd_8stvzk_4fughm_uv4tnr.atm_rd_8stvzk_xggcrc_uv4tnr.atm_7l_1he744i_csw3t1.atm_rd_8stvzk_csw3t1.atm_3f_glywfm_jo46a5.atm_l8_idpfg4_jo46a5.atm_gi_idpfg4_jo46a5.atm_3f_glywfm_1icshfk.atm_kd_glywfm_19774hq.atm_7l_jt7fhx_1w3cfyq.atm_rd_8stvzk_1w3cfyq.atm_uc_aaiy6o_1w3cfyq.atm_70_1p56tq7_1w3cfyq.atm_uc_glywfm_1w3cfyq_1rrf6b5.atm_7l_jt7fhx_pfnrn2_1oszvuo.atm_rd_8stvzk_pfnrn2_1oszvuo.atm_uc_aaiy6o_pfnrn2_1oszvuo.atm_70_1p56tq7_pfnrn2_1oszvuo.atm_uc_glywfm_pfnrn2_1o31aam.atm_7l_9vytuy_1o5j5ji.atm_rd_8stvzk_1o5j5ji.atm_rd_8stvzk_1mj13j2.dir.dir-ltr').innerText();
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
        const uid = findUID(final_listing);
        const result = separateCurrencySymbol(price);
        sets.push({
            'guest_name':guest_name,
            'check_in':convertDateToDigits(check_in),
            'check_out': convertDateToDigits(check_out),
            'currency': result.symbol,
            'price':result.amount,
            'uuid': uid
        });
        
    
    }
    // console.log(sets);
    // await page.waitForTimeout(50000);
    
    await page.close();
    

  await response(sets);
  return sets;
    
};


async function response(sets)
{
  try {
    const response = await axios.post('http://ds2.d3.net:8069/jsonrpc', {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          'odoo_botification_dryrun',              // database name
          2,                                       // user ID
          'b81ba55cf3a383979acaea298c2da9a7659bf243', // access token or password
          'managebnb.property',                    // model
          'collect_scrape_airbnb_bookings',        // method
          sets                                     // method arguments
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

function findUID(entry) {
    const data = {
        names: [
          "A1 Chaweng Mountain View, 1th floor", "A2 Chaweng Mountain View, 1th floor",
          "A3 Chaweng Lake View, 2nd floor",     "A4 Chaweng Lake View, 2nd floor",
          "A5 Chaweng Panorama View, 3rd floor", "A6 Chaweng Panorama View, 3rd floor",
          "B1 Chaweng Mountain View, 1th floor", "B2 Chaweng Mountain View, 1th floor",
          "B3 Chaweng Lake View, 2nd floor",     "B4 Chaweng Lake View, 2nd floor",
          "B5 Chaweng Panorama View, 3rd floor", "B6 Chaweng Panorama View, 3rd floor",
          "C1 Chaweng Mountain View, 1th floor", "C2 Chaweng Mountain View, 1th floor",
          "C3 Chaweng Lake View, 2nd floor",     "C4 Chaweng Lake View, 2nd floor",
          "C5 Chaweng Panorama View, 3rd floor", "C6 Chaweng Panorama View, 3rd floor",
          "D1 Chaweng Mountain View, 1th floor", "D2 Chaweng Mountain View, 1th floor",
          "D3 Chaweng Lake View, 2nd floor",     "D4 Chaweng Lake View, 2nd floor"
        ],
        airbnb_uids: [
          "1214205284926186484", "1326436699315156206", "1217189681070539446",
          "1326425673876377173", "1217258250370046916", "1285062459552924609",
          "1217089201544101425", "1326439048034779048", "1283052734931254218",
          "1326427239457519760", "1236555571957374980", "1284522361461507064",
          "1326432967356919229", "1217089201544101425", "1326420020033729942",
          "1326429385889305030", "1284492686085392718", "1285074523204401588",
          "1326435610236794917", "753379668429308358", "1326423041028890706",
          "1326430672093829098"
        ]
      };
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