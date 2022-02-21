const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const Discord = require('discord.js');

const { filereader } = require('./filereader.js')

const { filewriter } = require('./filewriter.js')

const { scraper } = require('./scraper.js')

const { token, channelall, channelfree, channellogs, postImage, botAvatar } = require('./config.json');

articleList = [];

// arrays of the json files
allArticles = [];
freeArticles = [];

// empty arrays to add new articles to
newAllArticles = [];
newFreeArticles = [];

// empty array for article objects
newAllArticleObjects = [];
newFreeArticleObjects = [];

const scrape = () => {
    scraper( (result) =>
    {
        articleList = result;
        console.log("Scraped website ")
        console.log("and got " + articleList.length + " articles")

        getAllGames();
        console.log("Opened all.json ")
        console.log("Entries: " + allArticles != undefined ? 0 : allArticles.length)
        getFreeGames();
        console.log("Opened free.json ")
        console.log("Entries: " + freeArticles != undefined ? 0 : freeArticles.length)

        articleList.forEach(article =>
        {
            console.log(article)
            if(articleList.length > 0)
                {
                    let lowercaseTitle = article.title.toLowerCase();
                    let jsonobject = {"Title":article.title}
                    if(allArticles != undefined && allArticles.includes(article.title))
                        {
                            // contained
                            console.log(article.title + " already in")
                        }
                    else
                        {
                            // want to write it
                            console.log("Writing " + article.title + " to all.json")
                            newAllArticles.push(article);
                            filewriter("./all.json", jsonobject)
                            console.log("Done")
                        }
                    if(lowercaseTitle.includes("free"))
                        {
                            // want to write it
                            console.log("Writing " + article.title + " to free.json")
                            newFreeArticles.push(article);
                            filewriter("./free.json", jsonobject)
                            console.log("Done")

                        }

                }
        });
    });

    newAllArticles.forEach(article => {
        console.log(article._title)
        console.log(article._desc)
        console.log(article._link)
        console.log(article._imgsrc)

    });

    newFreeArticles.forEach(article => {

    });
}


const getAllGames = () => {
    allArticles = filereader("./all.json");
}

const getFreeGames = () => {
    freeArticles = filereader("./free.json");
}

const writeAllGames = (data) => {
    filewriter("./all.json", data)
}

const writeFreeGames = (data) => {
    filewriter("./free.json", data)
}

client.once('ready', () => {
	console.log('Ready!');

});

client.on('messageCreate', message => {
	if (message.content == "!test") {
		list();
	}

})

const makeEmbed = (title, content, href, image) => {

    const embed = {
				"description": `__**${title}**__ \n\n ${content}`,
				"url": "https://discordapp.com",
				"color": 7286527,
				"timestamp": `${new Date()}`,
				"image": {
					"url": postImage
				},
				"fields": [
					{
						"name": "Game URL",
						"value": `[Click Here to Visit the Page!](${href})`,
						"inline": true
					},
					{
						"name": "Game Picture",
						"value": `[Click Here to See the Image!](${image})`,
						"inline": true
					}
				],
				"author": {
					"name": "free ish bot",
					"url": "https://discordapp.com",
					"icon_url": botAvatar
				}
			}

    return embed;
}

client.login(token);
scrape()
