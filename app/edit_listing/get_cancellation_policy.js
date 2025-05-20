async function get_cancellation_policy(page,data){
    let cancellation_policy_enter = data.cancellation_policy;
    let cancellation_policy = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[16]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, cancellation_policy);
    await cancellation_policy.click();
    await page.waitForTimeout(2000);

    let short_term_stays = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div/div[3]/div/div/div[2]/a');
    await short_term_stays.click();
    await page.waitForTimeout(2000);
    let short_terms_choice = cancellation_policy_enter.short_term_stays.title;
    let data_choices = {
                        "Flexible": 2,
                        "Moderate": 3,
                        "Limited": 4,
                        "Firm": 5
                        }
                                
    await page.locator(`xpath=//*[@id="standard-cancellation-policy-chip-group"]/div[${data_choices[short_terms_choice]}]`).click();

    
    let non_refundable_option = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/section/div/div[4]/div/div/div[2]/button');
    let non_refundable_option_result = await non_refundable_option.getAttribute('aria-checked');
    console.log(non_refundable_option_result);
    let value_non_refundable_option = cancellation_policy_enter.short_term_stays.non_refundable_option;
    if(value_non_refundable_option != non_refundable_option_result){
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/section/div/div[4]/div/div/div[2]/button').click();
    }

    await page.waitForTimeout(2000);

    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);

    
    

    let long_term_stays = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[3]/div[3]/div/div/div[2]/a');
    await long_term_stays.click();
    await page.waitForTimeout(2000);
    let long_terms_choice = cancellation_policy_enter.long_term_stays.title;
    let data_choices1 = {
                        "Firm Long Term": 2,
                        "Strict Long Term": 3,
                        }

    await page.locator(`xpath=//*[@id="long-term-cancellation-policy-chip-group"]/div[${data_choices1[long_terms_choice]}]`).click();
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    
    await page.waitForTimeout(5000);
}

module.exports = get_cancellation_policy;