const config = require('../config');
module.exports = {
  name: 'menu',
  desc: 'Shows menu',
  async execute({ sock, message }) {
    const text = `*DELTA-MD Menu*\nOwner: ${config.owner.name} (${config.owner.number})\nCommands:\n- .ping\n- .menu\n- .owner`;
    await sock.sendMessage(message.key.remoteJid, { text });
  }
};
