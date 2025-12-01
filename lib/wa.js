const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@adiwajshing/baileys');
const pino = require('pino');
const logger = pino({ level: 'info' });
const config = require('../config');

async function startWA(onMessage) {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions/' + config.sessionId);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({ logger, printQRInTerminal: true, auth: state, version });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const reason = (lastDisconnect.error && lastDisconnect.error.output) ? lastDisconnect.error.output.statusCode : null;
      logger.info('Connection closed: ' + JSON.stringify(reason));
      if (lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        startWA(onMessage);
      }
    } else if (connection === 'open') {
      logger.info('Connected');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.remoteJid === 'status@broadcast') return;
    await onMessage(sock, msg);
  });

  return sock;
}

module.exports = { startWA };

