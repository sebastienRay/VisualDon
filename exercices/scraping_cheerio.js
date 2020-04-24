const cheerio = require('cheerio')

const fs = require('fs')

const page = fs.readFileSync('page.html', 'utf-8')

const $ = cheerio.load(page)

const row = $('.row')

const parts = $('.col-sm-4.col-lg-4.col-md-4', row)

let result = []

parts.each((index, parts) => {
    if (index !== 0) {
        result.push({
            Titre: $('a.title', parts).text(),
            prix: $('h4.price', parts).text()
        })
    }
})

console.log(
    JSON.stringify(
        result.map(d => ({ d, prix: (d.prix) }))
    )
)