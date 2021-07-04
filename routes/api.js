'use strict';

const Translator = require('../components/translator.js');
const messages = require('../constants/messages');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      /**
       * has to check text === undefined because empty string will evaluate to false
       * therefore empty string will return missing field instead of no text
      */
     if (text === undefined || !locale) {
       return res.json({ error: messages.MISSING_FIELD });
     }

      if (text === '') {
        return res.json({ error: messages.NO_TEXT });
      }

      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: messages.INVALID_LOCALE });
      }

      let translation = '';

      if (locale === 'american-to-british') {
        translation = translator.toBritishEnglish(text);
      } else {
        translation = translator.toAmericanEnglish(text);
      }

      if (translation === text) {
        return res.json({
          text,
          translation: messages.LOOKS_OK
        });
      }

      return res.json({
        text,
        translation
      });
    });
};
