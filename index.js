const fs = require('fs');
const ftpClient = require('ftp');
//formation de la variable de la date
const maintenant = new Date();
const annee = maintenant.getFullYear();
const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
const jour = String(maintenant.getDate()).padStart(2, '0');
const heure = maintenant.getHours();
const minutes = String(maintenant.getMinutes()).padStart(2, '0');
const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;

console.log("Il est " + formattedTime + " actuellement.");
//logs enregistre
const path = require('path')
const maintenant2 = new Date();
const annee2 = maintenant2.getFullYear();
const mois2 = String(maintenant2.getMonth() + 1).padStart(2, '0');
const jour2 = String(maintenant2.getDate()).padStart(2, '0');
const heure2 = maintenant2.getHours();
const minutes2 = String(maintenant2.getMinutes()).padStart(2, '0');
const formattedDateTime = `${jour2}-${mois2}-${annee2}_${heure2}h${minutes2}`;
const logFolder = path.join(__dirname, 'logs');
const logFileName = `logs_${formattedDateTime}.txt`;
const logFilePath = path.join(logFolder, logFileName);
if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
}
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
// Sauvegarder le log dans un fichier et afficher sur le terminal
console.log = (...args) => {
    const logMessage = args.join(' ');
    logStream.write(`${logMessage}\n`);
    process.stdout.write(`${logMessage}\n`); // Afficher dans le terminal
};
// ... (votre code existant)
console.log(`       ###################### logs du ${jour2}/${mois2}/${annee2} à ${heure2}:${minutes2} du bots discord Gdesign ######################`)
console.log(`       ###                                                                                          ###`)
console.log(`       ###                                                                                          ###`)
console.log(`       ################################################################################################`)
console.log(`  `)

//bots discord
const { Client, GatewayIntentBits, Message } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });
client.commands = new Map();
console.log(`[${formattedTime}] le bots est demarer`)
const repeatCommand = {
    data: {
      name: 'repeat',
      description: 'Répétez ce que vous dites ou affichez une image!',
      options: [
        {
          name: 'type_de_contenu',
          description: 'Type de contenu à répéter',
          type: 3,
          required: true,
          choices: [
            {
              name: 'Texte',
              value: 'text',
            },
            {
              name: 'Image',
              value: 'image',
            },
          ],
        },
        {
          name: 'contenu',
          description: 'Le contenu à répéter',
          type: 3,
          required: true,
        },
      ],
    },
    async execute(interaction) {
      const typeDeContenu = interaction.options.getString('type_de_contenu');
      const contenu = interaction.options.getString('contenu');
  
      if (typeDeContenu === 'text') {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
        const jour = String(maintenant.getDate()).padStart(2, '0');
        const heure = maintenant.getHours();
        const minutes = String(maintenant.getMinutes()).padStart(2, '0');
        const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
        await interaction.reply(contenu, { allowedMentions: { parse: ['users', 'roles', 'everyone'] } });
        console.log(`[${formattedTime}] la personne ${interaction.user.tag} a utiliser la commande /repeat pour du text est a reussi`)
      } else if (typeDeContenu === 'image') {
        const imageUrls = contenu.split('\n');
  
        if (imageUrls.length === 0) {
          await interaction.reply("Aucune URL d'image n'a été fournie.");
          const maintenant = new Date();
          const annee = maintenant.getFullYear();
          const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
          const jour = String(maintenant.getDate()).padStart(2, '0');
          const heure = maintenant.getHours();
          const minutes = String(maintenant.getMinutes()).padStart(2, '0');
          const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
          console.log(`[${formattedTime}] ${interaction.user.tag}: l'image n'a pas ete repeter`)
          return;
        }
  
        const files = imageUrls.map(url => {
          return { attachment: url };
        });
  
        await interaction.reply({ files });
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
        const jour = String(maintenant.getDate()).padStart(2, '0');
        const heure = maintenant.getHours();
        const minutes = String(maintenant.getMinutes()).padStart(2, '0');
        const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;

        console.log(`[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande / repeat pour les image est a reussi`)
        
      }
    },
};
client.commands.set(repeatCommand.data.name, repeatCommand);

