'use strict';
const fetch = require('node-fetch');
const botData = require('../bot-settings.json');

function sendPhoto(chatID, photoID) {
  const queryData = {
    chat_id: chatID,
    photo: photoID,
  };
  return new Promise((resolve, reject) => {
    fetch(`${botData['base-url']}bot${botData.token}/sendPhoto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
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

module.exports.sendPhoto = sendPhoto;
