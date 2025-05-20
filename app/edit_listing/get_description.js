async function get_description(page,data){ // CHECK
    let description_enter = data.description;
    let description = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[7]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, description);
    await description.click();

    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[1]/button').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="description-input"]').fill(description_enter.listing_des);
    await page.waitForTimeout(2000);

    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }

    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[2]/button').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="description-input"]').fill(description_enter.your_property);
    
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[3]/button').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="description-input"]').fill(description_enter.guest_access);
    
    try{ 
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[4]/button').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=//*[@id="description-input"]').fill(description_enter.interaction_with_guest);
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    
    await page.waitForTimeout(1000);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[1]/div[5]/button').click();
    await page.waitForTimeout(2000); 
    await page.locator('xpath=//*[@id="description-input"]').fill(description_enter.other_details);
    
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
        await page.waitForTimeout(5000);

    
    // return {"description": {"listing_des": listing_des_result,"your_property": your_property_result,"guest_access": guest_access_result,"interaction_with_guest": interaction_with_guest_result,"other_details": other_details_result}};
}

module.exports = get_description;

