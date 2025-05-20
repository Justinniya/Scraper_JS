const { chromium } = require('playwright');
const  path  = require('path');
const fs = require('fs');
const { tr } = require('date-fns/locale');



async function get_title(page){  // CHECK
    const click_title = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[2]/div/a').elementHandle();
    await click_title.click();
    await page.waitForTimeout(2000);
    let title = await page.locator('xpath=//*[@id="listing-title-en-textarea"]');
    await title.fill("Justinniya");
    await page.waitForTimeout(10000);
}


async function get_property_type(page){ // CHECK
    const click_first = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[3]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, click_first);
    await click_first.click();
    await page.waitForTimeout(2000);
    let most_like = await page.locator('xpath=//*[@id="propertyTypeGroup"]');
    await most_like.selectOption('HOUSES');
    await page.waitForTimeout(1000);
    let property_type = await page.locator('xpath=//*[@id="propertyType"]');
    await property_type.selectOption('HOUSE');
    await page.waitForTimeout(1000);
    let listing_type = await page.locator('//*[@id="roomType"]');
    await listing_type.selectOption('PRIVATE_ROOM');
    await page.waitForTimeout(1000);
    for(let i = 1; i<10;i++){
        let floors = await page.locator('xpath=//*[@id="property-type-totalFloors-stepper-stepper"]/button[2]').click();
    }
    for(let i = 1; i<10;i++){
        let flors = await page.locator('xpath=//*[@id="property-type-floorNumber-stepper-stepper"]/button[2]').click();
    }
    let year_built = await page.locator('input[name="yearBuilt"]').fill('2004');
    let property_size = await page.locator('input[name="propertySize"]').fill('2004');;
    let propertySizeUnits = await page.locator('select[name="propertySizeUnits"]').selectOption('SQUARE_METERS');
    // console.log("get_property_type done");
    // return {"property_type":{"propertyTypeGroup": most_like_result.trim(),"property_type": property_type_result.trim(), "listing_type": listing_type_result.trim(),"floors_in_the_building" : floors,"floor_is_listing_on":flors,"year_built":year_built,"property_size":property_size,"propertySizeUnits":propertySizeUnits}};
    await page.waitForTimeout(2000);
    let save = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
}


async function get_pricing(page){ // CHECK
    let pricing = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[4]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, pricing);
    await pricing.click();
    await page.waitForTimeout(2000);
    let smart_pricing = await page.locator('xpath=//*[@id="pricing-and-availability-settings-sbui.pricing.smart-pricing-switch"]');
    let smart_pricing_result = await smart_pricing.getAttribute('aria-checked');
    let price = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/a').click();
    await page.waitForTimeout(4000);
    await page.locator('xpath=//*[@id="PriceInput-basePrice"]').fill('4000');
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
    await page.waitForTimeout(4000);
    let weekend_price;
    try{
        weekend_price = await page.locator('xpath=//*[@id="pricing-and-availability-settings-rates-weekend-entrypoint"]').click();
        await page.locator('xpath=//*[@id="PriceInput-basePrice"]').fill('2100');
    }catch(error){
        weekend_price = "no detail";
    }
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
    await page.waitForTimeout(4000);
    await page.waitForTimeout(5000);
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-weekly-discount-entrypoint"]').click();
    let weekly_discount = page.locator('input[data-testid="weeklyDiscount-discount-slider-input"]');
    await weekly_discount.focus();
    for (let i = 0; i < 4; i++) {
        await page.keyboard.press('ArrowRight'); // or 'ArrowLeft'
    }
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
    await page.waitForTimeout(4000);
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-monthly-discount-entrypoint"]').click();
    let weekly_discount_average = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/section/div[2]/div/div/div[2]/div[2]/div/div[1]/div/input');
    await weekly_discount_average.focus();
    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight'); // or 'ArrowLeft'
    }                           
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
    await page.waitForTimeout(4000);

    await page.waitForTimeout(5000);

    return {"pricing": {"smart_pricing":smart_pricing_result,"price":price,"weekend_price":weekend_price,"weekly_discount":weekly_discount,"weekly_discount_average":weekly_final,"month_discount":month_discount,"month_discount_average":month_final}};
}


