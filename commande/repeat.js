module.exports = {
  data: {
    name: "repeat",
    description: "Répétez ce que vous dites ou affichez une image!",
    options: [
      {
        name: "type_de_contenu",
        description: "Type de contenu à répéter",
        type: 3,
        required: true,
        choices: [
          {
            name: "Texte",
            value: "text",
          },
          {
            name: "Image",
            value: "image",
          },
        ],
      },
      {
        name: "contenu",
        description: "Le contenu à répéter",
        type: 3,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const typeDeContenu = interaction.options.getString("type_de_contenu");
    const contenu = interaction.options.getString("contenu");

    if (typeDeContenu === "text") {
      const { heure } = require("../js/heure.js");
      const formattedTime = heure();
      await interaction.reply(contenu, {
        allowedMentions: { parse: ["users", "roles", "everyone"] },
      });

      console.log(
        `[${formattedTime}] la personne ${interaction.user.tag} a utiliser la commande /repeat pour du text est a reussi`
      );
    } else if (typeDeContenu === "image") {
      const imageUrls = contenu.split("\n");

      if (imageUrls.length === 0) {
        await interaction.reply("Aucune URL d'image n'a été fournie.");
        const { heure } = require("../js/heure.js");
        const formattedTime = heure();
        console.log(
          `[${formattedTime}] ${interaction.user.tag}: l'image n'a pas ete repeter`
        );
        return;
      }

      const files = imageUrls.map((url) => {
        return { attachment: url };
      });

      await interaction.reply({ files });
      const { heure } = require("../js/heure.js");
      const formattedTime = heure();

      console.log(
        `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande / repeat pour les image est a reussi`
      );
    }
  },
};
