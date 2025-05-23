const { chromium } = require('playwright');
const fs = require('fs');
const { set } = require('date-fns/set');
const axios = require('axios');
const path = require('path');

async function listing_main(data) {
  // console.log(data);
    const browser = await chromium.launch({ headless: true ,args: ['--window-size=1920,1080'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',viewport: { width: 1920, height: 1080 }});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    
    try {
        const cookiePath = path.join(__dirname, 'auth', `${data.apiKey}.json`);
        
        if (fs.existsSync(cookiePath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiePath, 'utf-8'));
            await context.addCookies(cookies);
            console.log('✅ Cookies added. Running...');
        } else {
            return '⚠️ No cookie file found for this API key.';
        }
    } catch (err) {
        return '❌ Failed to load cookies:';
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
    let result1 = formatYearMonthToWords(start_year,start_month);
    await page.waitForTimeout(2000);
    await selectDateFromCalendar(page, start_day, start_month, start_year, true,result1);  

    await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div[2]/div/div[1]/div[1]/div[2]/div[1]/label/div[2]').click();
    const EndDate = data['filter_end_date'];
    const [end_year,end_month, end_day] = EndDate.split('-').map(Number);
    let result2 = formatYearMonthToWords(end_year,end_month);
    await selectDateFromCalendar(page, end_day, end_month, end_year, false,result2); 
    await page.waitForTimeout(2000);
    
    // await footer.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await page.waitForTimeout(500);
    let apply = await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/footer/button').nth(1);
    await apply.click({ force: true});
    
    await page.waitForTimeout(2000);
    
    let next = true
    let sets = [];
    let number = 1
    while(next){
      number++;
      console.log(number);
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      let number_of_lines = await page.locator('[data-testid="host-reservations-table-row"]').count();
      let final_listing;
    
    for(let i = 0; number_of_lines>i; i++){
        let lines = await page.locator('[data-testid="host-reservations-table-row"]').nth(i);
        let guest_name = await lines.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.b1uxatsa.atm_c8_1kw7nm4.atm_bx_1kw7nm4.atm_cd_1kw7nm4.atm_ci_1kw7nm4.atm_g3_1kw7nm4.atm_9j_tlke0l_1nos8r_uv4tnr.atm_7l_1kw7nm4_pfnrn2.atm_rd_8stvzk_pfnrn2.c1qih7tm.atm_1s_glywfm.atm_26_1j28jx2.atm_3f_idpfg4.atm_9j_tlke0l.atm_gi_idpfg4.atm_l8_idpfg4.atm_vb_1wugsn5.atm_7l_jt7fhx.atm_rd_8stvzk.atm_5j_1896hn4.atm_cs_10d11i2.atm_r3_1kw7nm4.atm_mk_h2mmj6.atm_kd_glywfm.atm_9j_13gfvf7_1o5j5ji.atm_7l_jt7fhx_v5whe7.atm_rd_8stvzk_v5whe7.atm_7l_177r58q_1nos8r_uv4tnr.atm_rd_8stvzk_1nos8r_uv4tnr.atm_7l_9vytuy_4fughm_uv4tnr.atm_rd_8stvzk_4fughm_uv4tnr.atm_rd_8stvzk_xggcrc_uv4tnr.atm_7l_1he744i_csw3t1.atm_rd_8stvzk_csw3t1.atm_3f_glywfm_jo46a5.atm_l8_idpfg4_jo46a5.atm_gi_idpfg4_jo46a5.atm_3f_glywfm_1icshfk.atm_kd_glywfm_19774hq.atm_7l_jt7fhx_1w3cfyq.atm_rd_8stvzk_1w3cfyq.atm_uc_aaiy6o_1w3cfyq.atm_70_1p56tq7_1w3cfyq.atm_uc_glywfm_1w3cfyq_1rrf6b5.atm_7l_jt7fhx_pfnrn2_1oszvuo.atm_rd_8stvzk_pfnrn2_1oszvuo.atm_uc_aaiy6o_pfnrn2_1oszvuo.atm_70_1p56tq7_pfnrn2_1oszvuo.atm_uc_glywfm_pfnrn2_1o31aam.atm_7l_9vytuy_1o5j5ji.atm_rd_8stvzk_1o5j5ji.atm_rd_8stvzk_1mj13j2.dir.dir-ltr').innerText();
        let check_in = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(3).textContent();
        let check_out = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(4).textContent();
        let listing = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(6).textContent();
        let price = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(8).textContent();
        let code = await lines.locator('.cw5trde.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_cs_6adqpa.atm_7l_jt7fhx.atm_40_4u5rid.atm_l8_8tjzot.atm_j3_kzqwjq.atm_lk_idpfg4_13mkcot.armbts6.atm_r3_1e5hqsa.dir.dir-ltr').nth(7).textContent();
        await page.waitForTimeout(5000);
        await lines.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.b1p20n7u.atm_9j_tlke0l.atm_9s_1o8liyq.atm_gi_idpfg4.atm_mk_h2mmj6.atm_r3_1h6ojuz.atm_rd_glywfm.atm_3f_uuagnh.atm_70_5j5alw.atm_vy_1wugsn5.atm_tl_1gw4zv3.atm_9j_13gfvf7_1o5j5ji.c1n3e6jn.atm_bx_48h72j.atm_cs_10d11i2.atm_5j_t09oo2.atm_6h_t94yts.atm_66_nqa18y.atm_kd_glywfm.atm_uc_1lizyuv.atm_r2_1j28jx2.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_jb_1yg2gu8.atm_4b_1qnzqti.atm_26_1qwqy05.atm_7l_jt7fhx.atm_l8_16nilfb.atm_uc_glywfm__1rrf6b5.atm_kd_glywfm_1w3cfyq.atm_uc_aaiy6o_1w3cfyq.atm_3f_glywfm_e4a3ld.atm_l8_idpfg4_e4a3ld.atm_gi_idpfg4_e4a3ld.atm_3f_glywfm_1r4qscq.atm_kd_glywfm_6y7yyg.atm_uc_glywfm_1w3cfyq_1rrf6b5.atm_kd_glywfm_pfnrn2_1oszvuo.atm_uc_aaiy6o_pfnrn2_1oszvuo.atm_3f_glywfm_1icshfk_1oszvuo.atm_l8_idpfg4_1icshfk_1oszvuo.atm_gi_idpfg4_1icshfk_1oszvuo.atm_3f_glywfm_b5gff8_1oszvuo.atm_kd_glywfm_2by9w9_1oszvuo.atm_uc_glywfm_pfnrn2_1o31aam.atm_tr_18md41p_csw3t1.atm_k4_kb7nvz_1o5j5ji.atm_4b_1qnzqti_1w3cfyq.atm_7l_jt7fhx_1w3cfyq.atm_70_1e7pbig_1w3cfyq.atm_4b_1qnzqti_pfnrn2_1oszvuo.atm_7l_jt7fhx_pfnrn2_1oszvuo.atm_70_1e7pbig_pfnrn2_1oszvuo.atm_4b_lb1gtz_1nos8r_uv4tnr.atm_26_zbnr2t_1nos8r_uv4tnr.atm_7l_jt7fhx_1nos8r_uv4tnr.atm_4b_1k0ymf0_4fughm_uv4tnr.atm_26_1qwqy05_4fughm_uv4tnr.atm_7l_9vytuy_4fughm_uv4tnr.atm_4b_lb1gtz_csw3t1.atm_26_zbnr2t_csw3t1.atm_7l_jt7fhx_csw3t1.atm_4b_1k0ymf0_1o5j5ji.atm_26_1qwqy05_1o5j5ji.atm_7l_9vytuy_1o5j5ji.dir.dir-ltr').click();
        await page.waitForTimeout(5000);
        final_listing = await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div/div/div/div[2]/div[1]/div[1]/div[2]').textContent();
        await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[1]/button').click();
        const uid = findUID(final_listing,data);
        const result = separateCurrencySymbol(price);
          if(uid){
          sets.push({
              'reservation_code': code,
              'guest_name':guest_name,
              'check_in':convertDateToDigits(check_in),
              'check_out': convertDateToDigits(check_out),
              'currency': result.symbol,
              'price':result.amount,
              'airbnb_uid': uid
          });    
        }

      }
      try {
          const haveNext = page.locator(`xpath=//*[@id="site-content"]/div[1]/section/footer/div/nav/div/button[${number + 1}]`);
        
          // Check if button is visible and NOT disabled
          const isVisible = await haveNext.isVisible();
          const isEnabled = await haveNext.isEnabled();

          if (isVisible && isEnabled) {
            await page.waitForTimeout(2000);
            await haveNext.click();
            console.log('next');
            // continue; // Only use this if you're inside a loop
          } else {
            // console.log('Button is disabled or not visible');
            console.log("Done");
            next = false; // If you're in a loop, this breaks it
          }

        } catch (e) {
          next = false;
        }
      }
    // console.log(sets);
    // await page.waitForTimeout(50000);
    const cookies = await context.cookies();
    await page.waitForTimeout(2000);
    fs.unlinkSync('airbnb_listing.json');
    await page.waitForTimeout(2000);
    fs.writeFileSync('airbnb_listing.json', JSON.stringify(cookies, null, 2));
    await page.waitForTimeout(5000);
    await page.close();
    let finaL_response = await response(sets);
    // console.log(sets);
    return finaL_response;
};

async function selectDateFromCalendar(page, day, month, year, isStartDate = true,year_and_date) {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  let final_date = await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div/div/div/div[2]/div[2]/div/div[2]/div/div/div/h3').textContent();
  while(true){
    try{
    
      const dateSelector = `[data-testid="calendar-day-${mm}/${dd}/${year}"]`;

      const dateInputSelector = isStartDate
        ? '[data-testid="toolbar_filter_startdate_input"]'
        : '[data-testid="toolbar_filter_enddate_input"]';
      await page.click(dateInputSelector);

    // Wait for the date to appear in the calendar
      await page.waitForSelector(dateSelector);

      // Click the date
      await page.click(dateSelector);
      break;
  }catch{
    if(isFirstBeforeSecond(final_date,year_and_date)){
      await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div/div/div/div[2]/div[1]/div[2]/button').click();
    }else{
      await page.locator('xpath=/html/body/div[9]/div/div/section/div/div/div[2]/div/div[2]/div[2]/div/div[2]/div/div/div/div[2]/div[1]/div[1]/button').click();
    }
    
    }
  }
  

  // Click on the date input field to open the calendar
  
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

    return {'Result': response.data};
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

function parseMonthYear(str) {
  return new Date(str); // JavaScript can parse "May 2025" directly
}

function isFirstBeforeSecond(dateStr1, dateStr2) {
  const d1 = parseMonthYear(dateStr1);
  const d2 = parseMonthYear(dateStr2);
  return d1 < d2;
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

function formatYearMonthToWords(year,month) {
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}



module.exports = { listing_main }