async function get_availability(page){ // CHECK
    let availability = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[5]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, availability);
    await availability.click();
    //trip lenght
    let minimum_night = await page.locator('xpath=//*[@id="pricing-and-availability-settings-trip-length-min-entrypoint"]').click();
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-min-trip-length-input"]').fill('4');
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div/div/div/div/div/button').click();
    await page.waitForTimeout(4000);
    let maximum_night = await page.locator('xpath=//*[@id="pricing-and-availability-settings-trip-length-max-entrypoint"]').click();
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-max-trip-length-input"]').fill('10');
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div/div/div/div/div/button').click();
    await page.waitForTimeout(4000);
    //advance notice
    let advance_notice = await page.locator('xpath=//*[@id="mys-advance-notice-input"]').selectOption('48');
    await page.waitForTimeout(3000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/footer/div/div[2]/div/div/div/div/div/button').click();
    await page.waitForTimeout(3000);
    // let advance_notice_check = await advance_notice.locator('option:checked');
    // await page.waitForTimeout(2000);
    // let save = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
    // let advance_notice_result = await advance_notice_check.textContent();
    // let same_day_result = "false";
    // if (advance_notice_result == "Same day"){
    //     let same_day = await page.locator('xpath=//*[@id="mys-sameday-advance-notice-input"]');
    //     let same_day_check = await same_day.locator('option:checked');
    //     same_day_result = await same_day_check.textContent();
    // }
    // let request_less_then_1_day_result;
    // try{
    //     let request_less_then_1_day = await page.locator('//*[@id="pricing-and-availability-settings-advance-notice-rtb-switch"]');
    //     request_less_then_1_day_result = await request_less_then_1_day.getAttribute('aria-checked');
    // }catch{
    //     request_less_then_1_day_result = "false";
    // }
    // return {"availability": {"minimum_night": minimum_night,"maximum_night": maximum_night,"advance_notice": advance_notice_result,"same_day": same_day_result,"request_less_then_1_day":request_less_then_1_day_result}};
}


async function get_number_of_guest(page){ // CHECK
    let number_of_guest = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[6]/div/a');
    await number_of_guest.click();
    await page.waitForTimeout(4000);
    let number_guest = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div/div/div[3]/div/div/input');
    let result = await number_guest.inputValue();
    let int_result = Number(result);
    let number = 2;

    if(int_result > number){
        let final_result = int_result - number;
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div/div/div[3]/div/button[1]').click();
        }
    }
    if(number>int_result){
        let final_result = number - int_result;
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div/div/div[3]/div/button[2]').click();
        }
    }
    else{
        console.log('same');
    }
    await page.waitForTimeout(2000);
    // return {"guest": {"guest_count": result}};
}

