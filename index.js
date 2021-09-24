const chalk = require(`chalk`);
const layout = require(`express-ejs-layouts`);
const express = require(`express`);
const path = require(`path`);
let axios = require('axios');
const port = 9999;
const app = express();

app.use(layout);
app.enable('strict routing');
app.set(`layout`, `./layouts/layout.ejs`)
app.use(express.static(__dirname + `/public`));
app.set(`view engine`, `ejs`);
app.set(`views`, path.join(__dirname, `views`));

var randomWords = require('random-words');
app.get(`/`, (req, res) => {
    res.render(`home.ejs`, {
        words: randomWords({ exactly: 5 })
    });
});
const ud = require('urban-dictionary')

// Callback


// Promise


app.get(`/define`,async (req, res) => {
    console.log(req.query.q)
    let urban = undefined
    await ud.define(req.query.q).then((results) => {
        urban = results
      console.log(urban)
    }).catch((error) => {
        console.error(`define (promise) - error ${error.message}`)
      })

       await axios({
            method: 'GET',
            url: `https://owlbot.info/api/v4/dictionary/${req.query.q}`,
            headers: {
                "Authorization": `Token 3ba940c0a6b0afd7a3813bc27930c864ca08fd6b`
            }
        }).then((e) => {
            
            res.render(`main.ejs`, {
                result: e.data,
                urban: urban
            });
            console.log(e.data)
        
    }, (error) => {
        /*res.render(`main-ub.ejs`, {
            urban: urban
        });*/
        res.send("No Definition")
      });
    });

app.listen(port, function (err) {
    if (err) return console.log(err);
    console.log(chalk.green(`[Server]`, chalk.greenBright(`Listening to port ${port}.`)));
});





/*

var express = require(`express`);
var app = express();
const port = 4000
var chalk = require(`chalk`)
var axios = require("axios")
app.get(`/`, (req, res) => {
    res.render(`main.ejs`)
})
app.get(`/search`, async (req, res) => {
    console.log(req.query.q)
    await axios.get(`https://search-api.wonoly.net/search?q=${req.query.q || "Lazyness"}&p=${req.query.p ||0}&ris=0&country=us&lang=en`)
  .then((response) => {
console.log(response.data)

    res.render("search.ejs",
    {
        data: response.data
    })
});
})
app.get(`*`, (req, res) => {
    res.send("Well kindly fuck off this site does not exist bitch")
})

app.listen(port, function (err) {
    if (err) return console.log(err);
    console.log(chalk.blue(`[Server] Listening to port ${port}`));
})

*/