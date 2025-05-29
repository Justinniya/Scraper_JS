async function choose_function(page,data){
    let choices = {
        "House": 1,
        "Apartment": 2,
        "Barn": 3,
        "Bed_&_breakfast": 4,
        "Boat": 5,
        "Cabin": 6,
        "Camper/RV": 7,
        "Casa_particular": 8,
        "Castle": 9,
        "Cave": 10,
        "Container": 11,
        "Cycladic_home": 12,
        "Dammuso": 13,
        "Dome": 14,
        "Earth_home": 15,
        "Farm": 16,
        "Guesthouse": 17,
        "Hotel": 18,
        "Houseboat": 19,
        "Kezhan": 20,
        "Minsu": 21,
        "Riad": 22,
        "Ryokan": 23,
        "Shepherd’s_hut": 24,
        "Tent": 25,
        "Tiny_home": 26,
        "Tower": 27,
        "Treehouse": 28,
        "Trullo": 29,
        "Windmill": 30,
        "Yurt": 31
      }
      
    let choose_place = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div[${choices[data['choose_place']]}]/button`).nth(0);
    await page. waitForTimeout(5000);
    await choose_place.click({ force: true });
    await page.waitForTimeout(2000);
    
    let next2 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // choose_place
    await next2.click();
    await page.waitForTimeout(2000);
}


module.exports = {choose_function}