export const auction = (details) => {
    return {
        title: `${details.title}`,
        description: '**You may now use MILES to gain whitelist spots** from projects you have been eyeing for a long time that happens to be Partners of Concorde also! Bid by pressing the Bid button below.',
        fields: [
            {
                name: '_ _\nDuration',
                value: `<t:${Math.floor(details.end_date.getTime() / 1000)}:R>`,
                inline: true,
            },
            {
                name: '_ _\nMinimum Bid',
                value: `${details.minimum_bid}`,
                inline: true,
            },
        ],
        color: 'f1f10b',
    };
}