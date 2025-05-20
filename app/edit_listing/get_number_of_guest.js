async function get_number_of_guest(page,data){ // CHECK
    let number_of_guest_enter = data.guest;
    let number_of_guest = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[6]/div/a');
    await number_of_guest.click();
    await page.waitForTimeout(4000);
    let number_guest = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div/div/div[3]/div/div/input');
    let result = await number_guest.inputValue();
    let int_result = Number(result);
    let count = number_of_guest_enter.guest_count.match(/\d+/); // Extracts digits
    let number = count ? parseInt(count[0]) : 0;

    if(int_result > number){
        let final_result = int_result - number;
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div/div/div[3]/div/button[1]').click();
        }
    }
    if(number>int_result){
        let final_result = number - int_result;
        for(let i = 0; final_result>i; i++){
            await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div/div/div[3]/div/button[2]').click();
        }
    }
    else{
        console.log('same');
    }
    await page.waitForTimeout(5000);
    // return {"guest": {"guest_count": result}};
}

module.exports = get_number_of_guest;