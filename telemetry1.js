(async function sendSimpleNotification() {
    const BOT_TOKEN = "8883521027:AAEgR7ta8_PSP3pFQYyh6_VxtThQ_cAU3Ds";
    const CHAT_ID = "1259601363";
    const MESSAGE = "Kutta";

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: MESSAGE
            })
        });

        if (response.ok) {
            console.log("Notification sent successfully!");
        } else {
            console.error("Failed to send notification. Response status:", response.status);
        }
    } catch (error) {
        console.error("Network or API error:", error);
    }
})();
