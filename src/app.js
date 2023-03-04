const express = require('express');
const axios = require('axios');
const open = require('open');
const path = require('path');

const app = express()
const port = process.env.PORT || 8080

const publicDirectory = path.join(__dirname, '../public')

const CLIENT_ID = "OLqCA3fN3St8i1FNGBCB9yzbO4l5JZkp";
const CLIENT_SECRET = "HuPZd-KTzmMRfMHh6YA-Ioi99_DeXec2TYjBdtJU_629oVF4ZP-pdJBvoJltbJvU";
const tokenURL= `https://auth.atlassian.com/oauth/token`

app.use(express.static(publicDirectory))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

app.get("/authorize", (req, res) => {
    console.log(`Jira has redirected back to our application! The auth code is in the URL as a query param.`)
    console.log(`Next we exchange the authorization code for an access token`)
    axios({
        method: "POST",
        url: `${tokenURL}`,
        headers: {
            Accept: "*/*"
        },
        data: {
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: req.query.code,
            redirect_uri: "http://localhost:8080/authorize"
        }
    }).then((response) => {
        console.log('And finally redirect to our app with the obtained access_token')
        res.redirect(
        `http://localhost:${port}/authenticated?access_token=${response.data.access_token}`
        );
        //console.log(response.data.access_token)
    });
});

app.get('/authenticated', (req, res) => {
    let authenticated = `You have successfully completed the OAuth 2.0 Dance! Your Access Token is: ${req.query.access_token}.\nThis can also be seen in the query parameters in your browser URL.`
    res.render('pages/index', {message: authenticated})
})

app.get('/', (req, res) => {
    res.render('pages/index', {message: `Your access token will appear here when you're done the OAuth dance.`})
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})