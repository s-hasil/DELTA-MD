const config = require('../config');
module.exports = {
  name: 'owner',
  desc: 'Shows owner contact',
  async execute({ sock, message }) {
    await sock.sendMessage(message.key.remoteJid, { text: `Owner: ${config.owner.name}\nContact: ${config.owner.number}` });
  }
};
