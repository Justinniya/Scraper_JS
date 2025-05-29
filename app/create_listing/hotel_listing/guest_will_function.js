async function guest_will_function(page,data){
    let place_guest_will = {
        "a_room": 1,
        "a_shared_room_in_a_hostel": 2
      }
    let place_guest_have = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${place_guest_will[data['place_guest_will']]}]/button`).nth(0);
    await page.waitForTimeout(2000);
    await place_guest_have.click();
    await page.waitForTimeout(2000);
    let next3 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // place_guest_have
    await next3.click();
    await page.waitForTimeout(2000);
}

module.exports = {guest_will_function}