import { keys } from "../keys";

// You may use constant values from Keys
const { embedColor } = keys;

export const createEmbed = (title, timestamp, minimumBid) => {
    return {
        title: `${title}`,
        description: '**<place your descriptions here>** Add more descriptions here!',
        fields: [
            {
                name: '_ _\nDuration',
                value: `<t:${timestamp}:R>`,
                inline: true,
            },
            {
                name: '_ _\nMinimum Bid',
                value: `${minimumBid}`,
                inline: true,
            },
        ],
        color: embedColor,
    }
}