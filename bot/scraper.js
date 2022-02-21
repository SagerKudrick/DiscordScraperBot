const request = require('request');
const cheerio = require('cheerio');

let articles = [];

class Article {
    constructor(title, desc, link, imgsrc)
    {
        this._title = title;
        this._desc = desc;
        this._link = link;
        this._imgsrc = imgsrc;
    }

    get title()
    {
        return this._title;
    }

    get desc()
    {
        return this._desc;
    }

    get link()
    {
        return this._link;
    }

    get imgsrc()
    {
        return this._imgsrc;
    }
}

const makeRequest = (callback) => request({
    method: 'GET',
    url: 'https://www.epicbundle.com/'
}, (err, res, body) => {

    let titles = [];
    let descs = [];
    let links = [];
    let imgsrcs = [];

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    $(".post-column .entry-title a").each((i, e) => {
        titles[i] = e.children[0].data
    })

    $(".entry-content p").each((i, e) => {
        descs[i] = e.children[0].data
    })

    $(".wp-post-image-link").each((i, e) => {
        links[i] = e.attribs.href
    })

    $(".wp-post-image-link img").each((i, e) => {
        lazysrc = e.attribs['data-lazy-src']
        if(typeof lazysrc !== 'undefined' && lazysrc !== null)
        {
            imgsrcs[i] = lazysrc
        }
    })
    imgsrcs = imgsrcs.filter((a) => a)
    for(i = 0; i < titles.length; i++)
    {
        articles[i] = new Article(titles[i], descs[i], links[i], imgsrcs[i]);
    }

    return callback(articles)

});

exports.scraper = makeRequest;
