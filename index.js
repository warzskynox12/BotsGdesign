const { logger } = require("./function/logger");
logger();
const { Client, GatewayIntentBits } = require("discord.js");

const { token } = require("./json/config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
  ],
});
const { heure } = require("./js/heure.js");
const formattedTime = heure();
client.commands = new Map();
console.log(`[${formattedTime}] le bots est demarer`);
const repeatCommand = require("./commande/repeat");
client.commands.set(repeatCommand.data.name, repeatCommand);
const giveRoleCommand = require("./commande/giverole");
client.commands.set(giveRoleCommand.data.name, giveRoleCommand);
const newchannelcommand = require("./commande/newchannel");
client.commands.set(newchannelcommand.data.name, newchannelcommand);
const removeRoleCommand = require("./commande/removerole");
client.commands.set(removeRoleCommand.data.name, removeRoleCommand);
const button = require("./commande/button");
client.commands.set(button.data.name, button);
const paypal = require("./commande/paypal");
client.commands.set(paypal.data.name, paypal);
const regle = require("./commande/regle");
client.commands.set(regle.data.name, regle);
const COMMANDS_DATA = [
  repeatCommand.data,
  giveRoleCommand.data,
  newchannelcommand.data,
  removeRoleCommand.data,
  button.data,
  paypal.data,
  regle.data,
];
const { handleReadyEvent } = require("./function/readyEvent");
client.once("ready", async () => {
  await handleReadyEvent(client, COMMANDS_DATA);
});
const { handleGuildMemberAddEvent } = require("./function/guildMemberAddEvent");
client.on("guildMemberAdd", (member) => {
  handleGuildMemberAddEvent(member);
});
const {
  handleInteractionCreateEvent,
} = require("./function/interactionCreateEvent");
client.on("interactionCreate", async (interaction) => {
  await handleInteractionCreateEvent(interaction, client);
});

function collectCategories() {
  const fs = require("fs");
  const categoriesData = [];
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      if (channel.type === 4) {
        const name = channel.name;
        const id = channel.id;
        categoriesData.push({
          name: name,
          id: id,
        });
      }
    });
  });
  fs.writeFile(
    "./json/categories.json",
    JSON.stringify(categoriesData, null, 2),
    (err) => {
      if (err) throw err;
    }
  );
}
collectCategories();
setInterval(collectCategories, 60000);
const { buttonInteraction } = require("./function/interactionbutton");
client.on("interactionCreate", async (interaction) => {
  await buttonInteraction(interaction);
});

const { handleGuildMemberAdd } = require("./function/guildMemberAddHandler");
client.on("guildMemberAdd", async (member) => {
  await handleGuildMemberAdd(member);
});
const { handleIncomingMessage } = require("./function/messageCreateHandler");
client.on("messageCreate", async (message) => {
  await handleIncomingMessage(message);
});
client.login(token);
