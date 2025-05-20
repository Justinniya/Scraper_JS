const { chromium } = require('playwright');
const  path  = require('path');
const fs = require('fs');
const { tr } = require('date-fns/locale');
const get_title = require('./get_title');
const get_property_type = require('./get_property_type');
const get_pricing = require('./get_pricing');
const get_number_of_guest = require('./get_number_of_guest');
const get_availability = require('./get_availability');
const get_description = require('./get_description');
const get_amenities = require('./get_amenities');
const get_accessibility = require('./get_accessibility');
const get_location = require('./get_location');
const get_booking_setting = require('./get_booking_setting');
const get_house_rules = require('./get_house_rules');
const get_guest_safety = require('./get_guest_safety');
const get_cancellation_policy = require('./get_cancellation_policy');
const get_custom_link = require('./get_custom_link');

async function scraper_main(functionName,data){
    // let scraper = [
    //     'get_title', 'get_property_type', 'get_pricing','get_availability','get_number_of_guest', 
    //      'get_description', 'get_amenities', 
    //     'get_location', 'get_booking_setting', 
    //     'get_house_rules', 'get_guest_safety','get_cancellation_policy', 'get_custom_link'
    // ]
    let url = data.id;
    // get_cancellation_policy
    // let scraper = [ 'get_custom_link'    ]
    let results = await Promise.all(functionName.map(fn => main(fn,url,data)));
    // let result_final = Object.assign({}, ...results);
    // fs.writeFileSync('airbnb_output.json', JSON.stringify(result_final, null, 2));
    // return {"Result":result_final};
    return { "Edit Listing": "Finish"}
}

