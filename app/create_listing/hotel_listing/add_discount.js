async function add_discount(page, discounts) {
    let discounts_value = {
        'new_listing_promotion': { check_box: 'xpath=//*[@id="newListingPromotion-checkbox"]' },
        'weekly_discount': { check_box: 'xpath=//*[@id="weeklyDiscount-checkbox"]' },
        'monthly_discount': { check_box: 'xpath=//*[@id="monthlyDiscount-checkbox"]' }
    };

    // Loop through all the discount checkboxes and uncheck them first
    for (let key in discounts_value) {
        let checkboxLocator = page.locator(discounts_value[key].check_box);
        let isChecked = await checkboxLocator.isChecked();
        
        if (isChecked) {
            // If checked, uncheck it
            await checkboxLocator.click();
        }
    }

    // Now check the selected discount checkbox (e.g., 'monthly_discount')
    if (discounts_value[discounts[0]]) {  // Only one value is passed, assuming a single discount is selected
        let selectedDiscount = discounts[0];
        let selectedLocator = page.locator(discounts_value[selectedDiscount].check_box);
        
        let isChecked = await selectedLocator.isChecked();
        if (!isChecked) {
            // If it's not checked, check it
            await selectedLocator.click();
        }
    }

    return true;
}

module.exports = {add_discount}