const giveRoleCommand = {
    data: {
        name: 'giverole',
        description: 'Attribuer un rôle à un utilisateur.',
        options: [
            {
                name: 'utilisateur',
                description: "L'utilisateur auquel attribuer le rôle.",
                type: 6,
                required: true,
            },
            {
                name: 'role',
                description: 'Le rôle à attribuer.',
                type: 8,
                required: true,
            },
        ],
    },
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            await interaction.reply("Vous n'avez pas la permission de gérer les rôles.");
            return;
        }

        const user = interaction.options.getMember('utilisateur');
        const role = interaction.options.getRole('role');

        if (!user || !role) {
            await interaction.reply("Veuillez fournir un utilisateur et un rôle valides.");
            return;
        }

        try {
            await user.roles.add(role);
            const maintenant = new Date();
            const annee = maintenant.getFullYear();
            const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
            const jour = String(maintenant.getDate()).padStart(2, '0');
            const heure = maintenant.getHours();
            const minutes = String(maintenant.getMinutes()).padStart(2, '0');
            const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  
            await interaction.reply(`Le rôle ${role.name} a été attribué à ${user.user.tag}.`);
            console.log(`[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /giverole pour donner le role ${role.name} a ${user.user.tag} est cela a fonctionner`)
        } catch (error) {
            console.error(error);
            const maintenant = new Date();
            const annee = maintenant.getFullYear();
            const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
            const jour = String(maintenant.getDate()).padStart(2, '0');
            const heure = maintenant.getHours();
            const minutes = String(maintenant.getMinutes()).padStart(2, '0');
            const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  
            await interaction.reply("Une erreur s'est produite lors de l'attribution du rôle.");
            console.log(`[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /giverole pour donner le role ${role.name} a ${user.user.tag} est cela n'a pas fonctionner`)
        }
    },
};
client.commands.set(giveRoleCommand.data.name, giveRoleCommand);

const removeRoleCommand = {
    data: {
        name: 'removerole',
        description: 'Enlever un rôle à un utilisateur.',
        options: [
            {
                name: 'utilisateur',
                description: "L'utilisateur auquel enlever le rôle.",
                type: 6,
                required: true,
            },
            {
                name: 'role',
                description: 'Le rôle à enlever.',
                type: 8,
                required: true,
            },
        ],
    },
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            await interaction.reply("Vous n'avez pas la permission de gérer les rôles.");
            return;
        }

        const user = interaction.options.getMember('utilisateur');
        const role = interaction.options.getRole('role');

        if (!user || !role) {
            await interaction.reply("Veuillez fournir un utilisateur et un rôle valides.");
            return;
        }

        try {
            await user.roles.remove(role);
            const maintenant = new Date();
            const annee = maintenant.getFullYear();
            const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
            const jour = String(maintenant.getDate()).padStart(2, '0');
            const heure = maintenant.getHours();
            const minutes = String(maintenant.getMinutes()).padStart(2, '0');
            const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  
            await interaction.reply(`Le rôle ${role.name} a été enlevé à ${user.user.tag}.`);
            console.log(`[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /removerole pour enlever le role ${role.name} a ${user.user.tag} est cela a fonctionner`)
        } catch (error) {
            console.error(error);
            const maintenant = new Date();
            const annee = maintenant.getFullYear();
            const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
            const jour = String(maintenant.getDate()).padStart(2, '0');
            const heure = maintenant.getHours();
            const minutes = String(maintenant.getMinutes()).padStart(2, '0');
            const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  
            await interaction.reply("Une erreur s'est produite lors de l'enlèvement du rôle.");
            console.log(`[${formattedTime}] l'utilisateur ${interaction.user.tag} a utiliser la commande /removerole pour enlever le role ${role.name} a ${user.user.tag} est cela n'a pas fonctionner`)
        }
    },
};
client.commands.set(removeRoleCommand.data.name, removeRoleCommand);

const COMMANDS_DATA = [
    repeatCommand.data,
    giveRoleCommand.data,
    removeRoleCommand.data,
];

client.once('ready', async () => {
    try {
        await client.application.commands.set(COMMANDS_DATA);
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
        const jour = String(maintenant.getDate()).padStart(2, '0');
        const heure = maintenant.getHours();
        const minutes = String(maintenant.getMinutes()).padStart(2, '0');
        const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;

        console.log(`[${formattedTime}] Commandes globales enregistrées avec succès.`);
    } catch (error) {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
        const jour = String(maintenant.getDate()).padStart(2, '0');
        const heure = maintenant.getHours();
        const minutes = String(maintenant.getMinutes()).padStart(2, '0');
        const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;

        console.error(`[${formattedTime}] Erreur lors de l\'enregistrement des commandes globales :`, error);
    }
});

