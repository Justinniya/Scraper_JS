async function choose_who_to_welcome_for_your_first_reservation(page,who_guest){
    let who = {
        'any_airbnb_guest' : 1,
        'an_experienced_guest': 2
    }
    let guest = await page.locator(`xpath=//*[@id="list-selection-radio-card-views"]/div[${who[who_guest]}]`)
    await page.waitForTimeout(2000);
    await guest.click();
    return true;
}

module.exports = {choose_who_to_welcome_for_your_first_reservation}