async function get_description(page){ // CHECK
    let description = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[7]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, description);
    await description.click();

    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[1]/button').click();
    await page.waitForTimeout(2000);
    let listing_des_result = await page.locator('xpath=//*[@id="description-input"]').fill('1');
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[2]/button').click();
    await page.waitForTimeout(2000);
    let your_property_result = await page.locator('xpath=//*[@id="description-input"]').fill('2');
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[3]/button').click();
    await page.waitForTimeout(2000);
    let guest_access_result = await page.locator('xpath=//*[@id="description-input"]').fill('3');
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[4]/button').click();
    await page.waitForTimeout(2000);
    let interaction_with_guest_result = await page.locator('xpath=//*[@id="description-input"]').fill('4');
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[5]/button').click();
    await page.waitForTimeout(2000); 
    let other_details_result = await page.locator('xpath=//*[@id="description-input"]').fill('5');
    await page.waitForTimeout(1000);

    
    // return {"description": {"listing_des": listing_des_result,"your_property": your_property_result,"guest_access": guest_access_result,"interaction_with_guest": interaction_with_guest_result,"other_details": other_details_result}};
}
async function get_amenities(page){
    let amenities = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[9]/div/a').elementHandle();
    await page.waitForTimeout(2000);
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, amenities);
    await amenities.click();
    await page.waitForTimeout(2000);
    let list_of_amenities = []
    let bodyOfamenities = await page.locator('.crxq8ue.dir.dir-ltr');
    let amenitiess = await bodyOfamenities.locator('.twad414.dir.dir-ltr').count();
    // console.log("amenities count", amenitiess);
    for (let i = 0; i < amenitiess; i++) {
        let amenities_result = await bodyOfamenities.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        await bodyOfamenities.evaluate((element) => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, amenities_result);
        let amenities_result_text = await amenities_result.textContent();
        let final_amenities_result_text = amenities_result_text.replace(/\s+/g, '_');
        // console.log(final_amenities_result_text);
        list_of_amenities.push(final_amenities_result_text);
    }
    try {
        let data = await fs.readFileSync('amenities.json', { encoding: 'utf8' });
        let amenities = JSON.parse(data);

        
        let result = { ...amenities };

        list_of_amenities.forEach(item => {
            result[item] = true;
        });

        return { amenities: result };
    } catch (err) {
        console.error('Failed to read amenities.json:', err);
        return { error: 'Could not load amenities.json' };
    }
    

    // async function get_amenities(page){
    //     let amenities = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[9]/div/a').elementHandle();
    //     await page.waitForTimeout(2000);
    //     await page.evaluate((element) => {
    //         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }, amenities);
    //     await amenities.click();
    //     await page.waitForTimeout(2000);
    //     let list_of_amenities = []
        
    //     let amenitiess = await page.locator('.twad414.dir.dir-ltr').count();
    //     console.log("amenities count", amenitiess);
    //     let amenities2_result_text = "";
    //     for (let i = 8; i < amenitiess; i++) {
    //         let amenities_result = await page.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
    //         let amenities_result_text = await amenities_result.textContent();
    //         try{
    //             let amenities2_result = await page.locator('.s9gst5p.dir.dir-ltr').nth(i-8).elementHandle();
    //             amenities2_result_text = await amenities2_result.textContent();
    //             list_of_amenities.push(`${amenities_result_text} : ${amenities2_result_text}`);
    //         }
    //         catch(error){
    //             list_of_amenities.push(amenities_result_text);
    //         }
    //         console.log("amenities result", list_of_amenities);
    //     }
    //     return {"amenities": {'list': list_of_amenities}};
    // }
}
async function get_accessibility(page){
    let accessibility = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[10]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, accessibility);
    // await accessibility.click();

}
async function get_location(page){
    let location = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[10]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, location);
    await page.waitForTimeout(5000);
    await location.click();
    await page.waitForTimeout(5000);
    let bodyOfLocation = await page.locator('.b1wc4zxq.dir.dir-ltr');
    let address =  await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(0).elementHandle();
    await address.click();
    
    let unit_level = await page.locator('input[name="APT"]').fill('1');
    let building_name = await page.locator('input[name="ADDITIONALINFO"]').fill('1');
    let street_address = await page.locator('xpath=//*[@id="STREET"]').fill('1');
    let brgy_district = await page.locator('input[name="DISTRICT"]').fill('1');
    let city_municipality = await page.locator('input[name="CITY"]').fill('1');
    let postal_code = await page.locator('input[name="ZIPCODE"]').fill('1');
    let province = await page.locator('input[name="STATE"]').fill('1');

    let location_sharing = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(1);
    await page.waitForTimeout(5000);
    await location_sharing.click({ force: true });
    let location_sharing_result = []
    let bodyOfSpecific = await page.locator('.c5bpt99.dir.dir-ltr');
    // await page.screenshot({ path: 'screenshot.png', fullPage: true });
    let specific_location = await bodyOfSpecific.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[1]/div[2]/button');
    await page.waitForTimeout(5000);
    let specific_location_result = await specific_location.getAttribute('aria-checked');

    if(specific_location_result){
        console.log("clicking...");
        await specific_location.click();
    }
    await page.waitForTimeout(5000);
    location_sharing_result.push({"specific_location": specific_location_result});
    let address_for_cancellation = await bodyOfSpecific.locator('xpath=//*[@id="switch-address-privacy-for-cancellations-switch-row-id"]');
    let address_for_cancellation_result = await address_for_cancellation.getAttribute('aria-checked');
    location_sharing_result.push({"address_for_cancellation": address_for_cancellation_result});

    if(address_for_cancellation_result == "false"){
        console.log("clicking...");
        await address_for_cancellation.click();
    }

    await page.waitForTimeout(5000);
    // let location_sharing_result_final = Object.assign({}, ...location_sharing_result);

    let location_feature = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(2).elementHandle();
    await location_feature.click();
    await page.waitForTimeout(5000);
    let bodyOffeatures = await page.locator('.b1sjcma8.dir.dir-ltr');
    let loopfor  = await bodyOffeatures.locator('.twad414.dir.dir-ltr').count();
    // console.log(loopfor);
    let location_feature_result = [];
    for (let i = 0; i < loopfor; i++) {
        let location_feature_result_text = await bodyOffeatures.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await bodyOffeatures.locator('.canm9xs').nth(i).elementHandle();
        let result = await trueOrfalse.getAttribute('aria-checked');
        await trueOrfalse.click();
        // location_feature_result.push({[(await location_feature_result_text.textContent()).replace(/\s+/g, '_')]: result});
    }
    // let location_feature_result_final = Object.assign({}, ...location_feature_result);

    await page.waitForTimeout(5000);
    let neighnorhood = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(3).elementHandle();
    await page.waitForTimeout(5000);
    await neighnorhood.click();
    let neighnorhood_result = await page.locator('xpath=//*[@id="description-input"]').fill('1');

    
    let scenic_view = await bodyOfLocation.locator('xpath=//*[@id="listing-location-scenic-views-row"]/div/div/button').elementHandle();
    await page.waitForTimeout(5000);
    await scenic_view.click({ force: true });
    let scenic_view_body = await page.locator('.b1sjcma8.atm_am_kb7nvz.atm_lk_jxfa6r.atm_ll_jxfa6r.dir.dir-ltr');
    let loopfor2  = await scenic_view_body.locator('.rten07p.atm_5j_t94yts.c1xmq7ds.atm_lo_exct8b.atm_le_exct8b.dir.dir-ltr').count();
    console.log(loopfor2)
    for (let i = 0; i < loopfor2; i++) {
        // let scenic_view_result_text = await scenic_view_body.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await scenic_view_body.locator('.rten07p.atm_5j_t94yts.c1xmq7ds.atm_lo_exct8b.atm_le_exct8b.dir.dir-ltr').nth(i);
        await trueOrfalse.click();
        console.log("clicking...");
        // scenic_view_result.push({[(await scenic_view_result_text.textContent()).replace(/\s+/g, '_')]: trueOrfalse});
    }
    // let scenic_view_result_text_final = Object.assign({}, ...scenic_view_result);
    await page.waitForTimeout(5000);

    let getting_around = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(4).elementHandle();
    await page.waitForTimeout(5000);
    await getting_around.click();
    let getting_around_result = await page.locator('xpath=//*[@id="description-input"]').fill('1');

    

    await page.waitForTimeout(2000);

    // return {"location": {"address_result":address_result,"location_sharing": location_sharing_result_final,"location_feature": location_feature_result_final,"neighnorhood": neighnorhood_result,"getting_around": getting_around_result,"scenic_view": scenic_view_result_text_final}};

}
// async function get_about_host(page){
//     let about_host = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[12]/div/a').elementHandle();
//     await page.evaluate((element) => {
//         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }, about_host);
//     return {"about_host": 'result'};
// }
// async function get_co_host(page){
//     let co_host = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[13]/div/a').elementHandle();
//     await page.evaluate((element) => {
//         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }, co_host);
//     return {"co_host": 'result'};
// }


