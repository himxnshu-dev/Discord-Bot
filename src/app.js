const {Client, GatewayIntentBits, Events} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () =>
  console.log("the discord bot is connected!")
);

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

client.on("messageCreate", (msg) => {
  console.log(msg.content);

  if (msg.author.bot) return;

  //   if (msg.content.startsWith("create")) {
  //     const url = msg.content.split(" ")[1];
  //     if (!url) return msg.reply("Please enter a URL after the 'create' command");
  //     return msg.reply("Generating short URL for " + url);
  //   } else {
  //     return msg.reply("Hello, I am a bot!");
  //   }

  return msg.reply("Hello, I am a bot!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong");
  }

  if (interaction.commandName === "create") {
    await interaction.deferReply();
    const longURL = interaction.options.getString("url");
    if (!longURL) return interaction.editReply("Please enter a valid URL");

    try {
      const response = await fetch(`${process.env.DISCORD_URL}/url`, {
        method: "POST",
        headers: {
          'X-API-KEY': process.env.URL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: longURL,
        }),
      });

      if (!response.ok)
        throw new Error(
          `API responded with the status code ${response.status}`
        );

      const data = await response.json();
      const shortURL = data.shortURL;

      await interaction.editReply(`Short URL generated: ${shortURL}`);
    } catch (error) {
      console.log("Error occurred:", error);
      await interaction.editReply("Something went wrong, please try again!");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);