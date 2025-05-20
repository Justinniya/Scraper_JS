async function get_custom_link(page,data){
    let custom_link_enter = data.custom_link;
    let custom_link = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[17]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, custom_link);
    await custom_link.click();
    await page.waitForTimeout(2000);
     await page.getByTestId('custom-link-textarea').fill(custom_link_enter)
    /// to be continue
    await page.waitForTimeout(2000);
    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/footer/div/div[2]/button').click();
        try{
            let result = await page.textContent('.l1h825yc.atm_kd_19r6f69_24z95b.atm_kd_19r6f69_1xbvphn_1oszvuo.dir.dir-ltr');
            console.log("response :",result);
            
        }
        catch(e){
            console.log("response :","changes saved");
            
        }
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(5000);
}

// to be continue

module.exports = get_custom_link;