async function get_booking_setting(page){
    let booking_setting = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[13]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, booking_setting);
    await booking_setting.click();
    await page.waitForTimeout(2000);
    let useInstantBook = await page.locator('xpath=//*[@id="booking-settings-chip-group"]/label[1]');

    await useInstantBook.click();
    await page.waitForTimeout(2000);
    // let useInstantBook = await checkedRadio.locator('xpath=ancestor::label').innerText();

    // if (useInstantBook.includes('Use Instant Book')) {
    //     let title = "Use Instant Book"

    //     let trackRecordSwitch = await page.locator('#switch-switch-row-trailing-unpadded-variation-default');
    //     let trackRecordChecked = await trackRecordSwitch.getAttribute('aria-checked');

    //     let customMsgSection = await page.locator('xpath=//*[@id="booking-settings-chip-group"]/label[1]/div[2]/div/div[3]/button');
    //     await customMsgSection.click();
    //     await page.waitForTimeout(2000);
    //     let customMsgText = await page.locator('xpath=//*[@id="welcome-message-textarea"]');
    //     let customMsgTextValue = await customMsgText.textContent();
    //     return {"booking_setting": {"title": title, "trackRecordChecked": trackRecordChecked, "customMsgTextValue": customMsgTextValue}};
    // }
    // else if (useInstantBook.includes('Approve your first 5 bookings')) {
    //     let title = "Approve your first 5 bookings"
    //     return {"booking_setting": {"title": title}};
    // }
    // else{
    //     let title = "Approve all bookings"
    //     return {"booking_setting": {"title": title}};
    // }
}

