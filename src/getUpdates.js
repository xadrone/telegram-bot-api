const fetch = require('node-fetch');
const botData = require('../bot-settings.json');

function getUpdates() {
  return new Promise((resolve, reject) => {
    fetch(`${botData['base-url']}bot${botData.token}/getUpdates`)
      .then(async (res) => {
        res
          .json()
          .then((resJson) => {
            resolve(resJson['result']);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

module.exports.getUpdates = getUpdates;
