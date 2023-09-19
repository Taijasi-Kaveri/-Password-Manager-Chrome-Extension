const PORT = 8100
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()

const newspapers = [
    {
        name: 'ndtv',
        address: 'https://www.ndtv.com/topic/india-climate'
       
    },
    {
        name: 'thetimesofIndia',
        address:'https://timesofindia.indiatimes.com/topic/climate-change'
       
    },
    {
        name:'hindustantimes',
        address:'https://www.hindustantimes.com/ht-insight/climate-change'
        
    },
]

const articles = []

newspapers.forEach(newspaper =>{
    get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("climate")',html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url,
                source: newspaper.name
            })
             
        })
    })
})
 app.listen(PORT, () => console.log('server running on PORT ${PORT}'))