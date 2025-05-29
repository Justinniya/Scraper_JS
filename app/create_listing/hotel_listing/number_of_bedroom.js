async function number_of_bedroom(page,bedroom_number) {
    let Bedrooms = 1
    if(bedroom_number > Bedrooms){
        for(let i = 0; i < bedroom_number - Bedrooms; i++){
            let add_bedroom = await page.locator('xpath=//*[@id="stepper-item--1-bedrooms-stepper"]/button[2]');
            add_bedroom.click();
            await page.waitForTimeout(500);
        }
    }
    else if(Bedrooms > bedroom_number){
        for(let i = 0; i < 1; i++){
            let minus_bedroom = await page.locator('xpath=//*[@id="stepper-item--1-bedrooms-stepper"]/button[1]');
            minus_bedroom.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}

module.exports = {number_of_bedroom}