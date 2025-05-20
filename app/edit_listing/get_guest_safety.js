async function get_guest_safety(page,data){
    let guest_safety_enterr = data.guest_safety;
    let guest_safety = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[15]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, guest_safety);
    await guest_safety.click();
    let safety_considerations = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[1]/button');
    await page.waitForTimeout(2000);
    await safety_considerations.click();
    await page.waitForTimeout(2000);

    // safety_considerations

    let propert_info_value = guest_safety_enterr.propert_info;
    let safety_considerations_value = guest_safety_enterr.safety_considerations;
    let guest_safety_enter_value = guest_safety_enterr.guest_safety_enter;
    console.log(typeof safety_considerations_value.guests_must_climb_stairs_result_detail);
    let value_not_a_good_fit_for_children_2_12 = safety_considerations_value.not_a_good_fit_for_children_2_12;

    if(value_not_a_good_fit_for_children_2_12 == "true"){//CHECK
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_CHILDREN_ALLOWED-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        let button;
        try{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/div/div[2]/div/div/button').click();
            button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.not_a_good_fit_for_children_2_12_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.not_a_good_fit_for_children_2_12_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_CHILDREN_ALLOWED-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_not_a_good_fit_for_infats_under_2 = safety_considerations_value.not_a_good_fit_for_infats_under_2;

    if(value_not_a_good_fit_for_infats_under_2  == "true"){//CHECK
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_INFANTS_ALLOWED-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.not_a_good_fit_for_infats_under_2_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.not_a_good_fit_for_infats_under_2_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="HOUSE_RULE_NO_INFANTS_ALLOWED-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Pool_or_hot_tub_doesnt_have_a_gate_or_lock = safety_considerations_value.pool_or_hot_tub_doesnt_have_a_gate_or_lock;

    if(value_Pool_or_hot_tub_doesnt_have_a_gate_or_lock == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_POOL_OR_JACUZZI_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_POOL_OR_JACUZZI_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }






    let value_nearby_water_like_lake_or_river = safety_considerations_value.nearby_water_like_lake_or_river;
    if(value_nearby_water_like_lake_or_river == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_LAKE_OR_RIVER_OR_WATER_BODY-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.nearby_water_like_lake_or_river_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.nearby_water_like_lake_or_river_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_LAKE_OR_RIVER_OR_WATER_BODY-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_climbing_or_play_result = safety_considerations_value.climbing_or_play;
    if(value_climbing_or_play_result == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_CLIMBING_OR_PLAY_STRUCTURE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill( safety_considerations_value.climbing_or_play_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill( safety_considerations_value.climbing_or_play_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_CLIMBING_OR_PLAY_STRUCTURE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_heights_without_rails_or_protection = safety_considerations_value.heights_without_rails_or_protection;
    if(value_heights_without_rails_or_protection == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_HEIGHTS_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill( safety_considerations_value.heights_without_rails_or_protection_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill( safety_considerations_value.heights_without_rails_or_protection_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_HEIGHTS_WITH_NO_FENCE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    
    let value_potential_dangerous_animals_on_the_property = safety_considerations_value.potential_dangerous_animals_on_the_property;
    if(value_potential_dangerous_animals_on_the_property == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_ANIMALS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.potential_dangerous_animals_on_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(safety_considerations_value.potential_dangerous_animals_on_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_ANIMALS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);
    

        


    let safety_devices = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/button');
    await page.waitForTimeout(2000);
    await safety_devices.click();

    // guest_safety_enter

    let value_Exterior_security_camera_present = guest_safety_enter_value.exterior_security_camera_present;
    if(value_Exterior_security_camera_present == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_SURVEILLANCE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(2000);
        await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.exterior_security_camera_present_result_detail);
        await page.waitForTimeout(2000);
        await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_SURVEILLANCE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    


    let value_Noise_decibel_monitor_present = guest_safety_enter_value.noise_decibel_monitor_present;
    if(value_Noise_decibel_monitor_present == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_NOISE_MONITOR-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.noise_decibel_monitor_present_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.noise_decibel_monitor_present_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_NOISE_MONITOR-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Carbon_monoxide_alarm = guest_safety_enter_value.carbon_monoxide_alarm;
    if(value_Carbon_monoxide_alarm  == "true"){//CHECK
        await page.locator('xpath=//*[@id="AMENITY_CARBON_MONOXIDE_DETECTOR-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.carbon_monoxide_alarm_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.carbon_monoxide_alarm_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="AMENITY_CARBON_MONOXIDE_DETECTOR-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    


    let value_Smoke_alarm = guest_safety_enter_value.smoke_alarm;
    if(value_Smoke_alarm == "true"){//CHECK
        await page.locator('xpath=//*[@id="AMENITY_SMOKE_DETECTOR-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.smoke_alarm_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(guest_safety_enter_value.smoke_alarm_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="AMENITY_SMOKE_DETECTOR-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }
    await page.waitForTimeout(2000);


    let propert_info = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[3]/button');
    await page.waitForTimeout(2000);
    await propert_info.click();

    // let propert_info_list = []


    let value_Guests_must_climb_stairs = propert_info_value.guests_must_climb_stairs;
    console.log(propert_info_value.guests_must_climb_stairs_result_detail);
    if(value_Guests_must_climb_stairs == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_REQUIRES_STAIRS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.guests_must_climb_stairs_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.guests_must_climb_stairs_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_REQUIRES_STAIRS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Potential_noise_during_stays = propert_info_value.potential_noise_during_stays;
    if(value_Potential_noise_during_stays == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_POTENTIAL_NOISE-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.potential_noise_during_stays_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[2]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.potential_noise_during_stays_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_POTENTIAL_NOISE-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_Pet_live_at_the_property = propert_info_value.pet_live_at_the_property;
    if(value_Pet_live_at_the_property == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_HAS_PETS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.Pet_live_at_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[3]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.Pet_live_at_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_HAS_PETS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }
    
    let value_No_parking_on_the_property = propert_info_value.no_parking_on_the_property;
    if(value_No_parking_on_the_property == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_PARKING-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.no_parking_on_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[4]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.no_parking_on_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_PARKING-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_Property_has_shared_spaces = propert_info_value.property_has_shared_spaces;
    if(value_Property_has_shared_spaces == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_SHARED_SPACES-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.property_has_shared_spaces_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[5]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.property_has_shared_spaces_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_SHARED_SPACES-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    let value_Limited_essential_amenities = propert_info_value.limited_essential_amenities;
    if(value_Limited_essential_amenities == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_AMENITIES-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.limited_essential_amenities_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[6]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.limited_essential_amenities_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_LIMITED_AMENITIES-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }


    let value_Weapon_on_the_property = propert_info_value.weapon_on_the_property;
    if(value_Weapon_on_the_property == "true"){//CHECK
        await page.locator('xpath=//*[@id="EXPECTATION_WEAPONS-row-toggle-DLS-toggle-group"]/div[2]/label').click();
        await page.waitForTimeout(1000);
        try{
        await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/div/div[2]/div/div/button').click();
        button = true;
        }
        catch(e){
            button = false;
        }
        console.log(button);
        if(button){
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.weapon_on_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
        else{
            await page.locator('xpath=//*[@id="secondaryPanelForm"]/div[7]/div[2]/button').click();
            await page.waitForTimeout(2000);
            await page.getByTestId('add-details-text-area').fill(propert_info_value.weapon_on_the_property_result_detail);
            await page.waitForTimeout(2000);
            await page.locator('xpath=/html/body/div[10]/div/div/section/div/div/div[2]/div/footer/button[2]').click();
        }
    }
    else{
        await page.locator('xpath=//*[@id="EXPECTATION_WEAPONS-row-toggle-DLS-toggle-group"]/div[1]/label').click();
    }

    try{
        await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[2]/footer/div[2]/button').click();
        
    }catch(e){
        console.log("no changes");
    }

    await page.waitForTimeout(5000);
}

module.exports = get_guest_safety;