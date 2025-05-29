async function dedicated(page,number_dedicated){
    if(number_dedicated == 0){
        return true;
    }
    for(let i = 0; i<number_dedicated; i++){
        let add_dedicated = await page.locator('xpath=//*[@id="stepper-item--1-DEDICATED-stepper"]/button[2]');
        add_dedicated.click();
        await page.waitForTimeout(500);
    }
    return true;
}

module.exports = {dedicated}