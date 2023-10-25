let fs = require("fs");
const grafiste = require("../json/user.json");
let un = grafiste.un.id;
//ticket de recrutement
async function buttonInteraction(interaction) {
  if (interaction.isButton()) {
    let customId = interaction.customId;
    let user = interaction.user;
    if (customId === "recrutement") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let guild = interaction.guild;
      let salon = await guild.channels.create({
        name: `recrutement ${user.username}`,
        type: 0,
        parent: "1162449293676912680",
      });
      let everyoneRole = interaction.guild.roles.everyone;
      let member = interaction.member;
      await salon.permissionOverwrites.edit(everyoneRole, {
        ViewChannel: false,
      });
      await salon.permissionOverwrites.edit(member, {
        ViewChannel: true,
      });
      let channelInfo = {
        id: salon.id,
        name: salon.name,
      };
      let channels = [];
      try {
        let data = fs.readFileSync("./json/channels.json", "utf8");
        channels = JSON.parse(data);
      } catch (err) {
        console.error("Error reading file:", err);
      }
      channels.push(channelInfo);
      fs.writeFileSync(
        "./json/channels.json",
        JSON.stringify(channels, null, 2),
        "utf8"
      );

      await interaction.reply({
        content: `votre ticket de recrutement a etait cree`,
        ephemeral: true,
      });
    }
    //fermer les ticket
    else if (customId === "fermer") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      await interaction.reply({
        content: `voulais vous vraiment fermer le ticket ?`,
        ephemeral: true,
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 4,
                label: "oui",
                custom_id: "oui",
              },
            ],
          },
        ],
      });
    } else if (customId === "oui") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let salon = interaction.channel;
      await salon.setParent("1164981074888233082");
      let member = interaction.member;
      let everyoneRole = interaction.guild.roles.everyone;
      await salon.permissionOverwrites.edit(everyoneRole, {
        ViewChannel: true,
        SendMessages: false,
      });
      await salon.permissionOverwrites.edit(member, {
        ViewChannel: true,
        SendMessages: false,
      });
      let men = await salon.guild.members.fetch("761486907430404098");
      await salon.permissionOverwrites.edit(men, {
        ViewChannel: true,
        SendMessages: false,
      });
      await interaction.reply({
        content: `le ticket est fermer`,
        ephemeral: true,
      });
    }
    //suprime le ticket
    else if (customId === "suprimer") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      await interaction.reply({
        content: `voulais vous vraiment suprimer le ticket ?`,
        ephemeral: true,
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 4,
                label: "confirmé",
                custom_id: "confirmé",
              },
            ],
          },
        ],
      });
    } else if (customId === "confirmé") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let salon = interaction.channel;
      await salon.delete();
      let channels = [];
      try {
        let data = fs.readFileSync("./json/channels.json", "utf8");
        channels = JSON.parse(data);
      } catch (err) {
        console.error("Error reading file:", err);
      }
      let index = channels.findIndex((e) => e.id === salon.id);
      channels.splice(index, 1);
    }
    //creation de ticket avec des atiste
    //artiste = max17gaming
    else if (customId === "24711391") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let guild = interaction.guild;
      let salon = await guild.channels.create({
        name: `${user.username}-commande`,
        type: 0,
        parent: "1163729833768005642",
      });
      let everyoneRole = interaction.guild.roles.everyone;
      let member = interaction.member;

      await salon.permissionOverwrites.create(everyoneRole, {
        ViewChannel: false,
      });

      await salon.permissionOverwrites.create(member, {
        ViewChannel: true,
      });
      let men = await salon.guild.members.fetch("923281967712186368");
      await salon.permissionOverwrites.create(men, {
        ViewChannel: true,
        UseApplicationCommands: true,
      });
      let channelInfo = {
        categorie: "max17gaming",
        id: salon.id,
        name: salon.name,
      };
      let channels = [];
      try {
        let data = fs.readFileSync("./json/channels.json", "utf8");
        channels = JSON.parse(data);
      } catch (err) {
        console.error("Error reading file:", err);
      }
      channels.push(channelInfo);
      fs.writeFileSync(
        "./json/channels.json",
        JSON.stringify(channels, null, 2),
        "utf8"
      );
      await interaction.reply({
        content: `votre ticket de commande a etait cree`,
        ephemeral: true,
      });
      await salon.send({
        embeds: [
          {
            title: `Commande de ${user.username}`,
            color: 0x00ffff,
            description: `Bonjour ${men} vous avez été contacté par ${user.username} pour une commande\n${user} Veuillez fournir les détails de ce que vous voulez, précisément`,
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 2,
                label: "Fermer",
                custom_id: "fermer",
              },
              {
                type: 2,
                style: 4,
                label: "suprimer",
                custom_id: "suprimer",
              },
            ],
          },
        ],
      });
    }
    //reglement accepter ou refuser
    else if (customId === "accepte") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let member = interaction.member;
      await member.roles.add("1166336700327395430");
      await member.roles.remove("1166336793931685968");
      await interaction.reply({
        content: `vous avez accepter le reglement`,
        ephemeral: true,
      });
    } else if (customId === "refuse") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let member = interaction.member;
      await member.roles.add("1166336793931685968");
      await member.roles.remove("1166336700327395430");
      await interaction.reply({
        content: `vous avez refuser le reglement`,
        ephemeral: true,
      });
    }
    // artiste = ""
    else if (customId === /*id button grphiste*/ "") {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] le button ${customId} a etait utilisé par ${
          user.username
        }`
      );
      let guild = interaction.guild;
      let salon = await guild.channels.create({
        name: `${user.username}-commande`,
        type: 0,
        parent: "1163729833768005642",
      });
      let everyoneRole = interaction.guild.roles.everyone;
      let member = interaction.member;

      await salon.permissionOverwrites.create(everyoneRole, {
        ViewChannel: false,
      });

      await salon.permissionOverwrites.create(member, {
        ViewChannel: true,
      });
      let men = await salon.guild.members.fetch(""); //id du graphiste
      await salon.permissionOverwrites.create(men, {
        ViewChannel: true,
        UseApplicationCommands: true,
      });
      let channelInfo = {
        categorie: "", //nom de l'utilisateur
        id: salon.id,
        name: salon.name,
      };

      let channels = [];
      try {
        let data = fs.readFileSync("./json/channels.json", "utf8");
        channels = JSON.parse(data);
      } catch (err) {
        console.error("Error reading file:", err);
      }

      channels.push(channelInfo);

      fs.writeFileSync(
        "./json/channels.json",
        JSON.stringify(channels, null, 2),
        "utf8"
      );

      await interaction.reply({
        content: `votre ticket de commande a etait cree`,
        ephemeral: true,
      });
      await salon.send({
        embeds: [
          {
            title: `Commande de ${user.username}`,
            color: 0x00ffff,
            description: `Bonjour ${men} vous avez été contacté par ${user.username} pour une commande\n${user} Veuillez fournir les détails de ce que vous voulez, précisément`,
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 2,
                label: "Fermer",
                custom_id: "fermer",
              },
              {
                type: 2,
                style: 4,
                label: "suprimer",
                custom_id: "suprimer",
              },
            ],
          },
        ],
      });
    } else if (customId === "id") {
      interaction.reply({ content: `${un}`, ephemeral: true });
      console.log(`un = ${un}`);
    } else {
      let { heure } = require("../js/heure");
      console.log(
        `[${heure()}] Le bouton ${customId} a été cliqué par ${
          user.username
        }! mes se bonton ne fait rien`
      );
    }
  }
}

module.exports = {
  buttonInteraction,
};
