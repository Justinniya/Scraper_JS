const path = require('path');
const {tell_guest_what_your_place_offer_function} = require('./tell_guest_what_your_place_offer_function');
const {downloadImage} = require('./downloadImage');
const {describe_hotel} = require('./describe_hotel');
const {choose_who_to_welcome_for_your_first_reservation} = require('./choose_who_to_welcome_for_your_first_reservation');
const {add_discount} = require('./add_discount');
const {share_safety_details} = require('./add_disshare_safety_detailscount');

async function last_function(page,data){
    let id;
    let guest_want = [
        "Wifi",
        "TV",
        // "Kitchen",
        "Washer",
        "Free_parking_on_premises",
        "Paid_parking_on_premises",
        // "Air_conditioning",
        // "Dedicated_workspace",
        "Pool",
        "Hot_tub",
        "Patio",
        "BBQ_grill",
        "Outdoor_dining_area",
        "Fire_pit",
        // "Pool_table",
        // "Indoor_fireplace",
        "Piano",
        "Exercise_equipment",
        "Lake_access",
        "Beach_access",
        "Ski_in_Ski_out",
        // "Outdoor_shower",
        // "Smoke_alarm",
        "First_aid_kit",
        "Fire_extinguisher",
        "Carbon_monoxide"
      ];

    await tell_guest_what_your_place_offer_function(page,data['tell_guest_what_your_place_offer_function'])

    await page.waitForTimeout(2000);
    let step21 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // tell_guest_what_your_place_offer_function
    await step21.click();

    let imageUrls = data['imageUrls'];
    const imagePaths = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const ext = path.extname(imageUrls[i]) || '.jpg';
      const filePath = path.resolve(__dirname, `image${i}.png`);
      await downloadImage(imageUrls[i], filePath);
      imagePaths.push(filePath);
    }
    try{
    await page.waitForTimeout(2000);
    let add_phots = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/button');
    await page.waitForTimeout(2000);
    await add_phots.click();
    await page.waitForTimeout(2000);

    console.log("UPloading",imagePaths);
    let upload = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/input');
    await page.waitForTimeout(2000);
    await upload.setInputFiles(imagePaths);
    await page.waitForTimeout(2000);
    let upload_now = await page.locator('xpath=/html/body/div[9]/div/section/div/div/div[2]/div/footer/button[2]');
    await page.waitForTimeout(2000);
    await upload_now.click();
    }catch(err){
        console.log("no photos");
    }
    await page.waitForTimeout(20000);
    let next9 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next9.click();
    await page.waitForTimeout(2000);
    imagePaths.forEach((p) => fs.unlinkSync(p));
    await page.waitForTimeout(2000);
    let title = await page.locator('xpath=//*[@id="title.title"]');
    await page.waitForTimeout(2000);
    // title
    await title.fill('Beautiful and cozy home');
    await page.waitForTimeout(2000);
    let next10 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next10.click();
    // describe

    await describe_hotel(page,data['describe_hotel']);

    await page.waitForTimeout(2000);
    let next11 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next11.click();
    // description 
    await page.waitForTimeout(2000);
    await page.fill('#description\\.summary', data['description']);

    await page.waitForTimeout(2000);
    let next12 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next12.click();

    // step 3
    await page.waitForTimeout(2000);
    let next13 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);

    // click step 3
    await next13.click();
    await page.waitForTimeout(2000);

    await pick_your_booking_settings(page,data['pick_your_booking_settings']);
    let next14 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // pick_your_booking_settings
    await next14.click();
    await page.waitForTimeout(2000);

    await choose_who_to_welcome_for_your_first_reservation(page,data['choose_who_to_welcome_for_your_first_reservation']);

    let next15 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // choose_who_to_welcome_for_your_first_reservation
    await next15.click();
    await page.waitForTimeout(2000);

    await page.fill('#lys-base-price-input', '1500');
    let next16 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // set_your_price
    await next16.click();
    await page.waitForTimeout(3000);


    await add_discount(page,data['add_discount']);
    await page.waitForTimeout(2000);
    let next17 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // add_discount
    await next17.click();
    await page.waitForTimeout(2000);
    let url = await page.url();
    let regex = /\/become-a-host\/(\d+)\//;
    let match = url.match(regex);

    id = match[1];  
    let your_place_have_any_of_these = data['share_safety_details'];
    await share_safety_details(page,your_place_have_any_of_these);
    await page.waitForTimeout(2000);
    let next18 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // share_safety_details
    await next18.click();
    await page.waitForTimeout(2000);
    return id;
}


module.exports = {last_function}