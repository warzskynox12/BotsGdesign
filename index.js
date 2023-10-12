const fs = require("fs");

const formatted = require("./js/txt.js");

const path = require("path");
const logFolder = path.join(__dirname, "logs");
const logFileName = `logs_${formatted.formattedTime}.txt`;
const logFilePath = path.join(logFolder, logFileName);
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

console.log = (...args) => {
  const logMessage = args.join(" ");
  logStream.write(`${logMessage}\n`);
  process.stdout.write(`${logMessage}\n`);
};

const { heure } = require("./js/heure.js");
const formattedTime = heure();
console.log(
  `       ####################### logs du ${formattedTime} du bots discord Gdesign #######################`
);
console.log(
  `       ####                                                                                          ####`
);
console.log(
  `       ####                                                                                          ####`
);
console.log(
  `       ##################################################################################################`
);
console.log("    ");

//bots discord
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

const COMMANDS_DATA = [
  repeatCommand.data,
  giveRoleCommand.data,
  newchannelcommand.data,
  removeRoleCommand.data,
  button.data,
  paypal.data,
];

client.once("ready", async () => {
  try {
    client.application.commands.set(COMMANDS_DATA);
    const { heure } = require("./js/heure.js");
    const formattedTime = heure();

    console.log(
      `[${formattedTime}] Commandes globales enregistrées avec succès.`
    );
  } catch (error) {
    const { heure } = require("./js/heure.js");
    const formattedTime = heure();

    console.error(
      `[${formattedTime}] Erreur lors de l'enregistrement des commandes globales :`,
      error
    );
  }
});

client.on("guildMemberAdd", (member) => {
  const salonBienvenueId = "1093238297494556734";
  const salonBienvenue = member.guild.channels.cache.get(salonBienvenueId);

  if (salonBienvenue) {
    const { heure } = require("./js/heure.js");
    const formattedTime = heure();

    salonBienvenue.send(
      `Bienvenue sur le serveur, <@${member.user.id}> ! N'hésitez pas à vous présenter. :smile: `
    );
    console.log(
      `[${formattedTime}] ${member.user.id} est arriver sur le server`
    );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    const { heure } = require("./js/heure.js");
    const formattedTime = heure();
    formattedTime;
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: `Il y a eu une erreur lors de l'exécution de cette commande !`,
      ephemeral: true,
    });
  }
});
let punishments = {};
try {
  const data = fs.readFileSync("./json/punishments.json");
  punishments = JSON.parse(data);
} catch (error) {
  console.error(
    "Erreur lors du chargement du fichier punishments.json :",
    error
  );
}
client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }
  const forbiddenUserIds = [
    "1042761953011060786",
    "1093555185265152080",
    "1093897244975059115",
  ];
  const isAdministrator = message.member.permissions.has("8");

  const mentionedUsers = message.mentions.users;
  const repliedMessage = message.reference
    ? await message.channel.messages.fetch(message.reference.messageId)
    : null;

  if (!isAdministrator && mentionedUsers.size > 0) {
    const mentionedForbiddenUser = mentionedUsers.some((user) =>
      forbiddenUserIds.includes(user.id)
    );

    if (
      mentionedForbiddenUser &&
      (!repliedMessage || !forbiddenUserIds.includes(repliedMessage.author.id))
    ) {
      const userId = message.author.id;

      if (!punishments[userId]) {
        punishments[userId] = {
          infractions: 1,
          lastInfraction: Date.now(),
          name: message.author.id,
        };
        console.log(
          `[${formattedTime.heure()}]: ${
            message.author.id
          } a mentioner une personne interdit`
        );
      } else {
        punishments[userId].infractions += 1;
        punishments[userId].lastInfraction = Date.now();
        punishments[userId].name = message.author.id;
        const { heure } = require("./js/heure.js");
        const formattedTime = heure();

        console.log(
          `[${formattedTime}] ${message.author.id} a mentioner une personne interdit ${punishments[userId].infractions} fois`
        );
      }
      if (punishments[userId].infractions > 2) {
        const salonpunitionId = "1144244443034157167"; // Remplacez par l'ID réel du salon
        const salonpunition = message.guild.channels.cache.get(salonpunitionId);
        if (salonpunition) {
          const { heure } = require("./js/heure.js");
          const formattedTime = heure();

          salonpunition.send(
            `Le membre <@${message.author.id}> n'a pas respecté les règles ${punishments[userId].infractions} fois.`
          );
          console.log(
            `[${formattedTime.heure}] Un messge a etait envoyer dans le cannale nombre de sanction car l'utilisateur a trop de fois enfrait les réglet`
          );
        }
      }

      fs.writeFileSync(
        "./json/punishments.json",
        JSON.stringify(punishments, null, 4)
      );

      const channel = message.channel;
      if (!repliedMessage) {
        message.delete().catch(console.error);
        await channel.send(
          `Vous n'avez pas le droit de mentionner cette personne, <@${message.author.id}>!`
        );
      }
    }
  }
});
client.on("guildMemberAdd", async (member) => {
  // Vérifiez si le membre a rejoint le serveur que vous voulez gérer
  if (member.id === "761486907430404098") {
    const roleIdToAssign = "1138780122888019968"; // Remplacez par l'ID du rôle

    try {
      const roleToAssign = await member.guild.roles.fetch(roleIdToAssign);

      if (roleToAssign) {
        // Attribuez le rôle au nouveau membre
        member.roles.add(roleToAssign);
        const { heure } = require("./js/heure.js");
        const formattedTime = heure();

        console.log(`[${formattedTime}] Rôle attribué à ${member.user.tag}`);
      }
    } catch (error) {
      const { heure } = require("./js/heure.js");
      const formattedTime = heure();

      console.error(
        `[${formattedTime}] Erreur lors de l'attribution du rôle : ${error}`
      );
    }
  }
});

