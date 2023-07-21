'use strict';
const { getMe } = require('./getMe.js');
const { sendMessage } = require('./sendMessage.js');
const { getUpdates } = require('./getUpdates.js');

exports.getMe = getMe;
exports.sendMessage = sendMessage;
exports.getUpdates = getUpdates;