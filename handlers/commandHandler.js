const fs = require('fs');
const path = require('path');
const config = require('../config');

const commands = new Map();

function loadCommands() {
  const dir = path.join(__dirname, '..', 'commands');
  fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(file => {
    const cmd = require(path.join(dir, file));
    if (cmd && cmd.name) commands.set(cmd.name, cmd);
  });
}

function parseBody(message) {
  try {
    return message.message.conversation || (message.message.extendedTextMessage && message.message.extendedTextMessage.text) || '';
  } catch (e) { return ''; }
}

async function handleMessage(sock, message) {
  const body = parseBody(message);
  if (!body) return;
  if (!body.startsWith(config.prefix)) return;

  const args = body.slice(config.prefix.length).trim().split(/\s+/);
  const cmdName = args.shift().toLowerCase();
  const cmd = commands.get(cmdName);
  if (!cmd) return;

  try { await cmd.execute({ sock, message, args, config }); }
  catch (e) { console.error('Command error:', e); }
}

module.exports = { loadCommands, handleMessage };
