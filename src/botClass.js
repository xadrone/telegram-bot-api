'use strict';
const Emitter = require('events');
const { getMe } = require('./getMe.js');
const { sendMessage } = require('./sendMessage.js');
const { getUpdates } = require('./getUpdates.js');

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
  sendMessage(text, chatId) {
    return sendMessage(text, chatId);
  }
  listen() {
    getUpdates(this.offset).then((msgData) => {
      if (msgData && msgData.ok) {
        this.offset = maxMsgId(msgData) + 1;
        msgData.result.forEach((msg) => {
          console.log(
            {
              'chat_id': msg.message.chat.id,
              'msg_text': msg.message.text
            }
          );
          if (
            msg.message.entities &&
            msg.message.entities[0].type == 'bot_command'
          ) {
            this.emit('cmd', msg.message.chat.id, msg.message.text);
          }
        });
      }
    });
  }
}

module.exports = Bot;
