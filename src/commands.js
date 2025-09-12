import {REST, Routes, ApplicationCommandOptionType} from "discord.js";
import "dotenv/config";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "create",
    description: "gives back a short URL",
    options: [
      {
        name: "url",
        description: "the long url",
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
