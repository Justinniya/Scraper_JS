async function bedroom_lock(page,bedroom_have_lock) {
    if(bedroom_have_lock){
        let bedroom_lock = await page.locator('xpath=//*[@id="lock-radio-input--0-row-radio-button"]');
        bedroom_lock.click();
        await page.waitForTimeout(500);
    }
    else{
        let bedroom_lock = await page.locator('xpath=//*[@id="lock-radio-input--1-row-radio-button"]');
        bedroom_lock.click();
        await page.waitForTimeout(500);
    }
    return true;
}

module.exports = {bedroom_lock}