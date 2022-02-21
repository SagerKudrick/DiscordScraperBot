# Free Games / Deals Scraping Discord Bot

This discord bot scrapes https://www.epicbundle.com/ and posts free games and game deals to dicord. Firstly, the website is scraped. We then check if the article titles are present in two files: free.json and all.json; if they aren't they're written to these files and posted to discord. If they are present, it means we've already seen and posted them. 

See json/configExample.json for an explanation of the config.json file that needs to be present in the bot.js directory. You must provide a bots token, and free/all discord channel IDs. You can also provide a URL for the bots avatar, as well as an image URL that will be present underneath every bot message. 

![Bot Example Post](https://github.com/SagerKudrick/DiscordScraperBot/blob/main/example_post.png?raw=true)
