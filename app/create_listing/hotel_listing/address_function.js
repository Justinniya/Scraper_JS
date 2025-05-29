async function address_function(page,data){
    let enter_address = await page.locator('input[placeholder="Enter your address"]').nth(0);
    await page.waitForTimeout(2000);
    await enter_address.click();
    await page.keyboard.type('zarraga');
    await page.click('li#autocomplete-result-0');
    await page.waitForTimeout(2000);
    let address = data['address'];

    const unitLevelValue       = address['unitLevelValue'];
    const buildingNameValue    = address['buildingNameValue'];
    const streetAddressValue   = address['streetAddressValue'];
    const brgyDistrictValue    = address['brgyDistrictValue'];
    const cityMunicipalityValue= address['cityMunicipalityValue'];
    const postalCodeValue      = address['postalCodeValue'];
    const provinceValue        = address['provinceValue'];

    // Option A: using page.fill()
    await page.fill('xpath=//*[@id="apt"]',            unitLevelValue);
    await page.fill('xpath=//*[@id="additionalInfo"]', buildingNameValue);
    await page.fill('xpath=//*[@id="street"]',      streetAddressValue);
    await page.fill('xpath=//*[@id="district"]',       brgyDistrictValue);
    await page.fill('xpath=//*[@id="city"]',           cityMunicipalityValue);
    await page.fill('xpath=//*[@id="zipcode"]',        postalCodeValue);
    await page.fill('xpath=//*[@id="state"]',          provinceValue);
    await page.waitForTimeout(2000);
    let next4 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // enter_address
    await next4.click();
    await page.waitForTimeout(2000);
    let yes_its_correct = await page.locator('xpath=/html/body/div[10]/div/section/div/div/div[2]/div/div[3]/footer/button[2]').nth(0);
    await page.waitForTimeout(2000);
    await yes_its_correct.click();
    await page.waitForTimeout(2000);
    let next5 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // yes_its_correct
    await next5.click();
    await page.waitForTimeout(2000);
}

module.exports = {address_function}