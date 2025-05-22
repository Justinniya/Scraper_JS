// const functionName = ['get_title','get_property_type']//, 'get_pricing','get_availability','get_number_of_guest']; // example name

// fetch('http://localhost:3000/airbnb/scraper', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify([functionName])
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.error('Request failed:', err));

// fetch('http://localhost:3000/airbnb/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"email":"justindelavega00@gmail.com", "password":"Emjaycee83849724"})
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.error('Request failed:', err));

// fetch('http://localhost:3000/airbnb/postToFacebook', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(
//         {
//             "url": "1046291836187649",
//             "feelingEmoji": "cool",
//             "textPost": "This is a test post",
//             "file": "Screenshot From 2025-01-28 22-16-55.png"
//         }
//     )
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.error('Request failed:', err));


// async function sendCompletedListing() {
//     const response = await fetch('http://ds5.d3.net/scraping/airbnb/completed_listing', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "filter_start_date": "2025-05-02",
//         "filter_end_date": "2025-05-30",
//         "airbnb_uid": "1285062459552924609",
//         "for_catching_airbnb_uid": {
//           "names": 
//                   ["A1 Chaweng Mountain View, 1th floor", "A2 Chaweng Mountain View, 1th floor", "A3 Chaweng Lake View, 2nd floor", "A4 Chaweng Lake View, 2nd floor", "A5 Chaweng Panorama View, 3rd floor", "A6 Chaweng Panorama View, 3rd floor", "B1 Chaweng Mountain View, 1th floor", "B2 Chaweng Mountain View, 1th floor", "B3 Chaweng Lake View, 2nd floor", "B4 Chaweng Lake View, 2nd floor", "B5 Chaweng Panorama View, 3rd floor", "B6 Chaweng Panorama View, 3rd floor", "C1 Chaweng Mountain View, 1th floor", "C2 Chaweng Mountain View, 1th floor", "C3 Chaweng Lake View, 2nd floor", "C4 Chaweng Lake View, 2nd floor", "C5 Chaweng Panorama View, 3rd floor", "C6 Chaweng Panorama View, 3rd floor", "D1 Chaweng Mountain View, 1th floor", "D2 Chaweng Mountain View, 1th floor", "D3 Chaweng Lake View, 2nd floor", "D4 Chaweng Lake View, 2nd floor"], 
//           "airbnb_uids": 
//                   ["1214205284926186484", "1326436699315156206", "1217189681070539446", "1326425673876377173", "1217258250370046916", "1285062459552924609", "1217089201544101425", "1326439048034779048", "1283052734931254218", "1326427239457519760", "1236555571957374980", "1284522361461507064", "1326432967356919229", "1217089201544101425", "1326420020033729942", "1326429385889305030", "1284492686085392718", "1285074523204401588", "1326435610236794917", "753379668429308358", "1326423041028890706", "1326430672093829098"]}
//       })
//      });
  
//     const result = await response.json();
//     console.log('Response:', result);
//   }
  
//   sendCompletedListing();


  // fetch('http://ds5.d3.net/scraping/airbnb/completed_listing', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         "filter_start_date": "2025-05-02"
  //         // "filter_start_date": "2025-05-02",
  //         // "filter_end_date": "2025-05-30",
  //         // "airbnb_uid": "1285062459552924609",
  //         // "for_catching_airbnb_uid": {
        //   //   "names": 
        //   //           ["A1 Chaweng Mountain View, 1th floor", "A2 Chaweng Mountain View, 1th floor", "A3 Chaweng Lake View, 2nd floor", "A4 Chaweng Lake View, 2nd floor", "A5 Chaweng Panorama View, 3rd floor", "A6 Chaweng Panorama View, 3rd floor", "B1 Chaweng Mountain View, 1th floor", "B2 Chaweng Mountain View, 1th floor", "B3 Chaweng Lake View, 2nd floor", "B4 Chaweng Lake View, 2nd floor", "B5 Chaweng Panorama View, 3rd floor", "B6 Chaweng Panorama View, 3rd floor", "C1 Chaweng Mountain View, 1th floor", "C2 Chaweng Mountain View, 1th floor", "C3 Chaweng Lake View, 2nd floor", "C4 Chaweng Lake View, 2nd floor", "C5 Chaweng Panorama View, 3rd floor", "C6 Chaweng Panorama View, 3rd floor", "D1 Chaweng Mountain View, 1th floor", "D2 Chaweng Mountain View, 1th floor", "D3 Chaweng Lake View, 2nd floor", "D4 Chaweng Lake View, 2nd floor"], 
        //   //   "airbnb_uids": 
        //   //           ["1214205284926186484", "1326436699315156206", "1217189681070539446", "1326425673876377173", "1217258250370046916", "1285062459552924609", "1217089201544101425", "1326439048034779048", "1283052734931254218", "1326427239457519760", "1236555571957374980", "1284522361461507064", "1326432967356919229", "1217089201544101425", "1326420020033729942", "1326429385889305030", "1284492686085392718", "1285074523204401588", "1326435610236794917", "753379668429308358", "1326423041028890706", "1326430672093829098"]}
        // })
  //   })
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.error('Request failed:', err));


