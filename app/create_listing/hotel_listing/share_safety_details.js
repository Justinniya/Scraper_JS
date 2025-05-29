async function share_safety_details(page, your_place_have_any_of_these) {
    const your_place = {
        'exterior_security_camera': {
            check_box: 'xpath=//*[@id="SURVEILLANCE-row-checkbox"]',
            button: 'xpath=//*[@id="SURVEILLANCE"]/label/div/div[2]'
        },
        'noise_decibel_monitor': {
            check_box: 'xpath=//*[@id="NOISE_MONITOR-row-checkbox"]',
            button: 'xpath=//*[@id="NOISE_MONITOR"]/label/div/div[2]'
        },
        'weapons_on_property': {
            check_box: 'xpath=//*[@id="WEAPONS-row-checkbox"]',
            button: 'xpath=//*[@id="WEAPONS"]/label/div/div[2]'
        }
    };

    for (let itemEntry of your_place_have_any_of_these) {
        let key = '';
        let message = '';

        if (typeof itemEntry === 'string') {
            key = itemEntry;
        } else if (typeof itemEntry === 'object') {
            key = Object.keys(itemEntry)[0];
            message = itemEntry[key]?.message || '';
        }

        const item = your_place[key];
        if (item) {
            const { check_box, button } = item;
            const isChecked = await page.locator(check_box).isChecked();
            if (!isChecked) {
                await page.waitForTimeout(2000);
                await page.locator(button).click();

                if (key === 'exterior_security_camera' && message) {
                    await page.waitForTimeout(1000);
                    await page.keyboard.type(message);
                    await page.waitForTimeout(2000);
                    await page.locator('xpath=/html/body/div[9]/div/section/div/div/div[2]/div/footer/button').click();
                }
            }
        } else {
            console.log(`Safety option "${key}" not found.`);
        }
    }

    return true;
}

module.exports = {share_safety_details}