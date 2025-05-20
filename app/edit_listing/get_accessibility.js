async function get_accessibility(page){
    let accessibility = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[10]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, accessibility);
    // await accessibility.click();

}

module.exports = get_accessibility;