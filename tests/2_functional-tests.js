const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const messages = require('../constants/messages');

suite('Functional Tests', () => {
  suite('Test POST /api/translate', () => {
    test('Valid Both Locale and Text', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'This is not my favorite food.',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          const expected = 'This is not my' +
            ' <span class="highlight">favourite</span> food.';
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, expected);
          done();
        });
    });

    test('Text and Invalid Locale', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'This is not my favorite food.',
          locale: 'Invalid locale'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, messages.INVALID_LOCALE);
          done();
        });
    });

    test('Missing Text', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          locale: 'american-to-british'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, messages.MISSING_FIELD);
          done();
        });
    });

    test('Missing Locale', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'This is not my favorite food.'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, messages.MISSING_FIELD);
          done();
        });
    });

    test('Empty Text', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: '',
          locale: 'british-to-american'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, messages.NO_TEXT);
          done();
        });
    });

    test('Text that Needs No Translation', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'This sentence doesn\'t need translation.',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, messages.LOOKS_OK);
          done();
        });
    })
  });
});
