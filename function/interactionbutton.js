const fs = require("fs");

async function buttonInteraction(interaction) {
  if (interaction.isButton()) {
    const customId = interaction.customId;
    const user = interaction.user;
    if (customId === "recrutement") {
      const { heure } = require("../js/heure");
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
      const { heure } = require("../js/heure");
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
}
module.exports = {
  buttonInteraction,
};