//   async function sendCompletedListing() {
//     const response = await fetch('https://ds5.d3.net/scraping/airbnb/completed_listing', {
//       // const response = await fetch('http://192.168.1.54:3000/scraping/airbnb/completed_listing', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             filter_start_date: "2025-05-02",
//             filter_end_date: "2025-05-30",
//             airbnb_uid: "1285062459552924609",
//             for_catching_airbnb_uid: {
//               names: 
//                     ["A1 Chaweng Mountain View, 1th floor", "A2 Chaweng Mountain View, 1th floor", "A3 Chaweng Lake View, 2nd floor", "A4 Chaweng Lake View, 2nd floor", "A5 Chaweng Panorama View, 3rd floor", "A6 Chaweng Panorama View, 3rd floor", "B1 Chaweng Mountain View, 1th floor", "B2 Chaweng Mountain View, 1th floor", "B3 Chaweng Lake View, 2nd floor", "B4 Chaweng Lake View, 2nd floor", "B5 Chaweng Panorama View, 3rd floor", "B6 Chaweng Panorama View, 3rd floor", "C1 Chaweng Mountain View, 1th floor", "C2 Chaweng Mountain View, 1th floor", "C3 Chaweng Lake View, 2nd floor", "C4 Chaweng Lake View, 2nd floor", "C5 Chaweng Panorama View, 3rd floor", "C6 Chaweng Panorama View, 3rd floor", "D1 Chaweng Mountain View, 1th floor", "D2 Chaweng Mountain View, 1th floor", "D3 Chaweng Lake View, 2nd floor", "D4 Chaweng Lake View, 2nd floor"], 
//               airbnb_uids: 
//                     ["1214205284926186484", "1326436699315156206", "1217189681070539446", "1326425673876377173", "1217258250370046916", "1285062459552924609", "1217089201544101425", "1326439048034779048", "1283052734931254218", "1326427239457519760", "1236555571957374980", "1284522361461507064", "1326432967356919229", "1217089201544101425", "1326420020033729942", "1326429385889305030", "1284492686085392718", "1285074523204401588", "1326435610236794917", "753379668429308358", "1326423041028890706", "1326430672093829098"]
//             }
//         })
//     });

//     const contentType = response.headers.get('content-type');
//     const text = await response.text();
//     console.log('Content-Type:', contentType);
//     console.log('Raw response:', text);

//     if (contentType && contentType.includes('application/json')) {
//         const result = JSON.parse(text);
//         console.log('JSON Response:', result);
//     } else {
//         console.error('Expected JSON but got HTML or something else.');
//     }
// }

// sendCompletedListing();

async function sendCompletedListing() {
    const response = await fetch('http://192.168.1.54:4000/scraping/airbnb/login', {
      // const response = await fetch('http://192.168.1.54:3000/scraping/airbnb/completed_listing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "platform":"Google",
  "email" : "justindelavega00@gmail.com",
  "password" : "Emjaycee83849724"
        })
    });

    const contentType = response.headers.get('content-type');
    const text = await response.text();
    console.log('Raw response:', text);
}

sendCompletedListing();