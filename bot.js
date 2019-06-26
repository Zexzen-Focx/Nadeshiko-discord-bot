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

//Bot Functions
client.on('message', message => {
	if(message.content.startsWith(config.prefix)){
		const cmd = message.content.slice(1);
		
		if (cmd.startsWith('help')) {
			message.channel.send('Help is work in progress, please be patient',{
				reply: message.author
			});
		}
		
		else if(cmd.startsWith('boop')){
			const user = message.mentions.users.first();
			
			const embed_msg = new RichEmbed()
				.setTitle(data.imgs.boop.title)
				.setImage(data.imgs.boop.url);
			
			if(user){
				embed_msg.setDescription(user.username+' You have been booped by '+message.author.username.toString());
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription('You have been booped by '+message.author.username.toString());
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('convert')){
			var tempC;
			var tempF;
			var tempK;
			var converted = false;
			
			if(message.content.endsWith('C')){
				tempC = parseFloat(message.content.replace ( /[^\d.]/g, '' ));
				tempF = (tempC*9/5)+32;
				tempK = tempC+273.15;
				converted = true;
			}else if(message.content.endsWith('F')){
				tempF = parseFloat(message.content.replace ( /[^\d.]/g, '' ));
				tempC = (tempF-32)*5/9;
				tempK = tempC+273.15;
				converted = true;
			}else if(message.content.endsWith('K')){
				tempK = parseFloat(message.content.replace ( /[^\d.]/g, '' ));
				tempC = tempK-273.15;
				tempF = (tempC*9/5)+32;
				converted = true;
			}
			
			if(!converted){
				message.channel.send('Gomen, I don\'t know that unit');
			}else{
				message.channel.send('Here are the conversion you asked:\n```'+tempC.toFixed(2)+' C\n'+tempF.toFixed(2)+' F\n'+tempK.toFixed(2)+' K```');
			}
		}
		
	}else{
		
	}
	
});

client.login(process.env.BOT_TOKEN);
