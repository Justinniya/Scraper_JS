async function get_booking_setting(page,data){
    let booking_enter = data.booking_setting;
    let booking_setting = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[13]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, booking_setting);
    await booking_setting.click();
    await page.waitForTimeout(2000);
    if(booking_enter.title == "Use Instant Book"){
        let useInstantBook = await page.locator('xpath=//*[@id="booking-settings-chip-group"]/label[1]').click();
        let trackRecordSwitch = await page.locator('#switch-switch-row-trailing-unpadded-variation-default');
        let trackRecordChecked = await trackRecordSwitch.getAttribute('aria-checked');

        if(trackRecordChecked != booking_enter.require_a_good_track_record){
            await page.locator('xpath=//*[@id="switch-switch-row-trailing-unpadded-variation-default"]').click();
        }

        let customMsgSection = await page.locator('xpath=//*[@id="booking-settings-chip-group"]/label[1]/div[2]/div/div[3]/button');
        await customMsgSection.click();
        await page.waitForTimeout(2000);
        await page.locator('xpath=//*[@id="welcome-message-textarea"]').fill(booking_enter.pre_booking_message);
        try{
            await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        }
        catch(e){
            console.log("no changes");
        }
    }
    else{
        await page.locator('xpath=//*[@id="booking-settings-chip-group"]/label[2]').click();
        await page.waitForTimeout(2000);
        try{
            await page.locator("xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]").click();
        }
        catch(e){
            console.log("no changes");
        }
        }

    await page.waitForTimeout(2000);
    try{
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
    }catch(e){
            console.log("no changes");
        }

    await page.waitForTimeout(5000);
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

module.exports = get_booking_setting;