async function pick_your_booking_settings(page,book_setting){
    let book = {
        'approve_your_first_5_booking': 1,
        'use_instant_book':2
    };
    let settings = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${book[book_setting]}]/button`);
    await page.waitForTimeout(2000);
    await settings.click();
    return true;
}

module.exports = {pick_your_booking_settings}