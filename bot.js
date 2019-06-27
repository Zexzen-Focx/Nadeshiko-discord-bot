// Import the discord.js module
const {Client, RichEmbed } = require('discord.js');
const config = require("./conf.json");
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
	
	client.user.setPresence({ game: { name: 'with a trap. Type '+config.prefix+'help for commands list' }, status: 'online' })
		.then(console.log('Status set successfully'))
		.catch(console.error);
		
	// reminder(client);
	
	console.log('I am ready!');
});

//Bot Functions
client.on('message', message => {
	if(message.content.startsWith(config.prefix)){
		const cmd = message.content.slice(1).toLowerCase();
		
		if (cmd.startsWith('help')) {
			message.channel.send('\n**Prefix**: '+config.prefix+'\n\n**Commands**:\n-**boop <user>** - Boop someone, someone has been naughty...\n-**pat <user>** - Pat someone, let\'s cheer em\n-**poke <user>** - Poke someone, get their attention!\n-**idw** - Make a guess\n**-convert <temperature, example: 24C>** - Convert Temperature to Celcius, Kelvin, and Retarded\n\nDon\'t forget to thanks Nadeshiko for her services, or just greet her, no need the prefix, but **ping her** so she knows, she is a little bit klutz.\nDon\'t forget to give her morning or night greetings, she likes it as well.',{
				reply: message.author
			});
		}
		
		if(cmd.startsWith('boop')){
			const user = message.mentions.users.first();
			
			const embed_msg = new RichEmbed()
				.setTitle(data.imgs.boop.title);
			
			if(user){
				if(message.author.username.toString()===user.username){
					embed_msg.setDescription(message.author.username.toString()+' wants me to hit him/her, are you sure?').setImage(data.imgs.boop.url[2]);
				}
				embed_msg.setDescription(user.username+' You have been booped by '+message.author.username.toString()).setImage(data.imgs.boop.url[0]);
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.author.username.toString()+ ' is confused and booped him/herself in confusion').setImage(data.imgs.boop.url[1]);
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('poke')){
			const user = message.mentions.users.first();
			
			const embed_msg = new RichEmbed()
				.setTitle(data.imgs.poke.title);
			
			if(user){
				if(message.author.username.toString()===user.username){
					embed_msg.setDescription(message.author.username.toString()+' wants me to hug him/her, but I am too embarrased >///<').setImage(data.imgs.poke.url[2]);
				}else{
					embed_msg.setDescription(message.author.username.toString()+' is poking '+user.username).setImage(data.imgs.poke.url[0]);
				}
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.author.username.toString()+' has no one to poke so he/she is poking a pudding').setImage(data.imgs.poke.url[1]);
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('hug')){
			const user = message.mentions.users.first();
			
			const embed_msg = new RichEmbed()
				.setTitle(data.imgs.hug.title);
			
			if(user){
				if(message.author.username.toString()===user.username){
					embed_msg.setDescription(message.author.username.toString()+' wants me to hug him/her, however we are separated by the screen, sorry ><').setImage(data.imgs.hug.url[1]);
				}else{
					embed_msg.setDescription(message.author.username.toString()+' is hugging '+user.username).setImage(data.imgs.hug.url[0]);
				}
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.author.username.toString()+' want to hug but failed to hug someone!').setImage(data.imgs.hug.url[2]);
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('pat')){
			const user = message.mentions.users.first();
			
			const embed_msg = new RichEmbed()
				.setTitle(data.imgs.pat.title);
			
			if(user){
				if(user.id==="285248734579916801"){
					embed_msg.setDescription(message.author.username.toString()+' is patting '+user.username+', cute kitty').setImage(data.imgs.pat.url[3]);
				}else if(message.author.username.toString()===user.username){
					embed_msg.setDescription(message.author.username.toString()+' is patting himself/herself...').setImage(data.imgs.pat.url[1]);
				}else{
					embed_msg.setDescription(message.author.username.toString()+' is patting '+user.username+'... There, there...').setImage(data.imgs.pat.url[0]);
				}
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.author.username.toString()+' forgot to mention someone to pat, so he/she decided to pat a random loli, and...').setImage(data.imgs.pat.url[2]);
				message.channel.send(embed_msg);
			}
		}
		
		if(cmd.startsWith('idw')||cmd.startsWith('danya')||cmd.startsWith('da nya')){
			var idw = data.imgs.danya.url;
			const embed_msg = new RichEmbed()
				.setTitle(data.imgs.danya.title)
				.setImage(idw[Math.floor(Math.random() * idw.length)]);
			
			embed_msg.setDescription('IDW here ! Are you the commander who is willing to adopt me ? I\'ll do my best !');			
			message.channel.send(embed_msg);
		}
		
		
		if(cmd.startsWith('convert')){
			var tempC;
			var tempF;
			var tempK;
			var converted = false;
			
			try{
				if(cmd.toLowerCase().endsWith('c')){
					tempC = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
					tempF = (tempC*9/5)+32;
					tempK = tempC+273.15;
					converted = true;
				}else if(cmd.toLowerCase().endsWith('f')){
					tempF = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
					tempC = (tempF-32)*5/9;
					tempK = tempC+273.15;
					converted = true;
				}else if(cmd.toLowerCase().endsWith('k')){
					tempK = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
					tempC = tempK-273.15;
					tempF = (tempC*9/5)+32;
					converted = true;
				}
				
				if(!converted){
					message.channel.send('Gomen, I don\'t know that unit');
				}else if (isNaN(tempC)||isNaN(tempF)||isNaN(tempK)){
					message.channel.send('Oof, something went wrong, have you given me the right input?');
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
				if(msg.includes('thank')||msg.includes('thx')||msg.includes('ty')){
					message.channel.send('You\'re welcome ^^');
				}else if(msg.includes('good morning')||msg.includes('ohayou')){
					message.channel.send('Ohayou Gozaimasu!');
				}else if(msg.includes('good night')||msg.includes('oyasumi')){
					message.channel.send('Good night, see you tomorrow.');
				}else if(msg.includes('hello')||msg.startsWith('hi')||msg.startsWith('hai')){
					message.channel.send('Hello~');
				}
			}else{
			}
		}else{
		}
	}
	


client.login(process.env.BOT_TOKEN);
