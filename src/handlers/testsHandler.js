import { keys } from "../utils/keys.js";

const { frequentFlyers, premiumEconomy } = keys.concorde.roles.levels;

export const runTestScriptOne = async (guild) => {
    
    // Sample Script
    await guild.members.fetch().then(members => {
        members.forEach(async (member) => {
            const roles = member.roles.cache
            if (roles.has(frequentFlyers) && roles.has(premiumEconomy)) {
                await member.roles.remove(premiumEconomy).then(console.log(`Removed Premium Economy for ${member.id}`));
            }
        })
    })
}

export const runTestScriptTwo = async (guild) => {

}