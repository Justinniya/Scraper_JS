const {choose_function} = require('./choose_function');
const {guest_will_function} = require('./guest_will_function');
const {address_function} = require('./address_function');
const {room_guest_stay_function} = require('./room_guest_stay_function');
const {who_else_function} = require('./who_else_function');
const {step_2} = require('./step_2');
const {last_function} = require('./last_function');


async function a_room_function(page,data){
    await choose_function(page,data);
    await guest_will_function(page,data);
    await address_function(page,data);
    await room_guest_stay_function(page,data);
    await bathroom_for_guest_function(page,data);
    await who_else_function(page,data);
    await step_2(page,data);
    let id = await last_function(page,data);
    return id
}

module.exports = {a_room_function}

//final 