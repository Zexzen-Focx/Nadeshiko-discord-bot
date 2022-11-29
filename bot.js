require('dotenv').config()
// Import the discord.js module
const {Client, MessageEmbed } = require('discord.js');
const config = require("./conf.json");
const data = require("./data.json");


// const translate = require('@k3rn31p4nic/google-translate-api');

// Create an instance of a Discord client
const client = new Client();

var my_id;

var annoucement_send_once = true
var annoucement_last_send = Date.now()

client.on('ready', () => {
	my_id = client.user.id;
	
	client.user.setPresence({ game: { name: 'with a death. Type '+config.prefix+'help for commands list' }, status: 'online' })
		.then(console.log('Status set successfully'))
		.catch(console.error);
	
	console.log('I am ready!');
});

//Bot Functions
client.on('message', message => {
	if(message.author.bot){
		return;
	}

	if(message.content.startsWith(config.prefix)||message.content.toLowerCase().startsWith('nadeshiko ')){
		// Experimental announcement function
		announcement(message.channel, "Back from the death. Expect something new later.", 0)
		
		
		if(message.content.toLowerCase().startsWith('nadeshiko ')){
			var cmd = message.content.slice(10).toLowerCase();
		}else{
			var cmd = message.content.slice(1).toLowerCase();
		}
		
		if (cmd.startsWith('help')) {
			var help = "";
			help += '\n**Prefix**: '+config.prefix;
			help += '\n\n';
			help += '**Commands**:';
			help += '\n';
			help += '-**hug <user>** - Hug someone, let\'s snuggle\n';
			help += '-**boop <user>** - Boop someone, someone has been naughty...\n';
			help += '-**pat <user>** - Pat someone, let\'s cheer em\n';
			help += '-**poke <user>** - Poke someone, get their attention!\n';
			help += '-**idw** - Make a guess\n';
			// help += '-**tranlate <from - optional>** - Translate something. Optional input "from" to determine from what language it is translated, default to Auto-Detect language.\n'; ---- Deprecated with the deprecation of Translate Library
			help += '-**convert <input>** - Convert the input into respective counterparts\n';
			help += '===> Convert Temperature from/to Celcius, Kelvin, and Retarded\n';
			help += '===> Convert Distance from/to KM, Miles, and Yards\n';
			help += '===> Convert Height (or smaller distances) from/to Meters, CM, Feet, and Inches\n';
			help += '\n';
			help += 'Don\'t forget to thanks Nadeshiko for her services, or just greet her, no need the prefix, but **ping her** so she knows, she is a little bit klutz.\nDon\'t forget to give her morning or night greetings, she likes it as well.';
		
			message.channel.send(help,{
				reply: message.author
			});
		}
		
		if(cmd.startsWith('boop')){
			const user = message.mentions.members.first();
			
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.boop.title);
			
			if(user){
				if(message.author.id===user.id){
					embed_msg.setDescription(message.member.displayName.toString()+' wants me to hit him/her, are you sure?').setImage(data.imgs.boop.url[2]);
				}
				embed_msg.setDescription(user.displayName+' You have been booped by '+message.member.displayName.toString()).setImage(data.imgs.boop.url[0]);
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.member.displayName.toString()+ ' is confused and booped him/herself in confusion').setImage(data.imgs.boop.url[1]);
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('poke')){
			const user = message.mentions.members.first();
			
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.poke.title);
			
			if(user){
				if(message.author.id===user.id){
					embed_msg.setDescription(message.member.displayName.toString()+' wants me to hug him/her, but I am too embarrased >///<').setImage(data.imgs.poke.url[2]);
				}else{
					embed_msg.setDescription(message.member.displayName.toString()+' is poking '+user.displayName).setImage(data.imgs.poke.url[0]);
				}
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.member.displayName.toString()+' has no one to poke so he/she is poking a pudding').setImage(data.imgs.poke.url[1]);
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('hug')){
			const user = message.mentions.members.first();
			
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.hug.title);
			
			if(user){
				if(message.author.id===user.id){
					embed_msg.setDescription(message.member.displayName.toString()+' wants me to hug him/her, however we are separated by the screen, sorry ><').setImage(data.imgs.hug.url[1]);
				}else{
					embed_msg.setDescription(message.member.displayName.toString()+' is hugging '+user.displayName).setImage(data.imgs.hug.url[0]);
				}
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.member.displayName.toString()+' want to hug but failed to hug someone!').setImage(data.imgs.hug.url[2]);
				message.channel.send(embed_msg);
			}
			
		}
		
		if(cmd.startsWith('slap')){
			const user = message.mentions.members.first();
			
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.slap.title);
			
			if(user){
				if(message.author.id===user.id){
					embed_msg.setDescription(message.member.displayName.toString()+' wants me to slap himself, I will do the honor. ***slap***').setImage(data.imgs.slap.url[0]);
				}else{
					embed_msg.setDescription(message.member.displayName.toString()+' is slapping '+user.displayName).setImage(data.imgs.slap.url[0]);
				}
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.member.displayName.toString()+' forgot to mention who to slap, so I will slap him instead ***slap***').setImage(data.imgs.slap.url[0]);
				message.channel.send(embed_msg);
			}
		}
		
		if(cmd.startsWith('pat')){
			const user = message.mentions.members.first();
			
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.pat.title);
			
			if(user){
				if(user.id==="285248734579916801"){
					embed_msg.setDescription(message.member.displayName.toString()+' is patting '+user.displayName+', cute kitty').setImage(data.imgs.pat.url[3]);
				}else if(message.member.displayName.toString()===user.displayName){
					embed_msg.setDescription(message.member.displayName.toString()+' is patting himself/herself...').setImage(data.imgs.pat.url[1]);
				}else{
					embed_msg.setDescription(message.member.displayName.toString()+' is patting '+user.displayName+'... There, there...').setImage(data.imgs.pat.url[0]);
				}
			}else{
				embed_msg.setDescription(message.member.displayName.toString()+' forgot to mention someone to pat, so he/she decided to pat a random loli, and...').setImage(data.imgs.pat.url[2]);
			}
			message.channel.send(embed_msg).then().catch(console.error)
		}
		
		if(cmd.startsWith('birthday')){
			const user = message.mentions.members.first();
			
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.bday.title);
			
			if(user){
				embed_msg.setDescription(message.member.displayName.toString()+' is wishing '+user.displayName+' a Happy Birthday. Happy Birthday!').setImage(data.imgs.bday.url[0]);
				message.channel.send(embed_msg);
			}else{
				embed_msg.setDescription(message.member.displayName.toString()+' is wishing someone a Happy Birthday. Happy Birthday!').setImage(data.imgs.bday.url[0]);
				message.channel.send(embed_msg);
			}
		}
		
		if(cmd.startsWith('idw')||cmd.startsWith('danya')||cmd.startsWith('da nya')){
			var idw = data.imgs.danya.url;
			const embed_msg = new MessageEmbed()
				.setTitle(data.imgs.danya.title)
				.setImage(idw[Math.floor(Math.random() * idw.length)]);
			
			embed_msg.setDescription('IDW here ! Are you the commander who is willing to adopt me ? I\'ll do my best !');			
			message.channel.send(embed_msg);
		}

		// =========================================================================================================
		// Below this are functions that will be transferred to new Nahida bot
		// =========================================================================================================
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////// Translation Function start
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// if(cmd.startsWith('translate')){
		// 	if(!translation_in_progress){
		// 		cmd = cmd.substr(9).trim();
				
		// 		translate_room = message.channel;
		// 		translation_requester = message.member;
		// 		translation_in_progress = true;
						
		// 		translate_timeout = setTimeout(() => translateTimeout(), 30000);
				
		// 		if(cmd.length==0){
		// 			message.channel.send("What do you want to translate? (type **-cancel** to stop translation)",{
		// 				reply: message.author
		// 			});
		// 		}else{
		// 			translate_from = cmd;
		// 			translate('test', {client: 'gtx', from: translate_from}).then(res => {
		// 				message.channel.send("Translating from "+translate_from+". What do you want to translate? (type **-cancel** to stop translation)",{
		// 					reply: message.author
		// 				});
		// 			}).catch(err => {
		// 				message.channel.send('Gomen, the language ' + translate_from + ' is not known, please try again.')
		// 				clearTimeout(translate_timeout);
		// 				translateReset();
		// 				console.log(err);
		// 			});
		// 		}
		// 	}else{
		// 		message.channel.send("Gomenasai, I am currently translating for someone, please wait until they are done.",{
		// 			reply: message.author
		// 		});
		// 	}
		// 	return;
		// }
		// if(cmd.startsWith('cancel')){
		// 	if(translation_in_progress && message.member == translation_requester){
		// 		message.channel.send("Translation request cancelled");
		// 		clearTimeout(translate_timeout);
		// 		translateReset();
		// 		return;
		// 	}
		// }
		
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////// Translation Function end
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if(cmd.startsWith('convert')){
			var tempC;
			var tempF;
			var tempK;
			
			var distkm;
			var distmile;
			var distyard;
			
			var distcm;
			var distm;
			var distfoot;
			var distinch;
			var converted = false;
			
			var msg = "";
			
			if(cmd.toLowerCase().endsWith('c')){
				tempC = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				tempF = (tempC*9/5)+32;
				tempK = tempC+273.15;
				converted = true;
				msg = tempC +' Celcius is '+tempF.toFixed(2)+' Fahrenheit or '+tempK.toFixed(2)+' Kelvin';
			}else if(cmd.toLowerCase().endsWith('f')){
				tempF = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				tempC = (tempF-32)*5/9;
				tempK = tempC+273.15;
				converted = true;
				msg = tempF +' Fahrenheit is '+tempC.toFixed(2)+' Celcius or '+tempK.toFixed(2)+' Kelvin';
			}else if(cmd.toLowerCase().endsWith('k')){
				tempK = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				tempC = tempK-273.15;
				tempF = (tempC*9/5)+32;
				converted = true;
				msg = tempK +' Kelvin is '+tempC.toFixed(2)+' Celcius or '+tempF.toFixed(2)+' Fahrenheit';
			}
			
			if(cmd.toLowerCase().endsWith('km')||cmd.toLowerCase().endsWith('kilometer')||cmd.toLowerCase().endsWith('kilo meter')){
				distkm = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				distmile = distkm / 1.609;
				distyard = distkm * 1093.613;
				converted = true;
				msg = distkm +' KM is '+distmile.toFixed(2)+' Mile, or ' + distyard.toFixed(2) + ' Yards.';
			}else if(cmd.toLowerCase().endsWith('mile')||cmd.toLowerCase().endsWith('miles')||cmd.toLowerCase().endsWith('mi')){
				distmile= parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				distyard = distmile * 1760;
				distkm  = distmile * 1.609;
				converted = true;
				msg = distmile +' Mile ('+ distyard.toFixed(2) +' Yards) is ' + distkm.toFixed(2) +' Kilometer. For distance in Meter, just multiply KM by 1000. In cm, multiply by 100.000.';
			}else if(cmd.toLowerCase().endsWith('yard')||cmd.toLowerCase().endsWith('yards')||cmd.toLowerCase().endsWith('yd')||cmd.toLowerCase().endsWith('yrd')){
				distyard= parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				distmile = distyard / 1760;
				distkm  = distmile * 1.609;
				converted = true;
				msg = distyard +' Yards is ' + (distkm*1000).toFixed(2) +' Meter. For distance in KM, just divide by 1000. In cm, multiply by 100.';
			}else if(cmd.toLowerCase().endsWith('cm')||cmd.toLowerCase().endsWith('centimeter')||cmd.toLowerCase().endsWith('centi meter')){
				distcm = parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				distfoot = distcm / 30.48;
				distinch = distcm / 2.54;
				converted = true;
				msg = distcm +' CM ('+ (distcm/100).toFixed(2) +' Meter) is '+distfoot.toFixed(2)+' Feet, or '+distinch.toFixed(2)+' Inches ('+Math.floor(distcm / 30.48)+'\''+((distfoot%1)*12).toFixed(0)+')';
			}else if(cmd.toLowerCase().endsWith('m')||cmd.toLowerCase().endsWith('meter')||cmd.toLowerCase().endsWith('meters')){
				distcm = parseFloat(cmd.replace ( /[^\d.-]/g, '' ))*100;
				distfoot = distcm / 30.48;
				distinch = distcm / 2.54;
				converted = true;
				msg = distcm/100 +' M ('+ (distcm).toFixed(2) +' CM) is '+distfoot.toFixed(2)+' Feet, or '+distinch.toFixed(2)+' Inches ('+Math.floor(distcm / 30.48)+'\''+((distfoot%1)*12).toFixed(0)+')';
			}else if(cmd.toLowerCase().endsWith('foot')||cmd.toLowerCase().endsWith('ft')||cmd.toLowerCase().endsWith('feet')){
				distfoot= parseFloat(cmd.replace ( /[^\d.-]/g, '' ));
				distcm = distfoot * 30.48;
				converted = true;
				msg = distfoot +' Feet ('+ (distfoot*12).toFixed(2) +' Inches) is ' + (distcm/100).toFixed(4) +' Meters. For distance in KM, just divide by 1000. In cm, multiply by 100.';
			}else if(cmd.toLowerCase().endsWith('inch')||cmd.toLowerCase().endsWith('inches')){
				distfoot= parseFloat(cmd.replace ( /[^\d.-]/g, '' ))/12;
				distcm = distfoot * 30.48;
				converted = true;
				msg = distfoot*12 +' Inches ('+ distfoot.toFixed(2) +' Feet) is ' + distcm.toFixed(2) +' CM. For distance in Meter, just multiply by 100. In KM, multiply by 100.000.';
			}
			
			if(!converted){
				message.channel.send('Gomen, I don\'t know that unit');
			}else{
				message.channel.send("```"+msg+"```");
			}
		}
		
	}else{
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////// Translation Function start
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		// if(translation_in_progress && message.member == translation_requester && !translation_in_progress_to){
		// 	clearTimeout(translate_timeout);
		// 	translate_timeout = setTimeout(() => translateTimeout(), 10000);
		// 	translation_content = message.content;
		// 	message.channel.send('To which language should I translate?');
		// 	translation_in_progress_to = true;
		// 	return;
		// }
		
		// if(translation_in_progress && message.member == translation_requester && translation_in_progress_to){			
		// 	var translate_to = message.content;
		// 	translation_in_progress_to = true;
			
		// 	if(translate_from == ""){
		// 		translate(translation_content, {client: 'gtx', to: translate_to}).then(res => {
		// 			message.channel.send('Translation to '+translate_to+'```'+res.text+'```',{
		// 				reply: translation_requester
		// 			});
		// 			clearTimeout(translate_timeout);
		// 			translateReset();
		// 		}).catch(err => {
		// 			clearTimeout(translate_timeout);
		// 			translate_timeout = setTimeout(() => translateTimeout(), 10000);
					
		// 			message.channel.send('Gomen, the language ' + translate_to + ' is not known, please try again. (type **-cancel** to stop translation)');
					
		// 			console.log(err);
		// 		});
		// 	}else{
		// 		translate(translation_content, {client: 'gtx', from: translate_from, to: translate_to}).then(res => {
		// 			message.channel.send('Translation to '+translate_to+'```'+res.text+'```',{
		// 				reply: translation_requester
		// 			});
		// 			clearTimeout(translate_timeout);
		// 			translateReset();
		// 		}).catch(err => {
		// 			clearTimeout(translate_timeout);
		// 			translate_timeout = setTimeout(() => translateTimeout(), 10000);
					
		// 			message.channel.send('Gomen, the language ' + translate_to + ' is not known, please try again. (type **-cancel** to stop translation)');
					
		// 			console.log(err);
		// 		});
		// 	}
			
			
		// 	return;
		// }
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////// Translation Function end
		////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// =========================================================================================================
		// End of functions that will be transferred to new Nahida bot
		// =========================================================================================================
		
		if(message.mentions.members.first()||message.content.toLowerCase().endsWith("nadeshiko")){
			var me = false;
			if(typeof message.mentions.members.first() !== "undefined"){
				if(message.mentions.members.first().id==my_id){
					me = true;
				}
			}else if(message.content.toLowerCase().endsWith("nadeshiko")){
				me = true
			}
			if(me){
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
			var msg = message.content.toLowerCase();
			var dad_joke = false;
			if(message.content.toLowerCase().startsWith('i am ')||message.content.toLowerCase().startsWith('i\'m ')||message.content.toLowerCase().startsWith('im ')){
				if(message.content.toLowerCase().startsWith('i am ')){
					var mess = msg.slice(5);
					if(mess.length!=0){
						dad_joke = hi_dad_joke(message.channel,mess);
					}
				}
					
				if(message.content.toLowerCase().startsWith('i\'m ')){
					var mess = msg.slice(4);
					if(mess.length!=0){
						dad_joke = hi_dad_joke(message.channel,mess);
					}
				}
					
				if(message.content.toLowerCase().startsWith('im ')){
					var mess = msg.slice(3);
					if(mess.length!=0){
						dad_joke = hi_dad_joke(message.channel,mess);
					}
				}
			}
			
			if(!dad_joke){
				if(data.responses.sleep.keywords.includes(msg.replace(' now',''))){
					message.channel.send('Good Night, '+message.member.displayName.toString()+', sleep tight.');
				}else if(data.responses.morning.keywords.includes(msg)){
					message.channel.send('Good Morning, '+message.member.displayName.toString()+', I hope your sleep was good.');
				}
			}
			
			// if(msg.startsWith('i am going to sleep')||
				// msg.startsWith('i\'m going to sleep')||
				// msg.startsWith('am going to sleep')||
				// msg.startsWith('im going to sleep')){
				// message.channel.send('Sleep is good. Go to sleep, '+message.member.displayName.toString());
			// }
		}
	}
	
});

// function translateReset(){
// 	translate_room = '';
// 	translation_in_progress = false;
// 	translation_requester = "";
// 	translation_content = "";
// 	translation_in_progress_to = false;
// 	translate_to = "";
// 	translation_in_progress_from = false;
// 	translate_from = "";
// }

// function translateTimeout(){
// 	translate_room.send("Timeout! Please make up your mind faster next time. *pout*",{
// 		reply: translation_requester
// 	});
// 	translateReset()
// }


client.login(process.env.BOT_TOKEN);

///////////////////////////////////////////////////////////////////////////////////////////////////////// Functions /////////////////////////////////////////////////////////////////////////////////////////////////////////

function hi_dad_joke(channel, text){
	if(Math.random()<0.1){
		if(text.split(" ").length - 1 < 3){
			channel.send('Hi '+text+', I am Nadeshiko');
		}
		return true;
	}else{
		return false;
	}
}

function announcement(channel, message, interval){
	if(interval === 0 && annoucement_send_once){
		channel.send(message);
		annoucement_send_once = false
	}else if(interval > 0 && Date.now() > annoucement_last_send){
		channel.send(message);
		annoucement_last_send = annoucement_last_send + interval
	}
}