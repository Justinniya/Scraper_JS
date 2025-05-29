async  function shared(page,number_of_shared){
    if(number_of_shared == 0){
        return true;
    }
    for(let i = 0; i<number_of_shared; i++){
        let add_shared = await page.locator('xpath=//*[@id="stepper-item--2-SHARED-stepper"]/button[2]');
        add_shared.click();
        await page.waitForTimeout(500);
    }
    return true;
}

module.exports = {shared}