async function get_house_rules(page){
    
    // let house_rules = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[15]/div/a').elementHandle();
    // await page.evaluate((element) => {
    //     element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }, house_rules);
    // await house_rules.click();
    await page.goto('https://www.airbnb.com/hosting/listings/editor/1304752346146084328/details/house-rules');
    let petsAllowedResultText;
    let value_petsAllowed = 1;

    if(!value_petsAllowed){
        await page.locator('xpath=//*[@id="pets-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    else{
        await page.locator('xpath=//*[@id="pets-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        let petsAllowed = await page.locator('xpath=//*[@id="num-pets-house-rules-stepper-stepper"]');
        let petsAllowedResult = await petsAllowed.textContent();
        petsAllowedResultText = petsAllowedResult.replace(/[^0-9]/g, '');
        
    number_of_maximum = 5;
    if(Number(petsAllowedResultText) > 10){
        let final_result = Number(petsAllowedResultText) - number_of_maximum;
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="num-pets-house-rules-stepper-stepper"]/button[1]').click();
        }
    }
    else{
        let final_result = Number(number_of_maximum) - Number(petsAllowedResultText);
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="num-pets-house-rules-stepper-stepper"]/button[2]').click();
        }
    }
    }
    

    let value_eventsallowed = 1
    if (value_eventsallowed === 1) {
    await page.locator('xpath=//*[@id="events-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
} else {
    await page.locator('xpath=//*[@id="events-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
}
    

    

    let value_smoking_allowed = 0;
    if(value_smoking_allowed === 1){
        await page.locator('xpath=//*[@id="smoking-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
    }
    else{
        await page.locator('xpath=//*[@id="smoking-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    

    let date = {
  "12:00 AM": "0",
  "1:00 AM": "1",
  "2:00 AM": "2",
  "3:00 AM": "3",
  "4:00 AM": "4",
  "5:00 AM": "5",
  "6:00 AM": "6",
  "7:00 AM": "7",
  "8:00 AM": "8",
  "9:00 AM": "9",
  "10:00 AM": "10",
  "11:00 AM": "11",
  "12:00 PM": "12",
  "1:00 PM": "13",
  "2:00 PM": "14",
  "3:00 PM": "15",
  "4:00 PM": "16",
  "5:00 PM": "17",
  "6:00 PM": "18",
  "7:00 PM": "19",
  "8:00 PM": "20",
  "9:00 PM": "21",
  "10:00 PM": "22",
  "11:00 PM": "23"
}
    let value_quiet_hours = 0;

    if(value_quiet_hours === 1){
        await page.locator('xpath=//*[@id="quiet-hours-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.locator('select[name="quietHoursStartTime"]').selectOption(date['2:00 AM']);
        await page.locator('select[name="quietHoursEndTime"]').selectOption(date['9:00 AM']);
        
    }else{
        await page.locator('xpath=//*[@id="quiet-hours-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    


    let value_commercial_photography = 0;
    if(value_commercial_photography === 1){
        await page.locator('xpath=//*[@id="commercial-photography-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
    }else{
        await page.locator('xpath=//*[@id="commercial-photography-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let number_of_guest = await page.locator('xpath=//*[@id="person-capacity-house-rules-stepper-stepper"]/div/span[1]');
    let number_of_guest_result = await number_of_guest.textContent();
    let value_of_guest = 5;
    if(number_of_guest_result > value_of_guest){
        let final_result = Number(number_of_guest_result) - Number(value_of_guest);
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="person-capacity-house-rules-stepper-stepper"]/button[1]').click();
        }
    }
    else{
        let final_result =  Number(value_of_guest) - Number(number_of_guest_result);
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="person-capacity-house-rules-stepper-stepper"]/button[2]').click();
        }
    }



    let Check_in_and_out = await page.locator('xpath=//*[@id="main-panel-content"]/div[7]/div/button');
    
    await Check_in_and_out.click();
    await page.waitForTimeout(2000);
    let start_time_json = {
                            "Flexible": "-1",
                            "8:00 AM": "8",
                            "9:00 AM": "9",
                            "10:00 AM": "10",
                            "11:00 AM": "11",
                            "12:00 PM": "12",
                            "1:00 PM": "13",
                            "2:00 PM": "14",
                            "3:00 PM": "15",
                            "4:00 PM": "16",
                            "5:00 PM": "17",
                            "6:00 PM": "18",
                            "7:00 PM": "19",
                            "8:00 PM": "20",
                            "9:00 PM": "21",
                            "10:00 PM": "22",
                            "11:00 PM": "23"
                            }
    let start_time = await page.locator('select[id="check-in-start-time"]').selectOption(start_time_json['2:00 PM']);

    let end_time_json = {
                            "Flexible": "-1",
                            "5:00 PM": "17",
                            "6:00 PM": "18",
                            "7:00 PM": "19",
                            "8:00 PM": "20",
                            "9:00 PM": "21",
                            "10:00 PM": "22",
                            "11:00 PM": "23",
                            "12:00 AM": "24",
                            "1:00 AM (next day)": "25",
                            "2:00 AM (next day)": "26"
                            }
    let end_time = await page.locator('select[id="check-in-end-time"]').selectOption(end_time_json['9:00 PM']);


    let check_out_json = {
                            "12:00 AM": "0",
                            "1:00 AM": "1",
                            "2:00 AM": "2",
                            "3:00 AM": "3",
                            "4:00 AM": "4",
                            "5:00 AM": "5",
                            "6:00 AM": "6",
                            "7:00 AM": "7",
                            "8:00 AM": "8",
                            "9:00 AM": "9",
                            "10:00 AM": "10",
                            "11:00 AM": "11",
                            "12:00 PM": "12",
                            "1:00 PM": "13",
                            "2:00 PM": "14",
                            "3:00 PM": "15",
                            "4:00 PM": "16",
                            "5:00 PM": "17",
                            "6:00 PM": "18",
                            "7:00 PM": "19",
                            "8:00 PM": "20",
                            "9:00 PM": "21",
                            "10:00 PM": "22",
                            "11:00 PM": "23"
                            }


    let check_out = await page.locator('select[id="check-out-time"]').selectOption(check_out_json['12:00 PM']);

    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    await page.waitForTimeout(5000);
        

    let addtional_rules = await page.locator('xpath=//*[@id="main-panel-content"]/div[8]/div/button');
    await page.waitForTimeout(2000);
    await addtional_rules.click();
    await page.locator('xpath=//*[@id="additional-rules-textarea"]').fill('1');

    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    await page.waitForTimeout(5000);
    await page.waitForTimeout(20000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
}
async function get_guest_safety(page){
    let guest_safety = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[15]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, guest_safety);
    await guest_safety.click();
    let safety_considerations = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[1]/button');
    await page.waitForTimeout(2000);
    await safety_considerations.click();
    await page.waitForTimeout(2000);

    let safety_considerations_list = []

    let value_not_a_good_fit_for_children_2_12 = 1;

    if(value_not_a_good_fit_for_children_2_12){//CHECK
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_CHILDREN_ALLOWED-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        let button;
        try{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/div/div[2]/div/div/button').click();
            button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_CHILDREN_ALLOWED-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_not_a_good_fit_for_infats_under_2 = 1;

    if(value_not_a_good_fit_for_infats_under_2){//CHECK
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_INFANTS_ALLOWED-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_INFANTS_ALLOWED-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Pool_or_hot_tub_doesnt_have_a_gate_or_lock = 1;

    if(value_Pool_or_hot_tub_doesnt_have_a_gate_or_lock){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_POOL_OR_JACUZZI_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_POOL_OR_JACUZZI_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }






    let value_nearby_water_like_lake_or_river = 1;
    if(value_nearby_water_like_lake_or_river){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_LAKE_OR_RIVER_OR_WATER_BODY-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_LAKE_OR_RIVER_OR_WATER_BODY-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_climbing_or_play_result = 1;
    if(value_climbing_or_play_result){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_CLIMBING_OR_PLAY_STRUCTURE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_CLIMBING_OR_PLAY_STRUCTURE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_heights_without_rails_or_protection = 1;
    if(value_heights_without_rails_or_protection){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_HEIGHTS_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_HEIGHTS_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    
    let value_potential_dangerous_animals_on_the_property = 1;
    if(value_potential_dangerous_animals_on_the_property){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_ANIMALS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_ANIMALS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

        


    let safety_devices = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/button');
    await page.waitForTimeout(2000);
    await safety_devices.click();


    let value_Exterior_security_camera_present = 1;
    if(value_Exterior_security_camera_present){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_SURVEILLANCE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(2000);
        await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
        await page.waitForTimeout(2000);
        await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_SURVEILLANCE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    


    let value_Noise_decibel_monitor_present = 1;
    if(value_Noise_decibel_monitor_present){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_NOISE_MONITOR-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_NOISE_MONITOR-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Carbon_monoxide_alarm = 1;
    if(value_Carbon_monoxide_alarm){//CHECK
        await page.locator('xpath=//*[@id="AMENITY_CARBON_MONOXIDE_DETECTOR-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="AMENITY_CARBON_MONOXIDE_DETECTOR-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    


    let value_Smoke_alarm = 1;
    if(value_Smoke_alarm){//CHECK
        await page.locator('xpath=//*[@id="AMENITY_SMOKE_DETECTOR-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="AMENITY_SMOKE_DETECTOR-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let propert_info = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[3]/button');
    await page.waitForTimeout(2000);
    await propert_info.click();

    let propert_info_list = []


    let value_Guests_must_climb_stairs = 1;
    if(value_Guests_must_climb_stairs){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_REQUIRES_STAIRS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_REQUIRES_STAIRS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Potential_noise_during_stays = 1;
    if(value_Potential_noise_during_stays){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_POTENTIAL_NOISE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_POTENTIAL_NOISE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_Pet_live_at_the_property = 1;
    if(value_Pet_live_at_the_property){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_HAS_PETS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_HAS_PETS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    
    let value_No_parking_on_the_property = 1;
    if(value_No_parking_on_the_property){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_PARKING-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_PARKING-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_Property_has_shared_spaces = 1;
    if(value_Property_has_shared_spaces){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_SHARED_SPACES-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_SHARED_SPACES-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_Limited_essential_amenities = 1;
    if(value_Limited_essential_amenities){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_AMENITIES-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_AMENITIES-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Weapon_on_the_property = 1;
    if(value_Weapon_on_the_property){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_WEAPONS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill('Children are not allowed.')
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_WEAPONS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }



}


async function get_cancellation_policy(page){
    let cancellation_policy = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[16]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, cancellation_policy);
    await cancellation_policy.click();
    await page.waitForTimeout(2000);

    let short_term_stays = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div/div[3]/div/div/div[2]/a');
    await short_term_stays.click();
    await page.waitForTimeout(2000);
    let short_terms_choice = "Flexible";
    let data_choices = {
                        "Flexible": 2,
                        "Moderate": 3,
                        "Strict": 4,
                        "Firm": 5
                        }
                                
    await page.locator(`xpath=//*[@id="standard-cancellation-policy-chip-group"]/div[${data_choices[short_terms_choice]}]`).click();

    let non_refundable_option = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/section/div/div[4]/div/div/div[2]/button');
    let non_refundable_option_result = await non_refundable_option.getAttribute('aria-checked');
    console.log(non_refundable_option_result);
    let value_non_refundable_option = false;
    if(value_non_refundable_option != non_refundable_option_result){
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/section/div/div[4]/div/div/div[2]/button').click();
    }
    

    let long_term_stays = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/div/div/div[2]/a');
    await long_term_stays.click();
    await page.waitForTimeout(2000);
    let long_terms_choice = "Strict Long Term";
    let data_choices1 = {
                        "Firm Long Term": 2,
                        "Strict Long Term": 3,
                        }

    await page.locator(`xpath=//*[@id="long-term-cancellation-policy-chip-group"]/div[${data_choices1[long_terms_choice]}]`).click();

       
}



async function get_custom_link(page){
    let custom_link = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[17]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, custom_link);
    await custom_link.click();
    await page.waitForTimeout(2000);
     await page.getByTestId('custom-link-textarea').fill('airbnb.com/h/Children are not allowed.')
    /// to be continue
    await page.waitForTimeout(2000);
}

async function scraper_main(functionName,url){
    // let scraper = [
    //     'get_title', 'get_property_type', 'get_pricing','get_availability','get_number_of_guest', 
    //      'get_description', 'get_amenities', 
    //     'get_location', 'get_booking_setting', 
    //     'get_house_rules', 'get_guest_safety','get_cancellation_policy', 'get_custom_link'
    // ]
    // get_cancellation_policy
    // let scraper = [ 'get_custom_link'    ]
    let results = await Promise.all(functionName.map(fn => main(fn,url)));
    let result_final = Object.assign({}, ...results);
    fs.writeFileSync('airbnb_output.json', JSON.stringify(result_final, null, 2));
    return {"Result":result_final};
}

async function main(functionKey,url){
    try{
    const functionName = {
        'get_title': get_title,
        'get_property_type': get_property_type,
        'get_pricing': get_pricing,
        'get_number_of_guest': get_number_of_guest,
        'get_availability': get_availability,
        'get_description': get_description,
        'get_amenities': get_amenities,
        'get_accessibility': get_accessibility,
        'get_location': get_location,
        // 'get_about_host': get_about_host,
        // 'get_co_host': get_co_host,
        'get_booking_setting': get_booking_setting,
        'get_house_rules': get_house_rules,
        'get_guest_safety': get_guest_safety,
        'get_cancellation_policy': get_cancellation_policy,
        'get_custom_link': get_custom_link
    }
    const browser = await chromium.launch({ headless: false ,args: ['--window-size=1920,1080','--no-sandbox'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});//viewport: { width: 1920, height: 8080 }
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    await page.goto(`https://www.airbnb.com/hosting/listings/editor/${url}`);
    await page.waitForTimeout(10000);
    // await page.waitForSelector('body', { state: 'visible' });
    // let screenshot_path = `airbnb_screenshot/${functionKey}.png`;
    // await page.screenshot({ path:screenshot_path , fullPage: true })
    if(await page.url() == 'https://www.airbnb.com/hosting/listings'){
        return {'error':`invalid listing id`};
    }else{
    const functionGet = functionName[functionKey];
    const result = await functionGet(page);
    browser.close();
    console.log(`browser ${functionKey} finish`);
    return result;
    }
}
    catch(error){
        console.log('error at ', functionKey);
        console.log(error);

    }
    
}


// module.exports = { scraper_main };

scraper_main(['get_custom_link'],'1304752346146084328')
// 'get_title','get_property_type','get_availability','get_number_of_guest','get_description','get_location','get_house_rules','get_guest_safety','get_cancellation_policy','get_custom_link'