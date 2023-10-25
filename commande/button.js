const grafiste = require("../json/user.json");
const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("../json/config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
  ],
});
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
        choices: [
          {
            name: grafiste.un.name,
            value: grafiste.un["code-fi"],
          },
          {
            name: grafiste.deux.name,
            value: grafiste.deux["code-fi"],
          },
          {
            name: grafiste.quatre.name,
            value: grafiste.quatre["code-fi"],
          },
          {
            name: grafiste.cinq.name,
            value: grafiste.cinq["code-fi"],
          },
          {
            name: grafiste.six.name,
            value: grafiste.six["code-fi"],
          },
          {
            name: grafiste.sept.name,
            value: grafiste.sept["code-fi"],
          },
          {
            name: grafiste.huit.name,
            value: grafiste.huit["code-fi"],
          },
          {
            name: grafiste.neuf.name,
            value: grafiste.neuf["code-fi"],
          },
          {
            name: grafiste.dix.name,
            value: grafiste.dix["code-fi"],
          },
          {
            name: "recrutement",
            value: "recrutement",
          },
        ],
      },
    ],
  },

  async execute(interaction) {
    if (!interaction.member.permissions.has("Administrator")) {
      return await interaction.reply({
        content: "Vous devez être administrateur pour exécuter cette commande.",
        ephemeral: true,
      });
    }

    const { heure } = require("../js/heure");
    console.log(
      `[${heure()}] la commande /crée-bouton a été utilisée par ${
        interaction.user.tag
      }`
    );
    const customId = interaction.options.getString("id");
    const customname = interaction.options.getString("nom");
    const customstyle = interaction.options.getString("style");
    if (customId === "recrutement") {
      await interaction.reply({
        embeds: [
          {
            title: `Recrutement`,
            color: 0x00ffff,
            description: `Si vous avez des qualités que nous recherchons, ouvrez un ticket!\n
            On cherche :
            -Développeur Web
            -Monteur
            -désigner
            -Modelisateur\n
            Cliquez sur ouvrir un ticket pour vous présenter`,
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 2,
                label: `📩 Ouvrir un ticket`,
                custom_id: "recrutement",
              },
            ],
          },
        ],
      });
    } else if (
      customId === grafiste.un["code-fi"] ||
      customId === grafiste.deux["code-fi"] ||
      customId === grafiste.quatre["code-fi"] ||
      customId === grafiste.cinq["code-fi"] ||
      customId === grafiste.six["code-fi"] ||
      customId === grafiste.sept["code-fi"] ||
      customId === grafiste.huit["code-fi"] ||
      customId === grafiste.neuf["code-fi"] ||
      customId === grafiste.dix["code-fi"]
    ) {
      if (customId === grafiste.un["code-fi"]) {
        nom = grafiste.un;
      } else if (customId === grafiste.deux["code-fi"]) {
        nom = grafiste.deux;
      } else if (customId === grafiste.quatre["code-fi"]) {
        nom = grafiste.quatre;
      } else if (customId === grafiste.cinq["code-fi"]) {
        nom = grafiste.cinq;
      } else if (customId === grafiste.six["code-fi"]) {
        nom = grafiste.six;
      } else if (customId === grafiste.sept["code-fi"]) {
        nom = grafiste.sept;
      } else if (customId === grafiste.huit["code-fi"]) {
        var nom = grafiste.huit;
      } else if (customId === grafiste.neuf["code-fi"]) {
        nom = grafiste.neuf;
      } else if (customId === grafiste.dix["code-fi"]) {
        nom = grafiste.dix;
      }
      const salon = interaction.channel;
      await salon.send({
        content: `l'artiste <@${nom.id}>`,
        embeds: [
          {
            title: `presentation de ${nom.name}`,
            color: 0x00ffff,
            fields: [
              {
                name: "**Description**",
                value: nom.description,
              },
              {
                name: "**portfolio**",
                value: nom.portfolio,
              },
              {
                name: "**Prix**",
                value: nom.prix,
              },
            ],
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 2,
                label: `📩 Ouvrir un ticket`,
                custom_id: customId,
              },
            ],
          },
        ],
      });
      await interaction.reply({
        content: `Le bouton a été crée`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: customstyle,
                label: customname,
                custom_id: customId,
              },
            ],
          },
        ],
      });
    }
  },
};
client.login(token);
