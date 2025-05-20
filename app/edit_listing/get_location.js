async function get_location(page,data){
    let location_enter = data.location;
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
    let address_result = location_enter.address_result;
    let unit_level = await page.locator('input[name="APT"]').fill(address_result.unit_level);
    let building_name = await page.locator('input[name="ADDITIONALINFO"]').fill(address_result.building_name);
    let street_address = await page.locator('xpath=//*[@id="STREET"]').fill(address_result.street_address);
    let brgy_district = await page.locator('input[name="DISTRICT"]').fill(address_result.brgy_district);
    let city_municipality = await page.locator('input[name="CITY"]').fill(address_result.city_municipality);
    let postal_code = await page.locator('input[name="ZIPCODE"]').fill(address_result.postal_code);
    let province = await page.locator('input[name="STATE"]').fill(address_result.province);
    await page.waitForTimeout(2000);
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);
    await page.locator('xpath=/html/body/div[11]/div/div/section/div/div/div[2]/div/div[3]/footer/button[2]').click();
    let location_sharing = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(1);
    await page.waitForTimeout(5000);
    await location_sharing.click({ force: true });
    let bodyOfSpecific = await page.locator('.c5bpt99.dir.dir-ltr');
    // await page.screenshot({ path: 'screenshot.png', fullPage: true });
    let specific_location = await bodyOfSpecific.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[1]/div[2]/button');
    await page.waitForTimeout(5000);
    let specific_location_result = await specific_location.getAttribute('aria-checked');
    let location_sharing_result = location_enter.location_sharing.specific_location;
    console.log(specific_location_result ,location_sharing_result);
    if(specific_location_result != location_sharing_result){
        console.log("clicking...");
        await specific_location.click();
    }
    await page.waitForTimeout(5000);
    // location_sharing_result.push({"specific_location": specific_location_result});
    let address_for_cancellation = await bodyOfSpecific.locator('xpath=//*[@id="switch-address-privacy-for-cancellations-switch-row-id"]');
    let address_for_cancellation_result = await address_for_cancellation.getAttribute('aria-checked');
    // location_sharing_result.push({"address_for_cancellation": address_for_cancellation_result});

    if(address_for_cancellation_result != location_enter.location_sharing.address_for_cancellation){
        console.log("clicking...");
        await address_for_cancellation.click();
    }
    
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);
    // let location_sharing_result_final = Object.assign({}, ...location_sharing_result);

    let location_feature = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(2).elementHandle();
    await location_feature.click();
    await page.waitForTimeout(5000);
    let bodyOffeatures = await page.locator('.b1sjcma8.dir.dir-ltr');
    let loopfor  = await bodyOffeatures.locator('.twad414.dir.dir-ltr').count();
    // console.log(loopfor);


    for (let i = 0; i < loopfor; i++) {
        let location_feature_result_text = await bodyOffeatures.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await bodyOffeatures.locator('.canm9xs').nth(i).elementHandle();
        let result = await trueOrfalse.getAttribute('aria-checked');
        if(result == "true"){
        await trueOrfalse.click();
        }
        // location_feature_result.push({[(await location_feature_result_text.textContent()).replace(/\s+/g, '_')]: result});
    }
    let location_feature_result = location_enter.location_feature;
    let values = Object.values(location_feature_result);
    for (let i = 0; i < loopfor; i++) {
        let location_feature_result_text = await bodyOffeatures.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await bodyOffeatures.locator('.canm9xs').nth(i).elementHandle();
        let result = await trueOrfalse.getAttribute('aria-checked');
        if(values[i] == "true"){
        await trueOrfalse.click();
        }
        // location_feature_result.push({[(await location_feature_result_text.textContent()).replace(/\s+/g, '_')]: result});
    }
    // let location_feature_result_final = Object.assign({}, ...location_feature_result);
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);

    let neighnorhood = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(3).elementHandle();
    await page.waitForTimeout(5000);
    await neighnorhood.click();
    let neighnorhood_result = await page.locator('xpath=//*[@id="description-input"]').fill(location_enter.neighnorhood);

    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);

    let getting_around = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(4).elementHandle();
    await page.waitForTimeout(5000);
    await getting_around.click();
    let getting_around_result = await page.locator('xpath=//*[@id="description-input"]').fill(location_enter.getting_around);
    
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);

    let scenic_view = await bodyOfLocation.locator('xpath=//*[@id="listing-location-scenic-views-row"]/div/div/button').elementHandle();
    await page.waitForTimeout(5000);
    await scenic_view.click({ force: true });
    await page.waitForTimeout(5000);
    let scenic_view_body = await page.locator('.b1sjcma8.atm_am_kb7nvz.atm_lk_jxfa6r.atm_ll_jxfa6r.dir.dir-ltr');
                                
    let loopfor2  = await scenic_view_body.locator('.rten07p.atm_5j_t94yts.c1xmq7ds.atm_lo_exct8b.atm_le_exct8b.dir.dir-ltr').count();
    console.log(loopfor2)
    let scenic_view_result = location_enter.scenic_view;
    let values1 = Object.values(scenic_view_result);
    console.log(values1);
    for (let i = 0; i < loopfor2; i++) {
        // let scenic_view_result_text = await scenic_view_body.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let clicked = await scenic_view_body.locator('.rten07p.atm_5j_t94yts.c1xmq7ds.atm_lo_exct8b.atm_le_exct8b.dir.dir-ltr').nth(i);
        let trueOrfalse = await page.locator('.c1dz1hqo.dir.dir-ltr').nth(i).isChecked();
        console.log(trueOrfalse);
        if(trueOrfalse == true){
        await clicked.click();
        }
        // scenic_view_result.push({[(await scenic_view_result_text.textContent()).replace(/\s+/g, '_')]: trueOrfalse});
    }
    await page.waitForTimeout(10000);
    for (let i = 0; i < loopfor2; i++) {
        let scenic_view_result_text = await scenic_view_body.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await scenic_view_body.locator('.rten07p.atm_5j_t94yts.c1xmq7ds.atm_lo_exct8b.atm_le_exct8b.dir.dir-ltr').nth(i);
        if(values1[i] == true){
            console.log(values1[i]);
            await trueOrfalse.click();
        }
        // scenic_view_result.push({[(await scenic_view_result_text.textContent()).replace(/\s+/g, '_')]: trueOrfalse});
    }
    // let scenic_view_result_text_final = Object.assign({}, ...scenic_view_result);
       
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);


    // return {"location": {"address_result":address_result,"location_sharing": location_sharing_result_final,"location_feature": location_feature_result_final,"neighnorhood": neighnorhood_result,"getting_around": getting_around_result,"scenic_view": scenic_view_result_text_final}};

}


module.exports = get_location;