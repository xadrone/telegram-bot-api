'use strict';
const fetch = require('node-fetch');

class InlineKeyboardButton {
  constructor() {
    this.text = 'text';
    this.callback_data = '-1';
  }

  setText(text) {
    this.text = text;
    return this;
  }

  setCallbackData(callback_data) {
    this.callback_data = callback_data;
    return this;
  }
}

class InlineKeyboardMarkup {
  constructor() {
    this.inline_keyboard = [];
  }

  addRowButton(...row) {
    this.inline_keyboard.push(...row);
    return this;
  }
}

module.exports = {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
};
