'use strict';
const Bot = require('./src/botClass.js');
const botData = require('./bot-settings.json');
const {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
} = require('./src/InlineKeyboardMarkup.js');

function main() {
  const bot = new Bot();
  bot.on('cmd', (chat_id, text_msg) => {
    if (text_msg === '/start') {
      const row = [];
      row.push(
        new InlineKeyboardButton().setText('hello').setCallbackData('1'),
        new InlineKeyboardButton().setText('Bye').setCallbackData('2')
      );
      const keyboard = new InlineKeyboardMarkup().addRowButton(row);
      bot.sendMessage('Hello', chat_id, keyboard);
    }
  });

  bot.on('callback_query', (data, id) => {
    //не работает функция при колбэке
    switch (data) {
      case '1':
        bot.answerCallbackQuery(id).then((res) => {
          console.log(res);
          bot.sendMessage('Hello, my friend!', botData.chat_id, undefined);
        });
        break;
      case '2':
        bot.answerCallbackQuery(id).then((res) => {
          console.log(res);
          bot.sendMessage('Good Bye, my friend!', botData.chat_id, undefined);
        });
        break;
    }
  });
  setInterval(() => bot.listen(), 2000);
}

main();
