const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
// const { scraper_main } = require('./airbnb_property.js');
// const { house_listing } = require('./house_listing.js');
// const { hotel_listing } = require('./hotel_listing.js');
// const { scraper_main } = require('./non_multi.js');
const { loginToAirbnb } = require('./login_airbnb.js');
// const { main } = require('./facebook_post.js');
const express = require('express');
const cors = require('cors');
// const {listing_main} = require('./listing_airbnb.js')
const { url } = require('inspector');
// const main_edit = require('./edit_listing/main.js;')
const app = express();

app.use(cors());
app.use(express.json());

app.post('/airbnb/login', async (req, res) => {
    try {
        let { platform, email, password } = req.body;

        if (!platform || !email || !password) {
            return res.status(400).json({ error: 'Platform, email, and password are required' });
        }

        console.log('Login attempt for:', email);

        try {
            let logging_in = await loginToAirbnb(platform, email, password);
            console.log("Login status:", logging_in);
            return res.status(200).json({ auth_id: logging_in });
        } catch (err) {
            console.error("❌ Airbnb login failed:", err.message);
            return res.status(401).json({ error: 'Login failed' });
        }

    } catch (err) {
        console.error('❌ Server error during login:', err);
        return res.status(500).json({ error: 'Internal server error, Please contact your developer' });
    }
});


app.get('/airbnb/home',async (req, res) => {
    
        return "its working";
});




const port = 4000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});