client.on('guildMemberAdd', member => {
    const salonBienvenueId = '1093238297494556734'; 
    const salonBienvenue = member.guild.channels.cache.get(salonBienvenueId);

    if (salonBienvenue) {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
        const jour = String(maintenant.getDate()).padStart(2, '0');
        const heure = maintenant.getHours();
        const minutes = String(maintenant.getMinutes()).padStart(2, '0');
        const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;

        salonBienvenue.send(`Bienvenue sur le serveur, <@${member.user.id}> ! N'hésitez pas à vous présenter. :smile: `);
        console.log(`[${formattedTime}]: ${member.user.id} est arriver sur le server`)
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
        const jour = String(maintenant.getDate()).padStart(2, '0');
        const heure = maintenant.getHours();
        const minutes = String(maintenant.getMinutes()).padStart(2, '0');
        const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;

        console.error(`[${formattedTime}]: Impossible de trouver de commande correspondant à ${interaction.commandName}.`);
return;
}

try {
    await command.execute(interaction);
} catch (error) {
    console.error(error);
    await interaction.reply({ content: `Il y a eu une erreur lors de l'exécution de cette commande !`, ephemeral: true });
}});let punishments = {}; try { const data = fs.readFileSync('./punishments.json'); punishments = JSON.parse(data); } catch (error) { console.error('Erreur lors du chargement du fichier punishments.json :', error); }client.on('messageCreate', async message => { if (message.author.bot) { return; }const forbiddenUserIds = ['1042761953011060786', '1093555185265152080', '1093897244975059115'];
const isAdministrator = message.member.permissions.has('8');

const mentionedUsers = message.mentions.users;
const repliedMessage = message.reference ? await message.channel.messages.fetch(message.reference.messageId) : null;

if (!isAdministrator && mentionedUsers.size > 0) {
    const mentionedForbiddenUser = mentionedUsers.some(user => forbiddenUserIds.includes(user.id));

    if (mentionedForbiddenUser && (!repliedMessage || !forbiddenUserIds.includes(repliedMessage.author.id))) {
        const userId = message.author.id;

        if (!punishments[userId]) {
            punishments[userId] = {
                infractions: 1,
                lastInfraction: Date.now(),
                name:message.author.id,
            };
            console.log(`[${formattedTime}]: ${message.author.id} a mentioner une personne interdit`);
        } else {
            punishments[userId].infractions += 1;
            punishments[userId].lastInfraction = Date.now();
            punishments[userId].name=message.author.id;
            const maintenant = new Date();
            const annee = maintenant.getFullYear();
            const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
            const jour = String(maintenant.getDate()).padStart(2, '0');
            const heure = maintenant.getHours();
            const minutes = String(maintenant.getMinutes()).padStart(2, '0');
            const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  
            console.log(`[${formattedTime}]: ${message.author.id} a mentioner une personne interdit ${punishments[userId].infractions} fois`);
            
        }
        if (punishments[userId].infractions > 2) {
            const salonpunitionId = '1144244443034157167'; // Remplacez par l'ID réel du salon
            const salonpunition = message.guild.channels.cache.get(salonpunitionId);
            if (salonpunition) {
                const maintenant = new Date();
                const annee = maintenant.getFullYear();
                const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
                const jour = String(maintenant.getDate()).padStart(2, '0');
                const heure = maintenant.getHours();
                const minutes = String(maintenant.getMinutes()).padStart(2, '0');
                const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
      
                salonpunition.send(`Le membre <@${message.author.id}> n'a pas respecté les règles ${punishments[userId].infractions} fois.`);
                console.log(`[${formattedTime}]: Un messge a etait envoyer dans le cannale nombre de sanction car l'utilisateur a trop de fois enfrait les réglet`);
            }
        }

        fs.writeFileSync('./punishments.json', JSON.stringify(punishments, null, 4));

        const channel = message.channel;

        if (!repliedMessage) {
            const replyMessage = await channel.send(`Vous n'avez pas le droit de mentionner cette personne, <@${message.author.id}>!`);
            message.delete().catch(console.error);
        }
    }
}});
client.on('guildMemberAdd', async (member) => {
    // Vérifiez si le membre a rejoint le serveur que vous voulez gérer
    if (member.id === '761486907430404098') {
        const roleIdToAssign = '1138780122888019968'; // Remplacez par l'ID du rôle

        try {
            const roleToAssign = await member.guild.roles.fetch(roleIdToAssign);

            if (roleToAssign) {
                // Attribuez le rôle au nouveau membre
                member.roles.add(roleToAssign);
                const maintenant = new Date();
                const annee = maintenant.getFullYear();
                const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
                const jour = String(maintenant.getDate()).padStart(2, '0');
                const heure = maintenant.getHours();
                const minutes = String(maintenant.getMinutes()).padStart(2, '0');
                const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
      
                console.log(`[${formattedTime}]: Rôle attribué à ${member.user.tag}`);
            }
        } catch (error) {
            const maintenant = new Date();
            const annee = maintenant.getFullYear();
            const mois = String(maintenant.getMonth() + 1).padStart(2, '0');
            const jour = String(maintenant.getDate()).padStart(2, '0');
            const heure = maintenant.getHours();
            const minutes = String(maintenant.getMinutes()).padStart(2, '0');
            const formattedTime = `${jour}/${mois}/${annee} - ${heure}h${minutes}`;
  
            console.error(`[${formattedTime}]: Erreur lors de l'attribution du rôle : ${error}`);
        }
    }
});

client.login(token);