const fs = require('fs');
const getSystemAmenities = require('./base_amenities.js');
async function get_amenities(page,data){
    let amenities_enter = data.amenities;
    // let sample_path = '//*[@id="site-content"]/div/div[2]/div/div/section/section/div/div/div[3]/div[1]'    let amenities = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[9]/div/a').elementHandle();
    // await page.waitForTimeout(2000);
    // await page.evaluate((element) => {
    //     element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }, amenities);
    // await amenities.click();
    await page.waitForTimeout(5000);
    let list_of_amenities = []
    let bodyOfamenities = await page.locator('.crxq8ue.dir.dir-ltr');
    let amenitiess = await bodyOfamenities.locator('.twad414.dir.dir-ltr').count();
    // console.log("amenities count", amenitiess);
    for (let i = 0; i < amenitiess; i++) {
        let amenities_result = await bodyOfamenities.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        await bodyOfamenities.evaluate((element) => {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, amenities_result);
        let amenities_result_text = await amenities_result.textContent();
        let final_amenities_result_text = amenities_result_text.replace(/\s+/g, '_');
        // console.log(final_amenities_result_text);
        list_of_amenities.push(final_amenities_result_text);
    }
    try {
        let data = await fs.readFileSync('amenities.json', { encoding: 'utf8' });
        let amenities = JSON.parse(data);

        
        let result = { ...amenities };

        list_of_amenities.forEach(item => {
            result[item] = true;
        });

        // return { amenities: result };
        // console.log(result);
        let result_final = getSystemAmenities(result,amenities_enter);
        console.log('Added amenities:', result_final.added);
        console.log('Removed amenities:', result_final.removed);
        await page.waitForTimeout(3000);
        await removed_amenities(page,result_final.removed);
        await page.waitForTimeout(2000);
        await added_amenities(page,result_final.added);
        await page.waitForTimeout(2000);
        
    } catch (err) {
        console.error('Failed to read amenities.json:', err);
        // return { error: 'Could not load amenities.json' };
    }

    


    // Suggested code to for me to be used
    // for (const [key, value] of Object.entries(services)) {
    // if (value) {
    //     const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    //     const container = page.locator(`div:has-text("${label}")`).first();
    //     const button = container.locator('button').first();
    //     await button.click();
    // }
    // }
}

async function added_amenities(page, added) {
    if (!added) return;

    console.log("Added amenities:", added);

    await page.goto('https://www.airbnb.com/hosting/listings/editor/1304752346146084328/details/amenities/add');
    await page.waitForTimeout(2000);

    const amenitiesSection = page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/div/section/section/div');

    await amenitiesSection.evaluate((el) => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    await page.waitForTimeout(1000);

    for (const value of added) {
        if (!value) continue;

        const label = value.replace(/_/g, ' ');
        const amenitiesList = page.locator('.a3uex7h.atm_h3_hewwpy.atm_ll_1yuitx.dir.dir-ltr');
        const amenity = amenitiesList.locator(`div:has-text("${label}")`).first();
        const button = amenity.locator('button').first();

        try {
            // Ensure it's visible
            await button.waitFor({ state: 'attached' });

            // Scroll into view if needed
            await button.evaluate((el) => {
                const rect = el.getBoundingClientRect();
                const viewHeight = window.innerHeight || document.documentElement.clientHeight;

                if (rect.top < 0 || rect.bottom > viewHeight) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            await page.waitForTimeout(1000);
            console.log(`Clicking to add: ${label}`);
            await button.click();
            await page.waitForTimeout(1000);

            // Handle modal (Save button)
            try{
            const modalSaveButton = page.locator('button:has-text("Save")');
            await modalSaveButton.first().waitFor({ state: 'visible' });
            await modalSaveButton.first().click();

            await page.waitForTimeout(1000);
            }
            catch(e){
                continue;
            }
        } catch (e) {
            console.warn(`Could not add amenity: ${label}`, e);
            continue;
        }
    }

    await page.locator('button:has-text("Done")').click();
}


async function removed_amenities(page, removed) {
    if (removed) {
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/header/div[1]/div[3]/div/button').click();
        await page.waitForTimeout(2000);
        for (const value of removed) {
            if (value) {
                const label = value.replace(/_/g, ' ');
                const button = page.locator('button').filter({ hasText: label }).first();
                await button.scrollIntoViewIfNeeded();
                await button.click();
                console.log(button)

                try {
                    let bodyOfmodal = await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div');
                    await page.waitForTimeout(2000);
                    await bodyOfmodal.locator('button:has-text("Remove")').click();
                    await page.waitForTimeout(2000);
                    await page.locator('button:has-text("Remove")').click();
                    continue;
                } catch (e) {
                    await page.waitForTimeout(2000);
                    await page.locator('button:has-text("Remove")').click();
                    continue;
                }
            }
        }
        await page.locator('button:has-text("Done")').click();
    }
}


module.exports = get_amenities;