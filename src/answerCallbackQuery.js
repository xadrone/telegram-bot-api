'use strict';
const fetch = require('node-fetch');
const botData = require('../bot-settings.json');

function answerCallbackQuery(callbackQueryID, textMsg, showAlert) {
  const queryData = {
    callback_query_id: callbackQueryID,
    text: textMsg,
    show_alert: showAlert,
  };
  return new Promise((resolve, reject) => {
    fetch(`${botData['base-url']}bot${botData.token}/answerCallbackQuery`, {
      method: 'POST',
      body: JSON.stringify(queryData),
      headers: {
        'Content-Type': 'application/json',
      },
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

module.exports.answerCallbackQuery = answerCallbackQuery;
