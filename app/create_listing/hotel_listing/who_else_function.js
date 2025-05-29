async function who_else_function(page,data){
    await else_might_be_there(page,data['else_might_be_there']);
    await page.waitForTimeout(2000);
    let next8 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // who else might be there
    await next8.click();


    await page.waitForTimeout(2000);
}

module.exports = {who_else_function}