// Import the discord.js module
const {Client, RichEmbed } = require('discord.js');
const config = require("./conf.json");
const tokens = require("./tokens.json");
const data = require("./data.json");

// Create an instance of a Discord client
const client = new Client();

var my_id;

// function reminder(client) {
    // (function loop() {	
        // var now = new Date();
		// console.log(now.getDate()+" "+now.getHours()+" "+now.getMinutes());
        // if (now.getDate() === 16 && now.getHours() === 11 && now.getMinutes() === 17) {
            // console.log("Remind");
        // }
        // now = new Date();                  // allow for time passing
        // var delay = 60000 - (now % 60000); // exact ms to next minute interval
        // setTimeout(loop, delay);
    // })();
// }

client.on('ready', () => {
	my_id = client.user.id;
	
	client.user.setPresence({ game: { name: 'weeb games. Type '+config.prefix+'help for commands list' }, status: 'online' })
		.then(console.log('Status set successfully'))
		.catch(console.error);
		
	// reminder(client);
	
	console.log('I am ready!');
});

//Bot Functions
client.on('message', message => {
	if(message.content.startsWith(config.prefix)){
		const cmd = message.content.slice(1);
		
		if (cmd.startsWith('help')) {
			message.channel.send('\n**Prefix**: '+config.prefix+'\n\n**Commands**:\n-**boop <user, optional>** - Boop someone, what do you expect\n**-convert <temperature, example: 24C>** - Convert Temperature to Celcius, Kelvin, or Retarded',{
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
			
			try{
				if(message.content.toLowerCase().endsWith('c')){
					tempC = parseFloat(message.content.replace ( /[^\d.]/g, '' ));
					tempF = (tempC*9/5)+32;
					tempK = tempC+273.15;
					converted = true;
				}else if(message.content.toLowerCase().endsWith('f')){
					tempF = parseFloat(message.content.replace ( /[^\d.]/g, '' ));
					tempC = (tempF-32)*5/9;
					tempK = tempC+273.15;
					converted = true;
				}else if(message.content.toLowerCase().endsWith('k')){
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
			}catch(err) {
				message.channel.send('Gomen, something went wrong > <\'');
			}
		}
		
	}else{
		if(message.mentions.users.first()){
			if(message.mentions.users.first().id==my_id){
				var msg = message.content.toLowerCase();
				if(msg.startsWith('thank')||msg.startsWith('thx')||msg.startsWith('ty')){
					message.channel.send('You\'re welcome ^^');
				}
			}else{
			}
		}else{
		}
	}
	
});

client.login(process.env.BOT_TOKEN);
