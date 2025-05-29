const {number_of_guests} = require('./number_of_guests');
const {number_of_beds2} = require('./number_of_beds2');
const {number_of_bathrooms} = require('./number_of_bathrooms');

async function shared_guest_stay_function(page,data){
    let guest_stay = data['how_many_people_can_stay_here'];
    await number_of_guests(page,guest_stay['number_of_guests']);
    console.log("Number of guests");
    await page.waitForTimeout(500);
    await number_of_beds2(page,guest_stay['number_of_beds']);
    console.log("number_of_beds");
    await page.waitForTimeout(500);
    await number_of_bathrooms(page,guest_stay['number_of_bathrooms']);
    console.log("bedroom_lock");
    await page.waitForTimeout(500);

    await page.waitForTimeout(2000);
    let next6 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // number_of_guests
    await next6.click();
    await page.waitForTimeout(2000);
}


module.exports = {shared_guest_stay_function}