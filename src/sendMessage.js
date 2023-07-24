'use strict';
const fetch = require('node-fetch');
const botData = require('../bot-settings.json');

function sendMessage(textMessage, chatId, keyboard) {
  const queryData = {
    chat_id: chatId,
    text: textMessage,
  };
  return new Promise((resolve, reject) => {
    fetch(`${botData['base-url']}bot${botData.token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        keyboard != undefined
          ? JSON.stringify(Object.assign(queryData, { reply_markup: keyboard }))
          : JSON.stringify(queryData),
    })
      .then(async (res) => {
        res
          .json()
          .then((resJson) => resolve(resJson))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

module.exports.sendMessage = sendMessage;
