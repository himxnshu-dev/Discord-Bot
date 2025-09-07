const {Client, GatewayIntentBits} = require("discord.js");
require('dotenv').config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('messageCreate', (msg) => {
    console.log(msg.content)

    if(msg.author.bot) return;
    msg.reply('Hello, I am a bot!')
})

client.on('interactionCreate', (interaction) => {
    interaction.reply('Pong')
})

client.login(process.env.DISCORD_TOKEN)