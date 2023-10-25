module.exports = {
  data: {
    name: "removerole",
    description: "Enlever un rôle à un utilisateur.",
    options: [
      {
        name: "utilisateur",
        description: "L'utilisateur auquel enlever le rôle.",
        type: 6,
        required: true,
      },
      {
        name: "role",
        description: "Le rôle à enlever.",
        type: 8,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    if (!interaction.member.permissions.has("Administrator")) {
      return await interaction.reply({
        content: "Vous devez être administrateur pour exécuter cette commande.",
        ephemeral: true, // Réponse visible uniquement pour l'utilisateur qui a exécuté la commande
      });
    }

    const user = interaction.options.getMember("utilisateur");
    const role = interaction.options.getRole("role");

    if (!user || !role) {
      await interaction.reply(
        "Veuillez fournir un utilisateur et un rôle valides."
      );
      return;
    }

    try {
      await user.roles.remove(role);
      const { heure } = require("../js/heure.js");
      const formattedTime = heure();

      await interaction.reply(
        `Le rôle ${role.name} a été enlevé à ${user.user.tag}.`
      );
      console.log(
        `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /removerole pour enlever le role ${role.name} a ${user.user.tag} est cela a fonctionner`
      );
    } catch (error) {
      console.error(error);
      const { heure } = require("../js/heure.js");
      const formattedTime = heure();

      await interaction.reply(
        "Une erreur s'est produite lors de l'enlèvement du rôle."
      );
      console.log(
        `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /removerole pour enlever le role ${role.name} a ${user.user.tag} est cela n'a pas fonctionner`
      );
    }
  },
};
