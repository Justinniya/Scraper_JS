async function get_availability(page,data){ // CHECK
    let availability_enter = data.availability;
    let availability = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[5]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, availability);
    await availability.click();
    //trip lenght
    let minimum_night = await page.locator('xpath=//*[@id="pricing-and-availability-settings-trip-length-min-entrypoint"]').click();
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-min-trip-length-input"]').fill(availability_enter.minimum_night);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div/div/div/div/div/button').click();
    await page.waitForTimeout(4000);
    let maximum_night = await page.locator('xpath=//*[@id="pricing-and-availability-settings-trip-length-max-entrypoint"]').click();
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-max-trip-length-input"]').fill(availability_enter.maximum_night);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div/div/div/div/div/button').click();
    await page.waitForTimeout(4000);
    //advance notice
    let advance_notice = await page.locator('xpath=//*[@id="mys-advance-notice-input"]').selectOption({ label: availability_enter.advance_notice });
    await page.waitForTimeout(2000);
    if(availability_enter.advance_notice == "Same day"){
        let same_day = await page.locator('xpath=//*[@id="mys-sameday-advance-notice-input"]').selectOption({ label: availability_enter.same_day });
        await page.waitForTimeout(2000);
    }
    await page.waitForTimeout(3000);
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/div/div/div/div/div/button').click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(10000);
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

module.exports = get_availability;