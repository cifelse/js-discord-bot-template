import { Client, Collection, Intents } from 'discord.js';
import { messageReactionAddHandler } from "./src/handlers/messageReactionAddHandler.js"
import { messageCreateHandler } from "./src/handlers/messageCreateHandler.js";
import { buttonHandler } from "./src/handlers/buttonHandler.js"
import { startJobs } from "./src/handlers/jobHandler.js" 
import { keys } from './src/utils/keys.js'
import { runTestScripts } from './src/handlers/testsHandler.js';
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
    console.log(`Cif Lite: Online and Ready as ${client.user.tag}`);

    // Retrieve Concorde
    const guild = client.guilds.cache.get(keys.hangar.id);
    if (!concorde) {
        console.log(`Chase: I can't find Concorde. Double check the Guild ID.`);
        return;
    }

    runTestScripts(guild);
    startJobs(guild);
});

client.login(process.env.TOKEN);