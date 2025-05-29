async function else_might_be_there(page,else_might_be_there) {
    let who_else = {
        "Me": 1,
        "My_family": 2,
        "Other_guests": 3,
        "Roommates": 4
      }

    for (let oneby of else_might_be_there){
        let who_else_be_there = await page.locator(`//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${who_else[oneby]}]/button`);
        await page.waitForTimeout(2000);
        await who_else_be_there.click();
    }

    return true;

}


module.exports = {else_might_be_there}