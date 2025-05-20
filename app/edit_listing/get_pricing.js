async function get_pricing(page,data){ // CHECK
    let pricing_enter = data.pricing;
    let pricing = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[4]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, pricing);
    await pricing.click();
    await page.waitForTimeout(2000);
    let smart_pricing = await page.locator('xpath=//*[@id="pricing-and-availability-settings-sbui.pricing.smart-pricing-switch"]');
    let smart_pricing_result = await smart_pricing.getAttribute('aria-checked');
    let smart_pricing_button = pricing_enter.smart_pricing;

    if(smart_pricing_result == 'false' && smart_pricing_button == 'true'){
        await page.locator('xpath=//*[@id="pricing-and-availability-settings-sbui.pricing.smart-pricing-switch"]').click();
        await page.waitForTimeout(2000);
        await page.locator('xpath=//*[@id="pricing-and-availability-settings-smart-pricing-input-min-price"]').fill('2000');
        await page.locator('xpath=//*[@id="pricing-and-availability-settings-smart-pricing-input-max-price"]').fill('5000');
        try{
            await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
        }catch(e){
            console.log("no changes");
        }
    }
    else if(smart_pricing_result == 'true' && smart_pricing_button == 'false'){
        await page.locator('xpath=//*[@id="pricing-and-availability-settings-sbui.pricing.smart-pricing-switch"]').click();
        await page.waitForTimeout(2000);
        let price = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/a').click();
        await page.waitForTimeout(4000);
        await page.locator('xpath=//*[@id="PriceInput-basePrice"]').fill(pricing_enter.price);
        try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
        }catch(e){
            console.log("no changes");
        }
        await page.waitForTimeout(4000);
        let weekend_price;
        try{
            weekend_price = await page.locator('xpath=//*[@id="pricing-and-availability-settings-rates-weekend-entrypoint"]').click();
            await page.locator('xpath=//*[@id="PriceInput-basePrice"]').fill(pricing_enter.weekend_price);
        }catch(error){
            weekend_price = "no detail";
        }
        try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
        }catch(e){
            console.log("no changes");
        }
    }
    else if(smart_pricing_result == 'true' && smart_pricing_button == 'true'){
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/a').click();
        await page.waitForTimeout(2000);
        await page.locator('xpath=//*[@id="pricing-and-availability-settings-smart-pricing-input-min-price"]').fill('2000');
        await page.locator('xpath=//*[@id="pricing-and-availability-settings-smart-pricing-input-max-price"]').fill('5000');
        try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
        }catch(e){
            console.log("no changes");
        }
    }
    else if(smart_pricing_result == 'false' && smart_pricing_button == 'false'){
        await page.waitForTimeout(2000);
        let price = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/a').click();
        await page.waitForTimeout(4000);
        await page.locator('xpath=//*[@id="PriceInput-basePrice"]').fill(pricing_enter.price);
        try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
        }catch(e){
            console.log("no changes");
        }
        await page.waitForTimeout(4000);
        let weekend_price;
        try{
            weekend_price = await page.locator('xpath=//*[@id="pricing-and-availability-settings-rates-weekend-entrypoint"]').click();
            await page.locator('xpath=//*[@id="PriceInput-basePrice"]').fill(pricing_enter.weekend_price);
        }catch(error){
            weekend_price = "no detail";
        }
        try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
        }catch(e){
            console.log("no changes");
        }
    }

    
    
    await page.waitForTimeout(4000);
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-weekly-discount-entrypoint"]').click();
    page.locator('xpath=//*[@id="weeklyDiscount-discount-percent-input"]').fill(pricing_enter.weekly_discount);
    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
    await page.waitForTimeout(4000);
    await page.locator('xpath=//*[@id="pricing-and-availability-settings-monthly-discount-entrypoint"]').click();
    let weekly_discount_average = await page.locator('xpath=//*[@id="monthlyDiscount-discount-percent-input"]').fill(pricing_enter.month_discount);

    await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/div[2]/button').click();
    await page.waitForTimeout(4000);

    await page.waitForTimeout(5000);

    // return {"pricing": {"smart_pricing":smart_pricing_result,"price":price,"weekend_price":weekend_price,"weekly_discount":weekly_discount,"weekly_discount_average":weekly_final,"month_discount":month_discount,"month_discount_average":month_final}};
}

module.exports = get_pricing;