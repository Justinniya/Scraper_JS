async function private_and_attached(page,number_of_private_and_attached){
    if(number_of_private_and_attached == 0){
        return true
    }
    for(let i = 0; i < number_of_private_and_attached; i++){
        let add_paa = await page.locator('xpath=//*[@id="stepper-item--0-ENSUITE-stepper"]/button[2]');
        add_paa.click();
        await page.waitForTimeout(500);
    }
    return true;
}

module.exports = {private_and_attached}