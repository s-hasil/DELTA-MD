const { startWA } = require('./lib/wa');
const { loadCommands, handleMessage } = require('./handlers/commandHandler');

loadCommands();
startWA(async (sock, message) => { await handleMessage(sock, message); });
