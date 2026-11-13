# Exercise: Fix the Coffee Shop Page

Exercise code for the lesson **Exercise: Fix the Coffee Shop Page** in the HTML in Depth course on [ask-codey.com](https://www.ask-codey.com).

The Daily Grind, a neighborhood coffee shop, has a home page with six mistakes in it. Some you can see in the browser and some the browser hides from you. You'll find and fix them all in `index.html`, using the browser's developer tools to see what the browser made of the file. Tests check every fix.

## Before you start

You need VS Code with the Live Server extension, a browser, and Node.js. The lesson **Setup: VS Code, a Browser and Node.js** installs all three.

## What's here

- `index.html`: The Daily Grind's home page, with six mistakes. For you to fix.
- `page.test.js`: the tests that check your page. You don't need to change this file.
- `package.json`: tells `npm` which two checking tools the tests use (jsdom reads your page the way a browser does; html-validate checks it against the rules of HTML). Ready to use.
- `.gitignore`: keeps the downloaded tools out of your copy on GitHub. Ready to use.

## Run it

Open the folder in VS Code, right-click `index.html` and choose **Open with Live Server**. The page opens in your browser and reloads every time you save.

## Check your work

Open VS Code's terminal (**Terminal > New Terminal**). The first time only, download the checking tools:

```bash
npm install
```

Then run the tests, as often as you like:

```bash
npm test
```

At first all 7 tests fail: that is expected. As you fix the mistakes, the tests turn green. A failing test's message says what it looked for, and the validator's messages name the line it's unhappy with.

## What the finished page needs

1. The doctype, `<!DOCTYPE html>`, as the very first line.
2. The `<html>` start tag says the page is in English: `lang="en"`.
3. The browser tab shows **The Daily Grind**.
4. The `<h1>` holds only the shop's name, **The Daily Grind**.
5. Hovering over the opening hours shows the tooltip **Open seven days a week**.
6. Every element closes in the right order: the inner one first.

Keep the words, the prices and `id="hours"` as they are. Fix the HTML around them.

## Tips

- **Look before you fix.** Right-click the big heading and choose **Inspect**. The Elements panel shows what the browser built from your file, which isn't always what you wrote.
- **Compare two views.** Right-click the page and choose **View Page Source** to see the file as it arrived. Where the source and the Elements panel disagree, the browser repaired a mistake for you.
- **Read attributes in the Elements panel.** An attribute that got split into pieces shows up there as several attributes instead of one.
- **One fix at a time.** Fix one mistake, save, run `npm test`, and see which tests have turned green.

## Hand it in

When it works, put your solution in a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. You don't need Git: create the repo on GitHub, choose **Add file**, then **Upload files**, and upload everything in this folder except `node_modules` (it's the files `npm install` downloaded, far too many for GitHub's upload, and `npm install` makes it again). The lesson page shows each step, and the lesson *Put Your Work on GitHub* walks through every screen.
