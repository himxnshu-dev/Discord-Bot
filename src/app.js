const {Client, GatewayIntentBits} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on("messageCreate", (msg) => {
  console.log(msg.content);

  if (msg.author.bot) return;

  if (msg.content.startsWith('create')) {
    const url = msg.content.split(' ')[1];
    if (!url) return msg.reply("Please enter a URL after the 'create' command");
    return msg.reply("Generating short URL for " + url);
  } else {
    return msg.reply("Hello, I am a bot!");
  }
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong");
});

client.login(process.env.DISCORD_TOKEN);