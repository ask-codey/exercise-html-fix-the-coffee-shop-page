// Checks your coffee shop page: the parts every page needs, and the mistakes a browser quietly hides.
// Run it with: npm test (run npm install once first). You don't need to change this file.
const nodeTest = require('node:test');

// Runs one check. When it fails, the output starts "Not yet:" and says what to fix, with no stack trace to scroll past.
function test(name, run) {
  return nodeTest(name, async (context) => {
    try {
      await run(context);
    } catch (error) {
      const problem = new Error(error.message);
      problem.stack = `Not yet: ${error.message}`;
      throw problem;
    }
  });
}
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { JSDOM } = require('jsdom');
const { HtmlValidate } = require('html-validate');

const html = readFileSync(join(__dirname, 'index.html'), 'utf8');
const page = new JSDOM(html).window.document;

// The validator reads the file as you wrote it, so it sees mistakes the browser repairs without telling you.
const validator = new HtmlValidate({
  extends: ['html-validate:standard'],
  rules: { 'missing-doctype': 'error' },
});
async function problems() {
  const report = await validator.validateString(html, 'index.html');
  return report.results.flatMap((result) => result.messages);
}

test('1) the page starts with the doctype', () => {
  assert.ok(page.doctype && page.doctype.name === 'html',
    'Add <!DOCTYPE html> as the very first line of index.html.');
});

test('2) the page says it is in English', () => {
  assert.match(page.documentElement.lang, /^en\b/i,
    'Give the <html> start tag a lang attribute: <html lang="en">.');
});

test('3) the tab shows the shop\'s name', () => {
  assert.match(page.title, /The Daily Grind/,
    'Add <title>The Daily Grind</title> inside the <head>.');
});

test('4) one h1, holding only the shop\'s name', () => {
  const headings = page.querySelectorAll('h1');
  assert.equal(headings.length, 1, 'A page has exactly one <h1>.');
  assert.equal(headings[0].textContent.trim(), 'The Daily Grind',
    'The <h1> holds more than the shop\'s name, so it never closes where it should. Inspect it to see what ended up inside, then add </h1> right after "The Daily Grind".');
});

test('5) the hours tooltip reads "Open seven days a week"', () => {
  const hours = page.getElementById('hours');
  assert.ok(hours, 'Keep the paragraph with id="hours".');
  assert.equal(hours.getAttribute('title'), 'Open seven days a week',
    `The tooltip is "${hours.getAttribute('title')}". Inspect the hours paragraph: a value with spaces needs quotes around it.`);
});

test('6) tags close in the right order', async () => {
  const misnested = (await problems()).filter((message) => message.ruleId === 'close-order');
  assert.deepEqual(misnested.map((message) => `line ${message.line}: ${message.message}`), [],
    'Close the inner element before the outer one, like boxes inside boxes.');
});

test('7) the validator finds no errors', async () => {
  const found = await problems();
  assert.deepEqual(found.map((message) => `line ${message.line}: ${message.message}`), [],
    'Fix each line the validator names. Each message says what it expected.');
});
