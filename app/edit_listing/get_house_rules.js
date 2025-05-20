async function get_house_rules(page,data){
    
    // let house_rules = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[15]/div/a').elementHandle();
    // await page.evaluate((element) => {
    //     element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }, house_rules);
    // await house_rules.click();
    await page.goto('https://www.airbnb.com/hosting/listings/editor/1304752346146084328/details/house-rules');
    let petsAllowedResultText;
    let house_rules_enter = data.house_rules;
    number_of_maximum = house_rules_enter.petsAllowed;
    let value_petsAllowed = 1;

    if(!number_of_maximum || number_of_maximum != "false"){
        await page.locator('xpath=//*[@id="pets-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        let petsAllowed = await page.locator('xpath=//*[@id="num-pets-house-rules-stepper-stepper"]');
        let petsAllowedResult = await petsAllowed.textContent();
        petsAllowedResultText = petsAllowedResult.replace(/[^0-9]/g, '');
        
    
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
    else{
        await page.locator('xpath=//*[@id="pets-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    

    let value_eventsallowed = house_rules_enter.eventsallowed;
    if (value_eventsallowed == "true") {
    await page.locator('xpath=//*[@id="events-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
} else {
    await page.locator('xpath=//*[@id="events-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
}
    

    

    let value_smoking_allowed = house_rules_enter.smoking_allowed;
    if(value_smoking_allowed == "true"){
        await page.locator('xpath=//*[@id="smoking-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
    }
    else{
        await page.locator('xpath=//*[@id="smoking-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_quiet_hours = house_rules_enter.quiet_hours;

    if(value_quiet_hours){
        await page.locator('xpath=//*[@id="quiet-hours-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.locator('select[name="quietHoursStartTime"]').selectOption({label: house_rules_enter.quiet_hours.quiet_hours_start});
        await page.locator('select[name="quietHoursEndTime"]').selectOption({label: house_rules_enter.quiet_hours.quiet_hours_end});
        
    }else{
        await page.locator('xpath=//*[@id="quiet-hours-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    


    let value_commercial_photography = house_rules_enter.commercial_photography;
    if(value_commercial_photography == "true"){
        await page.locator('xpath=//*[@id="commercial-photography-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[2]/label').click();
    }else{
        await page.locator('xpath=//*[@id="commercial-photography-allowed-toggle-row-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let number_of_guest = await page.locator('xpath=//*[@id="person-capacity-house-rules-stepper-stepper"]/div/span[1]');
    let number_of_guest_result = await number_of_guest.textContent();
    let value_of_guest = house_rules_enter.number_of_guest;
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
    console.log(house_rules_enter.check_in_and_out.start_time,house_rules_enter.check_in_and_out.end_time,house_rules_enter.check_in_and_out.check_out)
    await Check_in_and_out.click();
    await page.waitForTimeout(2000);

    let start_time_value = house_rules_enter.check_in_and_out.start_time
    console.log(start_time_value);
    let start_time = await page.locator('select[id="check-in-start-time"]').selectOption({ label: start_time_value});


    let end_time_value = house_rules_enter.check_in_and_out.end_time
    if(end_time_value){
    let end_time = await page.locator('select[id="check-in-end-time"]').selectOption({ label: end_time_value});
    }

    let check_out_value = house_rules_enter.check_in_and_out.check_out
    if(check_out_value){
    let check_out = await page.locator('select[id="check-out-time"]').selectOption({ label: check_out_value});
    }
    await page.waitForTimeout(2000);
    try{
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').nth(0).click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(5000);
        

    let addtional_rules = await page.locator('xpath=//*[@id="main-panel-content"]/div[8]/div/button');
    await page.waitForTimeout(2000);
    await addtional_rules.click();
    let additional_rules_value = house_rules_enter.addtional_rules
    if(additional_rules_value){
    await page.locator('xpath=//*[@id="additional-rules-textarea"]').fill(additional_rules_value);
    }
    try{
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(10000);
    
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(5000);
}

module.exports = get_house_rules;