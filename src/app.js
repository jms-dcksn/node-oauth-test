const express = require('express');
const axios = require('axios');
const open = require('open');

const app = express()
const port = process.env.PORT || 8080

const CLIENT_ID = "<>";
const CLIENT_SECRET = "<>";
const tokenURL= `https://api.smartsheet.com/2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=`
const codeURL = 'https://app.smartsheet.com/b/authorize?response_type=code&client_id=' + CLIENT_ID + '&scope=READ_SHEETS%20WRITE_SHEETS'

open(codeURL) //open browser at code URL to initiate OAuth flow

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/authorize", (req, res) => {
    axios({
        method: "POST",
        url: `${tokenURL}${req.query.code}`,
        headers: {
            Accept: "*/*"
        },
    }).then((response) => {
        res.redirect(
        `http://localhost:8080?access_token=${response.data.access_token}`
        );
        console.log(response.data.access_token)
    });
});

app.get('/', (req, res) => {
    res.send(`<h1>Your access code is: ${req.query.access_token}</h1>`)
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})