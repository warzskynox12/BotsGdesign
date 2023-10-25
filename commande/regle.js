module.exports = {
  data: {
    name: "regle",
    description: "afficher le reglement",
  },
  async execute(interaction) {
    if (!interaction.member.permissions.has("Administrator")) {
      return await interaction.reply({
        content: "Vous devez être administrateur pour exécuter cette commande.",
        ephemeral: true, // Réponse visible uniquement pour l'utilisateur qui a exécuté la commande
      });
    }
    const salon = interaction.channel;
    await interaction.reply({
      content:
        "https://cdn.discordapp.com/attachments/1138569066945200242/1166310494060163092/Sans_titre_21_20230815170955.png",
    });

    // Ensuite, envoyer le reste du texte dans un deuxième message d'interaction
    await salon.send({
      content:
        "------- règlement -------\n\n1°) veuillez rester cordial avec tout le monde pour qu'il y ait une bonne entente.\n\n2°) veuillez éviter de spam dans les salons textuels pour que tout le monde puisse s'exprimer sans être interrompu.\n\n3°) Ayez un pseudo correct et identifiable. Qui respecte les règles de discord. (Pas d'insultes dans le pseudo, etc..)\n\n4°) veuillez éviter d'arnaquer nos membres (fausses promesses, pas de paiement, screenshots...) (cela résultera en un bannissement définitif)\n\n5°) Pour une bonne entente entre vous, les modérateurs, et le staff, veuillez rester correct avec eux car ils ne sont pas là pour vous embêter.\n\n6°) Veuillez respecter les différentes utilités des salons ( merci de ne pas écrire dans les salons qui n'y sont pas dédiés par exemple).\n\n7°) Merci de ne pas identifier les fondateurs, ou de mp nos membres. Que ce soit pour des pubs ou autres. Cela sera sanctionné.\n\n------- Sanctions -------\n\nSi une de ces règles n'est pas respectée, des sanctions à la hauteur de la gravité des faits seront mises en place par les modérateurs ou le staff de ce serveur. (Bannissement temporaire, définitif, etc...)\n\nUne fois que vous avez accepté ces règles, venez, on vous attend !",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 3,
              label: "accepte",
              custom_id: "accepte",
            },
            {
              type: 2,
              style: 4,
              label: "refuse",
              custom_id: "refuse",
            },
          ],
        },
      ],
    });
    const { heure } = require("../js/heure.js");
    const formattedTime = heure();
    console.log(
      `[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /regle`
    );
  },
};
