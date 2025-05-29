async function number_of_beds(page,beds_number) {
    let beds = 1
    if(beds < beds_number){
        for(let i = 0; i < beds_number - beds; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--2-beds-stepper"]/button[2]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}

module.exports = {number_of_beds}