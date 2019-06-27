/* Setup

   1. Create a .env file (click add file then remane it to .env)

   2. Put "token=" (without quotes) into the .env file followed by your Discord Bot token (No spaces!)

*/

/* If you use uptimerobot to ping, delete this line and line 20

const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

*/

const Discord = require('discord.js');
const talkedRecently = new Set();
const client = new Discord.Client();
const fs = require('fs')
let discrims = fs.readFileSync('./discriminators', 'utf8')
let ids = fs.readFileSync('./ids', 'utf8')

discriminators = discrims.split('|')
ids = ids.split('|')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.guilds.forEach((g) =>{
		console.log(g.name)
	})
});

client.on('message', async message => {
  // Here is where you need to code
  if(message.content == ">>>add" && (!ids.includes(message.author.id))) {
		var newDiscrim = message.author.discriminator + '|'
		fs.appendFile('discriminators', newDiscrim, function (err) {
	  //console.log('Saved!');
		});
		authorid = message.author.id + '|'
		fs.appendFile('ids', authorid, function (err) {})
    message.channel.send({embed: {
  		color: 0x00FF00,
  		description: "We added you discriminator to the list!"
		}})
	} 
	/*
	else(ids.includes(message.author.id)) {
		message.channel.send({embed: {
  	color: 0x00FF00,
  	description: "**Sorry, you already added your ID!**"
		}})
	}
   
	/*
	if(message.content == ">>>all") {
		if(message.member.hasPermission('ADMINISTRATOR')) {
    	var alldiscrims = message.guild.members.map(m=>m.user.discriminator.toString()).join('|')
			console.log(alldiscrims)
			fs.appendFile('discriminators', alldiscrims, function (err) {
				//console.log('error')
			})
 	}
	  else if(!message.member.hasPermission('ADMINISTRATOR')) {
		 message.reply('Sorry, you dont have permission, you may need to ask an **ADMINISTRATOR**!')
		}
	}
*/
	if(message.content == '>>>count') {
		message.reply('So far we have collected ' + (discriminators.length - 1) + ' discriminators!')
	}

	if (message.content.startsWith(">>>ping")) {
		  let ping = Math.round(message.client.ping); 
  const ping1 = new Discord.RichEmbed()
  .setDescription(`:ping_pong: Please wait! It wont take long :) \n if you see this message its probs not a good thing`)
  .setColor("RANDOM");
  message.channel.send({embed: ping1}).then((msg) => {
  const ping2 = new Discord.RichEmbed()
  .addField('__**API:**__', `**${ping} MS**`, true)
  .addField('__**Ping:**__', `**${msg.createdTimestamp - message.createdTimestamp} MS**`, true)
  .setColor('RANDOM')
  .setTimestamp()
  .setFooter('Bot Ping', client.user.avatarURL)
  msg.edit(ping2)
    
	});
};
if (talkedRecently.has(message.author.id))
  return //message.channel.send(`You may only use a command every \`3 seconds\`!`);

// Adds the user to the set so that they can't talk for 2.5 seconds
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 3);
});

client.login(process.env.token);