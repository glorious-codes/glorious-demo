# Glorious Demo

> The easiest way to demonstrate your code in action.

[![CircleCI](https://circleci.com/gh/rafaelcamargo/glorious-demo.svg?style=svg)](https://circleci.com/gh/rafaelcamargo/glorious-demo)
[![codecov](https://codecov.io/gh/rafaelcamargo/glorious-demo/branch/master/graph/badge.svg)](https://codecov.io/gh/rafaelcamargo/glorious-demo)

## Install

```
npm install @glorious/demo --save
```

## Basic Usage

``` html
<link rel="stylesheet" href="node_modules/@glorious/demo/dist/gdemo.min.css">
<script src="node_modules/@glorious/demo/dist/gdemo.min.js" charset="utf-8"></script>
```

``` javascript
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
