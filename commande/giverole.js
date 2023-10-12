module.exports = {
  data: {
    name: "giverole",
    description: "Attribuer un rôle à un utilisateur.",
    options: [
      {
        name: "utilisateur",
        description: "L'utilisateur auquel attribuer le rôle.",
        type: 6,
        required: true,
      },
      {
        name: "role",
        description: "Le rôle à attribuer.",
        type: 8,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    if (!interaction.member.permissions.has("Manage_Roles")) {
      await interaction.reply(
        "Vous n'avez pas la permission de gérer les rôles."
      );
      return;
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
      await user.roles.add(role);
      const { heure } = require("../js/heure.js");
      const formattedTime = heure();

      await interaction.reply(
        `Le rôle ${role.name} a été attribué à ${user.user.tag}.`
      );
      console.log(
        `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /giverole pour donner le role ${role.name} a ${user.user.tag} est cela a fonctionner`
      );
    } catch (error) {
      console.error(error);
      const { heure } = require("../js/heure.js");
      const formattedTime = heure();

      await interaction.reply(
        "Une erreur s'est produite lors de l'attribution du rôle."
      );
      console.log(
        `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /giverole pour donner le role ${role.name} a ${user.user.tag} est cela n'a pas fonctionner`
      );
    }
  },
};
