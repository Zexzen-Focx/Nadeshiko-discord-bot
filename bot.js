// Import the discord.js module
const {Client, RichEmbed } = require('discord.js');

// Get Related Files
const config = require("./conf.json");
const data = require("./data.json");

// Create an instance of a Discord client
const client = new Client();

client.on('ready', () => {
	client.user.setPresence({ game: { name: 'weeb games. Type '+config.prefix+'help for commands list' }, status: 'online' })
		.then(console.log('Status set successfully'))
		.catch(console.error);
	
	console.log('I am ready!');
});



client.login(process.env.BOT_TOKEN);