function collectCategories() {
  const categoriesData = [];

  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      if (channel.type === 4) {
        categoriesData.push({
          name: channel.name,
          id: channel.id,
        });
      }
    });
  });

  // Écriture des données des catégories dans le fichier categories.json
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

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const customId = interaction.customId;
    const user = interaction.user;
    if (customId === "recrutement") {
      const { heure } = require("./js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );

      const guild = interaction.guild;
      const salon = await guild.channels.create({
        name: `recrutement ${user.username}`,
        type: 0,
        parent: "1133271794447556609",
      });
      const everyoneRole = interaction.guild.roles.everyone;
      const member = interaction.member;

      await salon.permissionOverwrites.edit(everyoneRole, {
        ViewChannel: false,
      });

      await salon.permissionOverwrites.edit(member, {
        ViewChannel: true,
      });

      // Enregistrez les informations du canal dans un objet
      const channelInfo = {
        id: salon.id,
        name: salon.name,
      };

      // Lisez le fichier JSON existant ou créez un nouveau tableau vide
      let channels = [];
      try {
        const data = fs.readFileSync("./json/channels.json", "utf8");
        channels = JSON.parse(data);
      } catch (err) {
        console.error("Error reading file:", err);
      }

      // Ajoutez les informations du canal à la liste
      channels.push(channelInfo);

      // Écrivez la liste mise à jour dans le fichier JSON
      fs.writeFileSync(
        "./json/channels.json",
        JSON.stringify(channels, null, 2),
        "utf8"
      );

      await interaction.reply({
        content: `le ticket a etait cree`,
        ephemeral: true,
      });
    } else {
      const { heure } = require("./js/heure");
      console.log(
        `[${heure()}] Le bouton ${customId} a été cliqué par ${
          user.username
        }! mes se bonton ne fait rien`
      );
      await interaction.reply({
        content: `vous avaez click sur un boutton qui na pas d'interaction`,
        ephemeral: true,
      });
    }
  }
});

client.login(token);
