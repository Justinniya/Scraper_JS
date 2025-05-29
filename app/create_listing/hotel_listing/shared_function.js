const {choose_function} = require('./choose_function');
const {guest_will_function} = require('./guest_will_function');
const {address_function} = require('./address_function');
const {step_2} = require('./step_2');
const {shared_guest_stay_function} = require('./shared_guest_stay_function');
const {last_function} = require('./last_function');

async function shared_function(page,data){
    await choose_function(page,data);
    await guest_will_function(page,data);
    await address_function(page,data);
    await shared_guest_stay_function(page,data);
    await step_2(page,data);
    let id = await last_function(page,data);
    return id
}

module.exports = {shared_function}