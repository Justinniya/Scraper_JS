async function get_title(page,data){  // CHECK
    let title_enter = data.Title;
    const click_title = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[2]/div/a').elementHandle();
    await click_title.click();
    await page.waitForTimeout(2000);
    let title = await page.locator('xpath=//*[@id="listing-title-en-textarea"]');
    await title.fill(title_enter);
    await page.waitForTimeout(10000);
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(5000);
}

module.exports = get_title;