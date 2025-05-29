async function bathroom_for_guest_function(page,data){
    let bathrooms_are_available_to_guests = data['bathrooms_are_available_to_guests']
    await private_and_attached(page,bathrooms_are_available_to_guests['private_and_attached']);
    await dedicated(page,bathrooms_are_available_to_guests['dedicated']);
    await shared(page,bathrooms_are_available_to_guests['shared']);


    let next7 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // bathroom for guests
    await next7.click();


    await page.waitForTimeout(2000);
}

module.exports = {bathroom_for_guest_function}