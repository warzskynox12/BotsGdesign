const categories = require("../json/categories.json");

module.exports = {
  data: {
    name: "newchannel",
    description: "Attribuer un rôle à un utilisateur.",
    options: [
      {
        name: "nom",
        description: "Le nom du salon à créer.",
        type: 3,
        required: true,
      },
      {
        name: "category",
        description: "La catégorie dans laquelle créer le salon.",
        type: 3, // Utilisez le type 3 pour les chaînes de caractères (STRING)
        required: true,
        choices: categories.map((category) => ({
          name: category.name,
          value: category.id,
        })),
      },
    ],
  },

  async execute(interaction) {
    const nom = interaction.options.getString("nom");
    const categoryId = interaction.options.getString("category");

    // Trouver la catégorie correspondante dans le fichier JSON
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );
    const { heure } = require("../js/heure");
    const formattedTime = heure();
    if (selectedCategory) {
      const guild = interaction.guild;
      const salon = await guild.channels.create({
        name: nom,
        type: 0,
        parent: selectedCategory.id,
      });
      const everyoneRole = interaction.guild.roles.everyone;
      const member = interaction.member;

      await salon.permissionOverwrites.edit(everyoneRole, {
        ViewChannel: false,
      });

      await salon.permissionOverwrites.edit(member, {
        ViewChannel: true,
      });
      console.log(
        `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /newchannel pour creer le salon ${salon} est cela a fonctionner`
      );

      await interaction.reply(
        `Le salon ${salon} a été créé avec succès dans la catégorie ${selectedCategory.name}`
      );
    } else {
      console.error(
        `[${formattedTime}] La catégorie ${categoryId} n'existe pas.`
      );
      await interaction.reply(
        "Catégorie invalide. Veuillez choisir une catégorie valide."
      );
    }
  },
};
