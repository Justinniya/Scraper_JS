async function tell_guest_what_your_place_offer_function(page,guest_want){
    let tell_guest_what_your_place_offer_list = {
        "Wifi": { column: 2, row: 1 },
        "TV": { column: 2, row: 2 },
        "Kitchen": { column: 2, row: 3 },
        "Washer": { column: 2, row: 4 },
        "Free_parking_on_premises": { column: 2, row: 5 },
        "Paid_parking_on_premises": { column: 2, row: 6 },
        "Air_conditioning": { column: 2, row: 7 },
        "Dedicated_workspace": { column: 2, row: 8 },
      
        "Pool": { column: 3, row: 1 },
        "Hot_tub": { column: 3, row: 2 },
        "Patio": { column: 3, row: 3 },
        "BBQ_grill": { column: 3, row: 4 },
        "Outdoor_dining_area": { column: 3, row: 5 },
        "Fire_pit": { column: 3, row: 6 },
        "Pool_table": { column: 3, row: 7 },
        "Indoor_fireplace": { column: 3, row: 8 },
        "Piano": { column: 3, row: 9 },
        "Exercise_equipment": { column: 3, row: 10 },
        "Lake_access": { column: 3, row: 11 },
        "Beach_access": { column: 3, row: 12 },
        "Ski_in_Ski_out": { column: 3, row: 13 },
        "Outdoor_shower": { column: 3, row: 14 },
      
        "Smoke_alarm": { column: 4, row: 1 },
        "First_aid_kit": { column: 4, row: 2 },
        "Fire_extinguisher": { column: 4, row: 3 },
        "Carbon_monoxide": { column: 4, row: 4 }
      };

      
    for(let oneby of guest_want){
        let item = tell_guest_what_your_place_offer_list[oneby];
        if(item){
            let { column, row } = item
        let click_it = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[${column}]/div/div[${row}]/button`);
        await page.waitForTimeout(500);
        await click_it.click();
        }
        else{
            console.log('item not found',oneby);
        }
    }

    return true;

}

module.exports = {tell_guest_what_your_place_offer_function}