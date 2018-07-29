# Glorious Demo

> The easiest way to demonstrate your code in action.

[![CircleCI](https://circleci.com/gh/rafaelcamargo/glorious-demo.svg?style=svg)](https://circleci.com/gh/rafaelcamargo/glorious-demo)
[![codecov](https://codecov.io/gh/rafaelcamargo/glorious-demo/branch/master/graph/badge.svg)](https://codecov.io/gh/rafaelcamargo/glorious-demo)

<p align="center">
  <img src="https://user-images.githubusercontent.com/4738687/43367796-29012b54-9329-11e8-9651-66d98d107ecd.gif" />
</p>

## Install

```
npm install @glorious/demo --save
```

## Basic Usage

``` html
<link rel="stylesheet" href="node_modules/@glorious/demo/dist/gdemo.min.css">
<script src="node_modules/@glorious/demo/dist/gdemo.min.js"></script>
```

*Note: If you're not into package management, load it from a third-party [CDN provider](https://github.com/rafaelcamargo/glorious-demo/wiki/CDN-Poviders).*

``` javascript
// Constructor receives a selector that indicates
// where to inject the demonstration in your page.
const demo = new GDemo('#container');

demo
  .openApp('editor', {minHeight: '350px', windowTitle: '~/gdemo.js'})
  .write(`
console.log('Glorious Demo!');
`, {onCompleteDelay: 1500})
  .openApp('terminal', {minHeight: '350px', promptString: '~/'})
  .command('node gdemo', {onCompleteDelay: 500})
  .respond('Glorious Demo!')
  .command('')
  .end();
```

### API

#### `openApp`
Opens or maximizes an open application.
``` javascript
/*
** @applicationType: String [required]
** @options: Object [optional]
*/

// Possible values are 'editor' or 'terminal'
const applicationType = 'terminal';

const openAppOptions = {
  minHeight: '350px',
  windowTitle: 'bash',
  promptString: '~/my-project $', // for 'terminal' applications only
  onCompleteDelay: 1000 // Delay before executing the next method
}

demo.openApp(applicationType, openAppOptions).end();
```

#### `write`
Writes some code in the open Editor application.
``` javascript
/*
** @codeSample: String [required]
** @options: Object [optional]
*/

// Tabs and line breaks will be preserved
const codeSample = `
function sum(a, b) {
  return a + b;
}

sum();
`;

const writeOptions = {
  onCompleteDelay: 500 // Delay before executing the next method
}

demo.openApp('editor').write(codeSample, writeOptions).end();
```

#### `command`
Writes some command in the open Terminal application.
``` javascript
/*
** @command: String [required]
** @options: Object [optional]
*/

const command = 'npm install @glorious/demo --save';

const commandOptions = {
  onCompleteDelay: 500 // Delay before executing the next method
}

demo.openApp('terminal').command(command, commandOptions).end();
```

#### `respond`
Shows some response on the open Terminal application.
``` javascript
/*
** @response: String [required]
** @options: Object [optional]
*/

// Line breaks will be preserved
const response = `
+ @glorious/demo successfully installed!
+ v0.1.0
`;

const respondOptions = {
  onCompleteDelay: 500 // Delay before executing the next method
}

demo.openApp('terminal').respond(response, respondOptions).end();
```

#### `end`
Indicates the end of the demonstration. Do not forget to invoke it at the end of your demo. Otherwise, the demo won't be played.

## Contributing

1. Install [Node](https://nodejs.org/en/). Download the "Recommend for Most Users" version.

2. Clone the repo:
``` bash
git clone git@github.com:rafaelcamargo/glorious-demo.git
```

3. Go to the project directory:
``` bash
cd glorious-demo
```

4. Install the project dependencies:
``` bash
npm install
```

5. Build the project:
``` bash
npm run build
```

## Tests

Ensure that all code that you have added is covered with unit tests:
``` bash
npm run test
```
