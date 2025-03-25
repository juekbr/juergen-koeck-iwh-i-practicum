const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

//activate pug =>
app.set('view engine', 'pug');
// where are the pug templates =>
app.use(express.static(__dirname + '/public'));
// this is the body parser, so we are able to use the post request =>
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get api token from .env file =>
let PRIVATE_APP_ACCESS = process.env.API_TOKEN;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
     // my properties are bike_name, brand, frame_size
     // my objecttype = 2-140603059
    const bikes = 'https://api.hubspot.com/crm/v3/objects/2-140603059?properties=bike_name,brand,frame_size';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        // this is my call with authorization
        const response = await axios.get(bikes, { headers });
        // writing the result into a variable
        const data = response.data.results;
        // thats the pug call - the first variable right after "render" is the pug template
        res.render('homepage', { title: 'Bikes | HubSpot APIs', data }); 
        // console.log('try');
    } catch (error) {
        console.error(error);
        // console.log('catch');
    }
});


// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req, res) => {
    // my properties are bike_name, brand, frame_size
    // my objecttype = 2-140603059
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum.'}); 
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {
    // my properties are bike_name, brand, frame_size
    // my objecttype = 2-140603059
    // 
    // we going to use req.body instead of req.query, because we use post
    const update = {
        properties: {
            "bike_name": req.body.bike_name,
            "brand": req.body.brand,
            "frame_size": req.body.frame_size
        }
    }

    const createBike = "https://api.hubapi.com/crm/v3/objects/2-140603059";
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {  
        // axios.patch(url, data, config)
        // axios.put(url, data, config)
        await axios.post(createBike, update, { headers } );
        // redirect back to homepage =>
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));