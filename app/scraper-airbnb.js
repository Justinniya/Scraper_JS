const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { scraper_main } = require('./airbnb_property.js');
const { house_listing } = require('./house_listing.js');
const { hotel_listing } = require('./create_listing/hotel_listing/main.js');
// const { scraper_main } = require('./non_multi.js');
const { loginToAirbnb } = require('./login_airbnb.js');
const { main } = require('./facebook_post.js');
const express = require('express');
const cors = require('cors');
const {listing_main} = require('./listing_airbnb.js')
const { url } = require('inspector');
// const main_edit = require('./edit_listing/main.js;')
const app = express();

app.use(cors());
app.use(express.json());
const authPath = path.join(__dirname, 'auth', 'auth.json');
const authList = JSON.parse(fs.readFileSync(authPath, 'utf-8'));
// app.post('/scraping/airbnb/login',async (req, res) => {
//     let { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' });
//     }
//     console.log(email, password);
//     try{
//         fs.unlinkSync('airbnb.json');
//     }
//     catch(err){
//         console.log('No file to delete');
//     }
//     let logging_in = await loginToAirbnb(email, password);
//     console.log(logging_in);
//     if (logging_in) {

//         res.status(200).json({ auth_id: logging_in });
//     }
//     else {
//         res.status(401).json({ error: 'Login failed' });
//     }
// });
// loginToAirbnb("justindelavega00@gmail.com", "Emjaycee83849724")

// curl -X POST http://localhost:3000/scraping/airbnb/login \
//   -H "Content-Type: application/json" \
//   -d '{
//     "email": "justindelavega00@gmail.com",
//     "password": "Emjaycee83849724"
//   }'


app.post('/scraping/airbnb/scraper', async (req, res) => {
    const { functionNames, url } = req.body;
    console.log(functionNames,url);
    if (!Array.isArray(functionNames)) {
        return res.status(400).json({ error: 'Function names must be an array' });
    }

    try {
        let result = await scraper_main(functionNames,url);
            if (!result) {
                return res.status(400).json({ error: `Function ${functionNames} failed or not found` });
            }else{
                res.status(200).json({ message: result });
            }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during scraping' });
    }
});


app.post('/scraping/airbnb/postToFacebook', async (req, res) => {
    const { url, feelingEmoji, textPost, file } = req.body;

    if (!url || !feelingEmoji || !textPost || !file) {
        return res.status(400).json({ error: 'URL, feelingEmoji, textPost and file are required' });
    }

    try {
        await main(url.url, feelingEmoji.feelingEmoji, textPost.textPost, file.file);
        res.status(200).json({ message: 'Post to Facebook successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during posting to Facebook' });
    }
});

app.get('/scraping/airbnb/home', async (req, res) => {
    res.send({ message: 'Welcome to the Airbnb Scraper API!' });
});


app.post('/scraping/airbnb/create_listing', async (req, res) => {
    const { data } = req.body;
    console.log(data);
    if (!url || !data ) {
        return res.status(400).json({ error: 'URL, feelingEmoji, textPost and file are required' });
    }

    try {
        if(data['choose_place'] == 'House'){
            await house_listing(data,data.auth_id);
        }
        else{
            await hotel_listing(data,data.auth_id);
        }
        res.status(200).json({ message: 'Post to Facebook successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during posting to Facebook' });
    }
});

app.post('/scraping/airbnb/completed_listing', async (req, res) => {
    let authorized
    try {
         const { username,password } = req.body;
         console.log(username,password);
         console.log(authList);
        // 🔒 Validate presence and match
        if (!username) {
            return res.status(400).json({ error: 'Username and password is required in the request body' });
        }
        
        authorized = authList.find(entry => entry.name === username);
        res.status(200).json({ "status code": 200 });
        if (!authorized) {
            
            const response = await fetch('https://ds5.d3.net/airbnb/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "platform":"Google",
                        "email" : username,
                        "password" : password
                    })
                });

                const contentType = response.headers.get('content-type');
                const text = await response.json();
                const result = await listing_main(req.body,text.auth_id);
                console.log(result);
        }
        console.log(`✅ Verified API key for user: ${authorized.uuid}`);

        
        console.log('Running listing_main()...');
        const result = await listing_main(req.body,authorized.uuid);
        // res.status(200).json({ message: result });
        console.log(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/scraping/airbnb/completed_listing', (req, res) => {
  res.send('GET route is working. Server is up.');
});

// app.post('/scraping/airbnb/edit_listing', async (req, res) => {
//     try {
//         res.status(200).json({ "status code": 200 });
//         console.log('Running Edit_Listing()...');
//         const result = await listing_main(req.body);
//         // res.status(200).json({ message: result });
//         console.log({ 'message': result});
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.get('/scraping/airbnb/show_all',(req, res) => {
    const filePath = path.join(__dirname, 'auth', 'auth.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ error: 'Failed to read JSON' });
        }
        const user = JSON.parse(data);
        res.json(user);
    });
});

app.get('/scraping/airbnb/completed_listing', (req, res) => {
  res.send('GET route is working. Server is up.');
});


app.post('/scraping/airbnb/logout',async (req, res) => {
    let { auth_id } = req.body;

    try{
        let data = fs.readFileSync('auth/auth.json', 'utf-8');
        let jsonArray = JSON.parse(data);

        jsonArray = jsonArray.filter(item => item.uuid !== auth_id);

        fs.unlinkSync(`auth/${auth_id}.json`);
        fs.writeFileSync('auth/auth.json', JSON.stringify(jsonArray, null, 2), 'utf-8');

        console.log('Item removed successfully.');

        res.status(200).json({ logout: 'logout success' });
        
    }
    catch(err){
        console.log(err,req.body)
        res.status(401).json({ error: 'Account not found or already logout' });
    }
    
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});