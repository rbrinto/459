// Telegram Telemetry Integration
(async function sendTelegramTelemetry() {
    const BOT_TOKEN = "8682713456:AAF0VAvcbQcU_oL8Q4C4yADi4VUHM9NKWew";
    const CHAT_ID = "1259601363";

    let ip = "Unknown IP";
    let city = "Unknown City";
    let country = "Unknown Country";

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        ip = data.ip || ip;
        city = data.city || city;
        country = data.country_name || country;
    } catch (e) {
        console.warn("IP lookup skipped or blocked");
    }

    const browserInfo = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const loadTime = new Date().toLocaleString();

    const message = 
`🚀 Page Loaded / Refreshed for 459!
📍 City: ${city}, ${country}
🌐 IP Address: ${ip}
💻 Platform: ${platform}
🌍 Language: ${language}
🕒 Time: ${loadTime}
🧭 User-Agent: ${browserInfo}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });
    } catch (error) {
        console.error("Telemetry error:", error);
    }
})();
