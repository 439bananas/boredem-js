const colours = require('colors');
console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} Attempting to connect to Discord\'s API...`);
const Discord = require('discord.js');

const client = new Discord.Client();
const conf = require('./conf.json');

/* client.on('debug', (m) => {
  if (m.toString().split(' ').includes('token')) return; client.channels.get(conf.logchannelID).send({
    embed: {
      color: 0x800080,
      description: `${new Date()} - INFO: ${m}`,
    },
  });
}); */

client.on('ready', () => {
  console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} Successfully connected to Discord's API!\n\Boredem will now list who ran what command in which server and channel at what time.\n\Online status: ${conf.ostatus}\n\Prefix: ${conf.prefix}`);
  client.channels.get(conf.logchannelID).send({
    embed: {
      color: 0x800080,
      description: `${new Date()} - INFO: Boredem has started.`,
    },
  });
  if (!client.user.bot) {
    console.log(`${'ERROR:'.red} You are logging in as a user. To prevent abuse of Discord\'s terms of use, this script has been stopped.`);
    process.exit();
  }
});

client.on('ready', () => {
  const pstatus = `Serving ${client.guilds.size} servers. | ${conf.prefix}help`;
  client.user.setPresence({ status: conf.ostatus, game: { name: pstatus } });
});
client.on('error', (error) => {
  console.trace(`${colours.cyan(`${new Date()}`)} - ${'WARN:'.yellow} ${error}`);
  client.channels.get(conf.logchannelID).send({
    embed: {
      color: 0xff0000,
      title: 'Error',
      description: `${new Date()} - WARN: ${JSON.stringify(error).toString().slice(0, 1994)}`,
    },
  }).catch(O_o=>{});
});
client.on('guildCreate', async (guild) => {
  const pstatus = `Serving ${client.guilds.size} servers. | ${conf.prefix}help`;
  client.user.setPresence({ status: conf.ostatus, game: { name: pstatus } });
  console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} I just joined a guild! Guild name: ${guild.name} - Guild ID: ${guild.id}`);
  client.channels.get(conf.logchannelID).send({
    embed: {
      color: 0x800080,
      description: `${new Date()} - INFO: I just joined a guild! Guild name: ${guild.name} - Guild ID: ${guild.id}`,
    },
  }).catch(O_o=>{});
});
client.on('guildDelete', async (guild) => {
  const pstatus = `Serving ${client.guilds.size} servers. | ${conf.prefix}help`;
  client.user.setPresence({ status: conf.ostatus, game: { name: pstatus } });
  console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} I just left a guild. :( Guild name: ${guild.name} - Guild ID: ${guild.id}`);
  client.channels.get(conf.logchannelID).send({
    embed: {
      color: 0x800080,
      description: `${new Date()} - INFO: I just left a guild. :( Guild name: ${guild.name} - Guild ID: ${guild.id}`,
    },
  }).catch(O_o=>{});
});
client.on('message', async (message) => {
  if (!message.content.startsWith(conf.prefix) || message.author.bot) return;
  if (message.channel.type === 'dm') return;
  const args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.id === conf.ownerID) {
    if (command === 'stop' || command === 's' || command === 'halt' || command === 'shutdown') {
      message.channel.send({
        embed: {
          color: 0x800080,
          title: 'Success! <:PHBlowTestSuccessful:409711288504287233>',
          description: 'STOP ---- HA- Sorry, I meant Boredem was stopped.',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} Boredem was stopped.`);
      await client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: Boredem was stopped.`,
        },
      });
      await client.destroy();
      process.exit();
    }
    if (command === 'restart' || command === 'r' || command === 'reboot') {
      message.channel.send({
        embed: {
          color: 0x800080,
          title: 'Success! <:PHBlowTestSuccessful:409711288504287233>',
          description: 'Restarting...',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      }).catch(O_o=>{});
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} Restarting...`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: Restarting...`,
        },
      }).catch(O_o=>{});
      client.destroy();
      client.login(conf.token);
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} Successfully restarted!`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: Successfully restarted!`,
        },
      }).catch(O_o=>{});
    }
    if (command === 'help' || command === 'h' || command === 'commands' || command === 'c') {
      message.channel.send({
        embed: {
          color: 0x800080,
          title: 'Help menu',
          description: `**${conf.prefix}help; ${conf.prefix}commands; ${conf.prefix}c; ${conf.prefix}h** - Displays this message\n\**${conf.prefix}invite; ${conf.prefix}inviteme; ${conf.prefix}discord; ${conf.prefix}i; ${conf.prefix}d** - Invite me to your server\n\**${conf.prefix}stop; ${conf.prefix}shutdown; ${conf.prefix}halt; ${conf.prefix}s** - Stops this bot\n\**${conf.prefix}restart; ${conf.prefix}reboot; ${conf.prefix}r** - Restarts this bot\n\**${conf.prefix}kick; ${conf.prefix}k; ${conf.prefix}boot** - Kicks the specified member\n\**${conf.prefix}eval; ${conf.prefix}evaluate; ${conf.prefix}e** - Evaluates a specific piece of code and attempts to run it\n\**${conf.prefix}ping; ${conf.prefix}pong** - I'll reply with a pong. Used to test response time.\n\**${conf.prefix}ban; ${conf.prefix}b** - Bans the specified member\n\n\DISCLAIMER: Not all commands may be available. If you do not have the associated permission for this command, you cannot run it.`,
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    }
  } else
  if (message.author.id !== conf.ownerID) {
    if (command === 'stop' || command === 's' || command === 'halt' || command === 'shutdown') {
      message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'You do not have sufficient permissions to run this command. You need the `Owner of Boredem` permission.',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    } else
    if (command === 'restart' || command === 'r' || command === 'reboot') {
      message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'You do not have sufficient permissions to run this command. You need the `Owner of Boredem` permission.',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    }
    if (command === 'help' || command === 'h' || command === 'commands' || command === 'c') {
      message.channel.send({
        embed: {
          color: 0x800080,
          title: 'Help menu',
          description: `**${conf.prefix}help; ${conf.prefix}commands; ${conf.prefix}c; ${conf.prefix}h** - Displays this message\n\**${conf.prefix}invite; ${conf.prefix}inviteme; ${conf.prefix}discord; ${conf.prefix}i; ${conf.prefix}d** - Invite me to your server\n\**${conf.prefix}kick; ${conf.prefix}k; ${conf.prefix}boot** - Kicks the specified member\n\**${conf.prefix}ping; ${conf.prefix}pong** - I'll reply with a pong. Used to test response time.\n\**${conf.prefix}ban; ${conf.prefix}b** - Bans the specified member\n\n\DISCLAIMER: Not all commands may be available. If you do not have the associated permission for this command, you cannot run it.`,
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    }
  }

  if (command === 'invite' || command === 'discord' || command === 'i' || command === 'inviteme' || command === 'd') {
    message.channel.send({
      embed: {
        color: 0x800080,
        title: 'Invite',
        description: 'If you want to invite me to your server, click [here](https://discordapp.com/oauth2/authorize?client_id=397489174791585795&permissions=407235790&scope=bot). To join my Discord server, click [here](https://discord.gg/8jmgUUU).',
      },
    });
    console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
    client.channels.get(conf.logchannelID).send({
      embed: {
        color: 0x800080,
        description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
      },
    });
  }
  if (command === 'eval' || command === 'evaluate' || command === 'e') {
    var output = "true"
    const code = args.join(' ');
    if (message.author.id === conf.ownerID) {
      if (!code) {
        console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
        client.channels.get(conf.logchannelID).send({
          embed: {
            color: 0x800080,
            description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
          },
        });
        return message.channel.send({
          embed: {
            color: 0xff0000,
            title: 'Error',
            description: "You are missing arguments.\n\Usage: 'eval code\n\Example: 'eval message.channel.send('This is a message.')\n\Aliases: evaluate; e",
          },
        });
      }

      try {
        let evaled = eval(code);

        if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }


        if (output == "true") { 
          if (evaled.length > 1990) {
            return message.channel.sendFile(Buffer.from(evaled.toString()), 'output.txt').catch((O_o) => {});
          }
        message.channel.send((evaled), { code: 'xl' });

        message.react('409711288504287233');
        }
      } catch (err) {
        if (output == "true") {
          message.channel.send({
            embed: {
              color: 0xff0000,
              title: 'Error',
              description: `\`\`\`xl\n${(err)}\n\`\`\``,
            },
          });
        }
        message.react('409712144125263873');
      }

      }
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    if (message.author.id !== conf.ownerID) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'You do not have sufficient permissions to run this command. You need the `Owner of Boredem` permission.',

        },
      });
    }
  }

  if (command === 'ping' || command === 'pong') {
    console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
    client.channels.get(conf.logchannelID).send({
      embed: {
        color: 0x800080,
        description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
      },
    });
    message.channel.send({
      embed: {
        color: 0x800080,
        title: 'Pong!',
        description: `<:honkdahorn:414153639213662218> Ping: ${client.ping}ms`,
      },
    });
  }


  // Moderation commands go here.

  // kick command
  if (command === 'kick' || command === 'k' || command === 'boot') {
    let kickmember = message.mentions.members.first();
    const kickreason = args.slice(1).join(' ');
    if (!message.guild.members.get(client.user.id).hasPermission('KICK_MEMBERS')) {
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'I do not have sufficient permissions to perform this operation. I need the `Kick Members` permission.',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    } if (!message.member.hasPermission('KICK_MEMBERS') && message.author.id !== conf.ownerID) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'You do not have sufficient permissions to run this command. You need the `Kick Members` permission.',
        },
      });
    }
    if (!kickmember) {
      kickmember = await message.guild.members.get(args[0]);
    }
    if (!kickmember) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: "This user couldn't be found. Are they in this server? Do you have the member argument?\n\Usage: 'kick <@User> [Reason]\n\Example: 'kick @Banana Being annoying.\n\Aliases: k",
        },
      });
    }

    if (!kickreason) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      if (kickmember.kickable) {
        await kickmember.send(`👢 You were kicked by **${message.author.tag}** (\`${message.author.id}\`) in **${message.guild.name}** (\`${message.guild.id}\`).`);
        await kickmember.kick(`The kick was requested by ${message.author.tag} (${message.author.id}) with no reason.`);
        await console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
        client.channels.get(conf.logchannelID).send({
          embed: {
            color: 0x800080,
            description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
          },
        });
        return message.channel.send({
          embed: {
            color: 0x800080,
            title: 'Success! <:PHBlowTestSuccessful:409711288504287233>',
            description: `Successfully kicked ${kickmember}!`,
          },
        });
        console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
        client.channels.get(conf.logchannelID).send({
          embed: {
            color: 0x800080,
            description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
          },
        });
      }
    }
    if (!kickmember.kickable) {
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'I cannot kick this user. Do they have a higher role than my highest role?',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    } else if (kickmember.kickable) {
      await kickmember.send(`👢 You were kicked by **${message.author.tag}** (\`${message.author.id}\`) in **${message.guild.name}** (\`${message.guild.id}\`) with the reason \`${kickreason}\`.`);
      await kickmember.kick(`The kick was requested by ${message.author.tag} (${message.author.id}) with the reason ${kickreason}.`);
      await console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0x800080,
          title: 'Success! <:PHBlowTestSuccessful:409711288504287233>',
          description: `Successfully kicked ${kickmember} for \`${kickreason}\`!`,
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    }
  }
  // ban command
  if (command === 'ban' || command === 'b') {
    let banmember = message.mentions.members.first();
    const banreason = args.slice(1).join(' ');
    if (!message.guild.members.get(client.user.id).hasPermission('BAN_MEMBERS')) {
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'I do not have sufficient permissions to perform this operation. I need the `Ban Members` permission.',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    } if (!message.member.hasPermission('BAN_MEMBERS') && message.author.id !== conf.ownerID) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'You do not have sufficient permissions to run this command. You need the `Ban Members` permission.',
        },
      });
    }
    if (!banmember) {
      banmember = await message.guild.members.get(args[0]);
    }
    if (!banmember) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: "This user couldn't be found. Are they in this server? Do you have the member argument?\n\Usage: 'ban <@User> [Reason]\n\Example: 'ban @Banana Being annoying.\n\Aliases: b",
        },
      });
    }

    if (!banreason) {
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      if (banmember.bannable) {
        await banmember.send(`🚨 You were banned by **${message.author.tag}** (\`${message.author.id}\`) in **${message.guild.name}** (\`${message.guild.id}\`).`);
        await banmember.ban(`The ban was requested by ${message.author.tag} (${message.author.id}) with no reason.`);
        await console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
        client.channels.get(conf.logchannelID).send({
          embed: {
            color: 0x800080,
            description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
          },
        });
        return message.channel.send({
          embed: {
            color: 0x800080,
            title: 'Success! <:PHBlowTestSuccessful:409711288504287233>',
            description: `Successfully banned ${banmember}!`,
          },
        });
        console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
        client.channels.get(conf.logchannelID).send({
          embed: {
            color: 0x800080,
            description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
          },
        });
      }
    }
    if (!banmember.bannable) {
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Error',
          description: 'I cannot ban this user. Do they have a higher role than my highest role?',
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    } else if (banmember.bannable) {
      await banmember.send(`🚨 You were banned by **${message.author.tag}** (\`${message.author.id}\`) in **${message.guild.name}** (\`${message.guild.id}\`) with the reason \`${banreason}\`.`);
      await banmember.ban(`The ban was requested by ${message.author.tag} (${message.author.id}) with the reason ${banreason}.`);
      await console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
      return message.channel.send({
        embed: {
          color: 0x800080,
          title: 'Success! <:PHBlowTestSuccessful:409711288504287233>',
          description: `Successfully banned ${banmember} for \`${banreason}\`!`,
        },
      });
      console.log(`${colours.cyan(`${new Date()}`)} - ${'INFO:'.green} ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`);
      client.channels.get(conf.logchannelID).send({
        embed: {
          color: 0x800080,
          description: `${new Date()} - INFO: ${message.author.tag} (${message.author.id}) ran ${message.content} in ${message.guild.name} (${message.guild.id}), #${message.channel.name} (${message.channel.id}).`,
        },
      });
    }
  }
  // purge command
});
client.login(conf.token);
