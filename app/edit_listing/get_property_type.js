async function get_property_type(page,data){ // CHECK
    let property_type_enter = data.property_type
    const click_first = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[3]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, click_first);
    await click_first.click();
    await page.waitForTimeout(2000);
    let most_like = await page.locator('xpath=//*[@id="propertyTypeGroup"]');
    await most_like.selectOption({ label: property_type_enter.propertyTypeGroup });
    await page.waitForTimeout(1000);
    let property_type = await page.locator('xpath=//*[@id="propertyType"]');
    await property_type.selectOption({ label: property_type_enter.property_type });
    await page.waitForTimeout(1000);
    let listing_type = await page.locator('//*[@id="roomType"]');
    await listing_type.selectOption({ label: property_type_enter.listing_type });
    await page.waitForTimeout(1000);
    let get_floors = await page.locator('xpath=//*[@id="property-type-totalFloors-stepper-stepper"]/div/span[1]').textContent();
    let get_flors = await page.locator('xpath=//*[@id="property-type-floorNumber-stepper-stepper"]/div/span[1]').textContent()
    let floors = Number(property_type_enter.floors_in_the_building)
    if(floors > Number(get_floors)){
        floors = floors - Number(get_floors);
        
        for(let i = 0; i<floors;i++){
            try{
            await page.locator('xpath=//*[@id="property-type-totalFloors-stepper-stepper"]/button[2]').click();
            }catch(e){
                continue;
            }
        }
    }
    else {
        floors = Number(get_floors) - floors;
        console.log("floors",floors);
        for(let i = 0; i<floors;i++){
            try{
            await page.locator('xpath=//*[@id="property-type-totalFloors-stepper-stepper"]/button[1]').click();
            }catch(e){
                continue;
            }
        }
    }
    let flors = Number(property_type_enter.floor_is_listing_on);
    if(flors > Number(get_flors)){
        flors = flors - Number(get_flors);
        for(let i = 0; i<flors;i++){
            try{
            await page.locator('xpath=//*[@id="property-type-floorNumber-stepper-stepper"]/button[2]').click();
            }catch(e){
                continue;
            }
        }
    }
    else {
        flors = Number(get_flors) - flors;
        console.log("floors",flors);
        for(let i = 0; i<flors;i++){
            try{
            await page.locator('xpath=//*[@id="property-type-floorNumber-stepper-stepper"]/button[1]').click();
            }catch(e){
                continue;
            }
        }
    }
    // for(let i = 1; i<flors;i++){
    //     await page.locator('xpath=//*[@id="property-type-floorNumber-stepper-stepper"]/button[2]').click();
    // }

    console.log(property_type_enter.year_built,typeof property_type_enter.year_built);
    await page.locator('input[name="yearBuilt"]').fill(property_type_enter.year_built);
    await page.locator('input[name="propertySize"]').fill(property_type_enter.property_size);
     await page.locator('select[name="propertySizeUnits"]').selectOption({ label: property_type_enter.propertySizeUnits });
    // console.log("get_property_type done");
    // return {"property_type":{"propertyTypeGroup": most_like_result.trim(),"property_type": property_type_result.trim(), "listing_type": listing_type_result.trim(),"floors_in_the_building" : floors,"floor_is_listing_on":flors,"year_built":year_built,"property_size":property_size,"propertySizeUnits":propertySizeUnits}};
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(5000);
}

module.exports = get_property_type;
