async function number_of_guests(page,guest_number) {
    let guest = 2
    if(guest_number > guest){
        for(let i = 0; i < guest_number - guest; i++){
            let add_guest = await page.locator('xpath=//*[@id="stepper-item--0-guests-stepper"]/button[2]');
            add_guest.click();
            await page.waitForTimeout(500);
            
        }
    }
    else if(guest > guest_number){
        for(let i = 0; i < guest - guest_number; i++){
            let minus_guest = await page.locator('xpath=//*[@id="stepper-item--0-guests-stepper"]/button[2]');
            minus_guest.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}

module.exports = { number_of_guests }