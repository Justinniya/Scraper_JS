async function describe_hotel(page,describe_hotel) {
    let describe = {
        "Charming": 1,
        "Hip": 2,
        "Stylish": 3,
        "Upscale": 4,
        "Central": 5,
        "Unique": 6
      }
      for (let oneby of describe_hotel){
        let describe_button = await page.locator(`xpath = //*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div/div[${describe[oneby]}]/button`);
        await page.waitForTimeout(2000);
        await describe_button.click();
    }
    return true;
}


module.exports = {describe_hotel}