module.exports = {
  data: {
    name: "crée-bouton",
    description: "Crée un bouton",
    options: [
      {
        name: "nom",
        description: "nom du bouton",
        type: 3,
        required: true,
      },
      {
        name: "style",
        description: "style du bouton",
        type: 3,
        required: true,
        choices: [
          {
            name: "bleue",
            value: "1",
          },
          {
            name: "gris",
            value: "2",
          },
          {
            name: "vert",
            value: "3",
          },
          {
            name: "rouge",
            value: "4",
          },
        ],
      },
      {
        name: "id",
        description: "id du bouton",
        type: 3,
        required: true,
      },
    ],
  },

  async execute(interaction) {
    const { heure } = require("../js/heure");
    console.log(
      `[${heure()}] la commande /crée-bouton a été utilisée par ${
        interaction.user.tag
      }`
    );
    const customId = interaction.options.getString("id");
    const customname = interaction.options.getString("nom");
    const customstyle = interaction.options.getString("style");

    await interaction.reply({
      content: "Cliquez sur le bouton ci-dessous :",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: customstyle, // 1 pour PRIMARY, 2 pour SECONDARY, 3 pour SUCCESS, 4 pour DANGER
              label: customname,
              custom_id: customId,
            },
          ],
        },
      ],
    });
  },
};
