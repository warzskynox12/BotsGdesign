const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });
client.commands = new Map();

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
        await interaction.reply(contenu, { allowedMentions: { parse: ['users', 'roles', 'everyone'] } });
      } else if (typeDeContenu === 'image') {
        const imageUrls = contenu.split('\n');
  
        if (imageUrls.length === 0) {
          await interaction.reply("Aucune URL d'image n'a été fournie.");
          return;
        }
  
        const files = imageUrls.map(url => {
          return { attachment: url };
        });
  
        await interaction.reply({ files });
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
            await interaction.reply(`Le rôle ${role.name} a été attribué à ${user.user.tag}.`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors de l'attribution du rôle.");
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
            await interaction.reply(`Le rôle ${role.name} a été enlevé à ${user.user.tag}.`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Une erreur s'est produite lors de l'enlèvement du rôle.");
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
        console.log('Commandes globales enregistrées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes globales :', error);
    }
});

client.on('guildMemberAdd', member => {
    const salonBienvenueId = '1093238297494556734'; 
    const salonBienvenue = member.guild.channels.cache.get(salonBienvenueId);

    if (salonBienvenue) {
        salonBienvenue.send(`Bienvenue sur le serveur, <@${member.user.id}> ! N'hésitez pas à vous présenter. :smile: `);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
return;
}

try {
    await command.execute(interaction);
} catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
}});let punishments = {}; try { const data = fs.readFileSync('./punishments.json'); punishments = JSON.parse(data); } catch (error) { console.error('Erreur lors du chargement du fichier punishments.json :', error); }client.on('messageCreate', async message => { if (message.author.bot) { return; }const forbiddenUserIds = ['1042761953011060786', '1093555185265152080', '1093897244975059115'];
const isAdministrator = message.member.permissions.has('8');

const mentionedUsers = message.mentions.users;
const repliedMessage = message.reference ? await message.channel.messages.fetch(message.reference.messageId) : null;
const salonpunitionId = 'id du salon de punition'// Remplacez par l'ID réel du salon
if (!isAdministrator && mentionedUsers.size > 0) {
    const mentionedForbiddenUser = mentionedUsers.some(user => forbiddenUserIds.includes(user.id));

    if (mentionedForbiddenUser && (!repliedMessage || !forbiddenUserIds.includes(repliedMessage.author.id))) {
        const userId = message.author.id;

        if (!punishments[userId]) {
            punishments[userId] = {
                infractions: 1,
                lastInfraction: Date.now(),
                name:message.author.id
            };
        } else {
            punishments[userId].infractions += 1;
            punishments[userId].lastInfraction = Date.now();
            punishments[userId].name=message.author.id;
            const nombre_d_infraction = punishments[userId].infractions
        }
        if(punishments[userId].infractions === 3){
            salonpunitionId.send(`le menbre ${member.user.id} n'a pas respecter les regle ${nombre_d_infraction} fois`);
        }

        fs.writeFileSync('./punishments.json', JSON.stringify(punishments, null, 4));

        const channel = message.channel;

        if (!repliedMessage) {
            const replyMessage = await channel.send(`Vous n'avez pas le droit de mentionner cette personne, <@${message.author.id}>!`);
            message.delete().catch(console.error);
        }
    }
}});client.login(token);