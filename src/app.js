const express = require('express')
const app = express()
const port = 3000

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://covid19.min-saude.pt/pedido-de-agendamento/';

app.set('view engine', 'ejs')
app.use('/', express.static('public'))


app.get('/', (req, res) => {
    axios(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const age = $('#pedido_content .has-text-color').find('strong').text().match(/\d+/)[0]

        res.render("index", {
            age: age
        })         
    }).catch(console.error);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) 
})