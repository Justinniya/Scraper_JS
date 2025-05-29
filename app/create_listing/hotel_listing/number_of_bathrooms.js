async function number_of_bathrooms(page,bathrooms_number) {
    let bath_rooms = 1
    if(bath_rooms < bathrooms_number){
        for(let i = 0; i < (bathrooms_number * 2) - bath_rooms; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--2-bathrooms-stepper"]/button[2]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}

module.exports = {number_of_bathrooms}