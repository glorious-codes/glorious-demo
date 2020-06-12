# Glorious Demo

> The easiest way to demonstrate your code in action.

[![CircleCI](https://circleci.com/gh/glorious-codes/glorious-demo.svg?style=svg)](https://circleci.com/gh/glorious-codes/glorious-demo)
[![Coverage Status](https://coveralls.io/repos/github/glorious-codes/glorious-demo/badge.svg?branch=master)](https://coveralls.io/github/glorious-codes/glorious-demo?branch=master)

<p align="center">
  <img width="480" src="https://user-images.githubusercontent.com/4738687/49405334-49505c80-f739-11e8-992e-32f4b6e18311.gif" />
</p>

## Installation

```
npm install @glorious/demo --save
```

## Basic Usage

``` html
<link rel="stylesheet" href="node_modules/@glorious/demo/dist/gdemo.min.css">
<script src="node_modules/@glorious/demo/dist/gdemo.min.js"></script>
```

*Note: If you're not into package management, load it from a third-party [CDN provider](https://github.com/rafaelcamargo/glorious-demo/wiki/CDN-Providers).*

``` javascript
// Constructor receives a selector that indicates
// where to inject the demonstration in your page.
const demo = new GDemo('#container');

const code = `
function greet(){
  console.log("Hello World!");
}

greet();
`

demo
  .openApp('editor', {minHeight: '350px', windowTitle: 'demo.js'})
  .write(code, {onCompleteDelay: 1500})
  .openApp('terminal', {minHeight: '350px', promptString: '$'})
  .command('node ./demo', {onCompleteDelay: 500})
  .respond('Hello World!')
  .command('')
  .end();
```

*NOTE: Check [here](https://github.com/rafaelcamargo/glorious-demo/wiki/Syntax-highlight) to know how to use Prism to get your code highlighted.*

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
  initialContent: 'Some text', // for 'editor' applications only
  inanimate: true // Turns off application's window animation
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

// Redefines prompt string for this and following commands
const promptString = '$'

// Can optionally be an HTML string:
const promptString = '<span class="my-custom-class">$</span>'

const commandOptions = {
  promptString,
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

// Can optionally be an HTML string:
const response = `
<div><span class="my-custom-class">+</span> @glorious/demo successfully installed!</div>
<div><span class="my-custom-class">+</span> v0.6.0</div>
`;

const respondOptions = {
  onCompleteDelay: 500 // Delay before executing the next method
}

demo.openApp('terminal').respond(response, respondOptions).end();
```

#### `end`
Indicates the end of the demonstration. The method returns a promise in case you want to perform some action at the end of the demonstration.

``` javascript
demo.openApp('terminal')
    .command('node demo')
    .respond('Hello World!')
    .end()
    .then(() => {
      // Custom code to be performed at the end of the demostration goes here.
    });
```

**IMPORTANT:** Do not forget to invoke it at the end of your demo. Otherwise, the demo won't be played.

## Contributing

1. Install [Node](https://nodejs.org/en/). Download the "Recommend for Most Users" version.

2. Clone the repo:
``` bash
git clone git@github.com:glorious-codes/glorious-demo.git
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
npm run test -- --coverage
```