async function main(functionKey,url,data){
    try{
    const functionName = {
        'Title': get_title,
        'property_type': get_property_type,
        'pricing': get_pricing,
        'guest': get_number_of_guest,
        'availability': get_availability,
        'description': get_description,
        'amenities': get_amenities,
        // 'get_accessibility': get_accessibility,
        'location': get_location,
        'booking_setting': get_booking_setting,
        'house_rules': get_house_rules,
        'guest_safety': get_guest_safety,
        'cancellation_policy': get_cancellation_policy,
        'custom_link': get_custom_link
    }
    const browser = await chromium.launch({ headless: false ,args: ['--window-size=1920,1080','--no-sandbox'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',viewport: { width: 1420, height: 975 }});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    await page.goto(`https://www.airbnb.com/hosting/listings/editor/${url}`);
    await page.waitForTimeout(10000);
    if(await page.url() == 'https://www.airbnb.com/hosting/listings'){
        return {'error':`invalid listing id`};
    }else{
    const functionGet = functionName[functionKey];
    const result = await functionGet(page,data);
    browser.close();
    console.log(`browser ${functionKey} finish`);
    return result;
    }
}
    catch(error){
        console.log('error at ', functionKey);
        console.log(error);

    }
    
}


// module.exports = { scraper_main };

// scraper_main(['get_title','get_property_type','get_location'],'1304752346146084328')
// 'get_title','get_property_type','get_availability','get_number_of_guest','get_description','get_location','get_house_rules','get_guest_safety','get_cancellation_policy','get_custom_link'


// To be continued...

// let enter_data = {
  // "Title": "Justin Scraping1",// Check
  // "property_type": {
  //   "propertyTypeGroup": "House",
  //   "property_type": "Home",
  //   "listing_type": "Room",
  //   "floors_in_the_building": "10",
  //   "floor_is_listing_on": "6",
  //   "year_built": "2003",
  //   "property_size": "23",
  //   "propertySizeUnits": "Square feet"
  // },// Check
  // "pricing": {
  //   "smart_pricing": "false",
  //   "price": "₱984",
  //   "weekend_price": "₱2,000",
  //   "weekly_discount": "10%",
  //   "weekly_discount_average": "₱8,028",
  //   "month_discount": "20%",
  //   "month_discount_average": "₱30,118"
  // },// Check
  // "availability": {
  //   "minimum_night": "6",
  //   "maximum_night": "9",
  //   "advance_notice": "Same day",
  //   "same_day": "9:00 AM",
  //   "request_less_then_1_day": "false"
  // },// Check
  // "guest": {
  //   "guest_count": "7 guests"
  // },// Check
  // "description": {
  //   "listing_des": "You'll have a great time at this comfortable place to stay.fasf",
  //   "your_property": "nami",
  //   "guest_access": "bakod aub",
  //   "interaction_with_guest": "gani main",
  //   "other_details": "hahaha"
  // },// Check
//   "amenities": {
//     "Air_conditioning": false,
//     "Arcade_games": true,
//     "Baby_bath": true,
//     "Baby_monitor": true,
//     "Baby_safety_gates": true,
//     "Babysitter_recommendations": true,
//     "Baking_sheet": true,
//     "Barbecue_utensils": true,
//     "Bathtub": false,
//     "Batting_cage": true,
//     "BBQ_grill": true,
//     "Beach_access": true,
//     "Bed_linens": true,
//     "Bidet": false,
//     "Bikes": true,
//     "Blender": true,
//     "Board_games": true,
//     "Boat_slip": false,
//     "Body_soap": true,
//     "Books_and_reading_material": true,
//     "Bowling_alley": true,
//     "Bread_maker": true,
//     "Breakfast": true,
//     "Carbon_monoxide_alarm": true,
//     "Ceiling_fan": false,
//     "Changing_table": true,
//     "Children's_playroom": true,
//     "Children’s_bikes": true,
//     "Children’s_books_and_toys": true,
//     "Cleaning_available_during_stay": true,
//     "Cleaning_products": true,
//     "Climbing_wall": true,
//     "Clothing_storage": true,
//     "Coffee": true,
//     "Coffee_maker": true,
//     "Conditioner": true,
//     "Cooking_basics": true,
//     "Crib": true,
//     "Dedicated_workspace": true,
//     "Dining_table": true,
//     "Dishes_and_silverware": true,
//     "Dishwasher": true,
//     "Dryer": true,
//     "Drying_rack_for_clothing": true,
//     "Elevator": true,
//     "Essentials": true,
//     "Ethernet_connection": true,
//     "EV_charger": true,
//     "Exercise_equipment": false,
//     "Extra_pillows_and_blankets": true,
//     "Fire_extinguisher": true,
//     "Fire_pit": true,
//     "Fire_screen": true,
//     "First_aid_kit": true,
//     "Free_parking_on_premises": true,
//     "Free_street_parking": true,
//     "Freezer": true,
//     "Game_console": true,
//     "Gym": true,
//     "Hair_dryer": true,
//     "Hammock": true,
//     "Hangers": true,
//     "Heating": true,
//     "High_chair": true,
//     "Hockey_rink": true,
//     "Hot_tub": true,
//     "Hot_water": true,
//     "Hot_water_kettle": true,
//     "Indoor_fireplace": true,
//     "Iron": true,
//     "Kayak": true,
//     "Kitchen": true,
//     "Kitchenette": true,
//     "Lake_access": true,
//     "Laser_tag": true,
//     "Laundromat_nearby": true,
//     "Life_size_games": true,
//     "Long_term_stays_allowed": true,
//     "Luggage_dropoff_allowed": true,
//     "Microwave": true,
//     "Mini_fridge": true,
//     "Mini_golf": true,
//     "Mosquito_net": true,
//     "Movie_theater": true,
//     "Outdoor_dining_area": true,
//     "Outdoor_furniture": true,
//     "Outdoor_kitchen": true,
//     "Outdoor_playground": true,
//     "Outdoor_shower": true,
//     "Outlet_covers": true,
//     "Oven": true,
//     "Pack_’n_play/Travel_crib": true,
//     "Paid_parking_off_premises": true,
//     "Paid_parking_on_premises": true,
//     "Patio_or_balcony": true,
//     "Piano": true,
//     "Ping_pong_table": true,
//     "Pocket_wifi": true,
//     "Pool": true,
//     "Pool_table": true,
//     "Portable_fans": true,
//     "Private_entrance": true,
//     "Private_living_room": true,
//     "Record_player": true,
//     "Refrigerator": true,
//     "Resort_access": true,
//     "Rice_Maker": true,
//     "Room-darkening_shades": true,
//     "Safe": true,
//     "Sauna": true,
//     "Shampoo": true,
//     "Shower_gel": true,
//     "Single_level_home": true,
//     "Skate_ramp": true,
//     "Ski-in/Ski-out": true,
//     "Smoke_alarm": true,
//     "Sound_system": true,
//     "Stove": true,
//     "Sun_loungers": true,
//     "Table_corner_guards": true,
//     "Theme_room": true,
//     "Toaster": true,
//     "Trash_compactor": true,
//     "TV": true,
//     "Washer": true,
//     "Waterfront": true,
//     "Wifi": true,
//     "Window_guards": true,
//     "Wine_glasses": true
//   },
  // "location": {
  //   "address_result": {
  //     "unit_level": "3",
  //     "building_name": "d3",
  //     "street_address": "iloilo, phillipines",
  //     "brgy_district": "Jaro",
  //     "city_municipality": "Iloilo City",
  //     "postal_code": "4002",
  //     "province": "Western Visayas"
  //   },
  //   "location_sharing": {
  //     "specific_location": "false",
  //     "address_for_cancellation": "true"
  //   },
  //   "location_feature": {
  //     "Beach_access": "true",
  //     "Lake_access": "false",
  //     "Laundromat_nearby": "true",
  //     "Private_entrance": "true",
  //     "Resort_access": "false",
  //     "Ski-in/Ski-out": "true",
  //     "Waterfront": "true"
  //   },
  //   "neighnorhood": "1 esplanade\n\ntapos sa zarraga dayun",
  //   "getting_around": "esplanade",
  //   "scenic_view": {
  //     "Bay_view": true,
  //     "Beach_view": false,
  //     "Canal_view": true,
  //     "City_skyline_view": false,
  //     "Courtyard_view": true,
  //     "Desert_view": false,
  //     "Garden_view": true,
  //     "Golf_course_view": false,
  //     "Harbor_view": false,
  //     "Lake_view": true,
  //     "Marina_view": true,
  //     "Mountain_view": false,
  //     "Ocean_view": false,
  //     "Park_view": false,
  //     "Pool_view": false,
  //     "Resort_view": false,
  //     "River_view": false,
  //     "Sea_view": false,
  //     "Valley_view": false,
  //     "Vineyard_view": false
  //   }
  // },// Check
  // "booking_setting": {
  //   "title": "Approve all bookings"
  // },
  // "booking_setting": {
  //   "title": "Use Instant Book",
  //   "require_a_good_track_record": "true",
  //   "pre_booking_message": "this is justin"
  // },// Check
  // "house_rules": {
  //   "petsAllowed": "false",
  //   "eventsallowed": "true",
  //   "smoking_allowed": "false",
  //   "quiet_hours": {
  //     "quiet_hours_start": "8:00 PM",
  //     "quiet_hours_end": "7:00 AM"
  //   },
  //   "commercial_photography": "false",
  //   "number_of_guest": "7",
  //   "check_in_and_out": {
  //     "start_time": "5:00 PM",
  //     "end_time": "",
  //     "check_out": ""
  //   },
  //   "addtional_rules": "go tume"
  // },// Check

  // "guest_safety": {
  //   "propert_info": {
  //     "guests_must_climb_stairs": "true",
  //     "guests_must_climb_stairs_result_detail": "ddas",
  //     "potential_noise_during_stays": "false",
  //     "pet_live_at_the_property": "true",
  //     "Pet_live_at_the_property_result_detail": "24",
  //     "no_parking_on_the_property": "false",
  //     "property_has_shared_spaces": "false",
  //     "limited_essential_amenities": "false",
  //     "weapon_on_the_property": "false"
  //   },
  //   "safety_considerations": {
  //     "not_a_good_fit_for_children_2_12": "true",
  //     "not_a_good_fit_for_children_2_12_result_detail": "justin",
  //     "not_a_good_fit_for_infats_under_2": "true",
  //     "not_a_good_fit_for_infats_under_2_result_detail": "dasdasd",
  //     "pool_or_hot_tub_doesnt_have_a_gate_or_lock": "true",
  //     "pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_detail": "no detail",
  //     "nearby_water_like_lake_or_river": "true",
  //     "nearby_water_like_lake_or_river_result_detail": "no detail",
  //     "climbing_or_play": "true",
  //     "climbing_or_play_result_detail": "no detail",
  //     "heights_without_rails_or_protection": "true",
  //     "heights_without_rails_or_protection_result_detail": "no detail",
  //     "potential_dangerous_animals_on_the_property": "true",
  //     "potential_dangerous_animals_on_the_property_result_detail": "no detail"
  //   },
  //   "guest_safety_enter": {
  //     "exterior_security_camera_present": "false",
  //     "noise_decibel_monitor_present": "true",
  //     "noise_decibel_monitor_present_result_detail": "no detail",
  //     "carbon_monoxide_alarm": "true",
  //     "carbon_monoxide_alarm_result_detail": "no detail",
  //     "smoke_alarm": "true",
  //     "smoke_alarm_result_detail": "no detail"
  //   }
  // },//CHECK
  // "cancellation_policy": {
  //   "short_term_stays": {
  //     "title": "Limited",
  //     "description": "Full refund at least 14 days before check-in , Partial refund 7-14 days before check-in",
  //     "non_refundable_option": "false"
  //   },
  //   "long_term_stays": {
  //     "title": "Firm Long Term",
  //     "description": "Full refund up to 30 days before check-in , After that, the first 30 days of the stay are non-refundable"
  //   }
  // },//CHECK
//   "custom_link": "airbnb.com/h/justin11"
// }

async function main_edit(enter_data){
const functionName = Object.keys(enter_data);
// console.log(topKeys);


scraper_main(functionName,enter_data)
}

module.exports = main_edit;