'use strict';
const Emitter = require('events');
const { getMe } = require('./getMe.js');
const { sendMessage } = require('./sendMessage.js');
const { getUpdates } = require('./getUpdates.js');
const { answerCallbackQuery } = require('./answerCallbackQuery.js');
const botData = require('../bot-settings.json');

function maxMsgId(msgData) {
  let count = 0;
  for (let i = 0; i < msgData.result.length; i++) {
    count = Math.max(msgData.result[i].update_id, count);
  }
  return count;
}

class Bot extends Emitter {
  constructor() {
    super();
    this.offset = 0;
  }

  getMe() {
    return getMe();
  }
  sendMessage(text, chatId, keyboard) {
    return sendMessage(text, chatId, keyboard);
  }
  answerCallbackQuery(query_id, textMsg, func) {
    return answerCallbackQuery(query_id, textMsg, func);
  }
  listen() {
    getUpdates(this.offset).then((msgData) => {
      if (msgData && msgData.ok) {
        this.offset = maxMsgId(msgData) + 1;
        msgData.result.forEach((msg) => {
          if (msg.message) {
            console.log({
              chat_id: msg.message.chat.id,
              msg_text: msg.message.text,
            });
            if (
              msg.message.entities &&
              msg.message.entities[0].type == 'bot_command'
            )
              this.emit('cmd', msg.message.chat.id, msg.message.text);
            else this.emit('msg', msg.message.chat.id, msg.message.text);
          } else if (msg.callback_query) {
            this.emit(
              'callback_query',
              msg.callback_query.data,
              msg.callback_query.id
            );
          }
        });
      }
    });
  }
}

module.exports = Bot;
