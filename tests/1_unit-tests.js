const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();
const noHighlightRegex = /<span class=\"highlight\">|<\/span>/g;
const highlightRegex = /<span class=\"highlight\">/g;

suite('Unit Tests', () => {
  suite('Test translator.toBritishEnglish()', () => {
    test('Translate Mangoes are my favorite fruit.', (done) => {
      const text = 'Mangoes are my favorite fruit.';
      const expected = 'Mangoes are my favourite fruit.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate I ate yogurt for breakfast.', (done) => {
      const text = 'I ate yogurt for breakfast.';
      const expected = 'I ate yoghurt for breakfast.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate We had a party at my friend\'s condo.', (done) => {
      const text = 'We had a party at my friend\'s condo.';
      const expected = 'We had a party at my friend\'s flat.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Can you toss this in the trashcan for me?', (done) => {
      const text = 'Can you toss this in the trashcan for me?';
      const expected = 'Can you toss this in the bin for me?';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate The parking lot was full.', (done) => {
      const text = 'The parking lot was full.';
      const expected = 'The car park was full.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Like a high tech Rube Goldberg machine.', (done) => {
      const text = 'Like a high tech Rube Goldberg machine.';
      const expected = 'Like a high tech Heath Robinson device.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate To play hooky means to skip class or work.', (done) => {
      const text = 'To play hooky means to skip class or work.';
      const expected = 'To bunk off means to skip class or work.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate No Mr. Bond, I expect you to die.', (done) => {
      const text = 'No Mr. Bond, I expect you to die.';
      const expected = 'No Mr Bond, I expect you to die.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Dr. Grosh will see you now.', (done) => {
      const text = 'Dr. Grosh will see you now.';
      const expected = 'Dr Grosh will see you now.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Lunch is at 12:15 today.', (done) => {
      const text = 'Lunch is at 12:15 today.';
      const expected = 'Lunch is at 12.15 today.';
      const result = translator.toBritishEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });
  });

  suite('Test translator.toAmericanEnglish', () => {
    test('Translate We watched the footie match for a while.', (done) => {
      const text = 'We watched the footie match for a while.';
      const expected = 'We watched the soccer match for a while.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Paracetamol takes up to an hour to work.', (done) => {
      const text = 'Paracetamol takes up to an hour to work.';
      const expected = 'Tylenol takes up to an hour to work.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate First, caramelise the onions.', (done) => {
      const text = 'First, caramelise the onions.';
      const expected = 'First, caramelize the onions.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate I spent the bank holiday at the funfair.', (done) => {
      const text = 'I spent the bank holiday at the funfair.';
      const expected = 'I spent the public holiday at the carnival.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate I had a bicky then went to the chippy.', (done) => {
      const text = 'I had a bicky then went to the chippy.';
      const expected = 'I had a cookie then went to the fish-and-chip shop.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate I\'ve just got bits and bobs in my bum bag.', (done) => {
      const text = 'I\'ve just got bits and bobs in my bum bag.';
      const expected = 'I\'ve just got odds and ends in my fanny pack.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate The car boot sale at Boxted Airfield was called off.', (done) => {
      const text = 'The car boot sale at Boxted Airfield was called off.';
      const expected = 'The swap meet at Boxted Airfield was called off.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Have you met Mrs Kalyani?', (done) => {
      const text = 'Have you met Mrs Kalyani?';
      const expected = 'Have you met Mrs. Kalyani?';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Prof Joyner of King\'s College, London.', (done) => {
      const text = 'Prof Joyner of King\'s College, London.';
      const expected = 'Prof. Joyner of King\'s College, London.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });

    test('Translate Tea time is usually around 4 or 4.30.', (done) => {
      const text = 'Tea time is usually around 4 or 4.30.';
      const expected = 'Tea time is usually around 4 or 4:30.';
      const result = translator.toAmericanEnglish(text);

      assert.equal(result.replace(noHighlightRegex, ''), expected);
      done();
    });
  });

  suite('Test Highlight', () => {
    test('Highlight in Mangoes are my favorite fruit.', (done) => {
      const text = 'Mangoes are my favorite fruit.';
      const result = translator.toBritishEnglish(text);
      const highlights = result.match(highlightRegex);

      assert.equal(highlights.length, 1);
      done();
    });

    test('Highlight in I ate yogurt for breakfast.', (done) => {
      const text = 'I ate yogurt for breakfast.';
      const result = translator.toBritishEnglish(text);
      const highlights = result.match(highlightRegex);

      assert.equal(highlights.length, 1);
      done();
    });

    test('Highlight in We watched the footie match for a while', (done) => {
      const text = 'We watched the footie match for a while.';
      const result = translator.toAmericanEnglish(text);
      const highlights = result.match(highlightRegex);

      assert.equal(highlights.length, 1);
      done();
    });

    test('Highlight in Paracetamol takes up to an hour to work', (done) => {
      const text = 'Paracetamol takes up to an hour to work.';
      const result = translator.toAmericanEnglish(text);
      const highlights = result.match(highlightRegex);

      assert.equal(highlights.length, 1);
      done();
    });
  });
});
