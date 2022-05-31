import { Client, Collection, Intents } from 'discord.js';
import { messageReactionAddHandler } from "./src/handlers/message-reaction-add-handler.js";
import { messageCreateHandler } from "./src/handlers/message-create-handler.js";
import { buttonHandler } from "./src/handlers/button-handler.js";
import { startJobs } from "./src/handlers/job-handler.js";
import { keys } from "./src/utils/keys.js";
import fs from 'fs';
import 'dotenv/config';

const client = new Client({ 
	intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
	partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION'
    ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = await import(`./src/commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Listening for messages sent
client.on('messageCreate', message => {
	try { await messageCreateHandler(message); }
    catch (e) { console.error(e); }
});

// Listening for reactions added
client.on('messageReactionAdd', async (reaction, user) => {
	try { await messageReactionAddHandler(reaction, user); } 
	catch (e) { console.error(e); }
});

// Listening for interactions created
client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        try { await command.execute(interaction, client); }
        catch (e) { console.error(e); }
	}
	if (interaction.isButton()) {
		try { await buttonHandler(interaction, client); }
        catch (e) { console.error(e); }
	}
});

client.once('ready', () => {
    console.log(`Discord Bot: Online and Ready as ${client.user.tag}`);

    // Retrieve Specific Guild
    const guild = client.guilds.cache.get(keys.guild.id);
    if (!guild) {
        console.log(`Discord Bot: I can't find the Guild. Double check the Guild ID.`);
        return;
    }

    startJobs(guild);
});

client.login(process.env.TOKEN);