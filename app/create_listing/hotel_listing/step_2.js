async function step_2(page,data){
    // step 2
    let step2 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await step2.click();
}

module.exports = {step_2}