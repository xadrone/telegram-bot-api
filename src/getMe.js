const fetch = require('node-fetch');
const botData = require('../bot-settings.json');

function getMe() {
  return new Promise((resolve, reject) => {
    fetch(`${botData['base-url']}bot${botData.token}/getMe`)
      .then(async (res) => {
        res
          .json()
          .then((resJson) => resolve(resJson))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

module.exports.getMe = getMe;
