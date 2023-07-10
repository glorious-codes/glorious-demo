import '@styles/editor-application.styl';
import { Application } from '../application/application';
import { EditorLine } from '../editor-line/editor-line';
import textService from '../../services/text/text';

export class EditorApplication extends Application {
  constructor(container, options = {}){
    super('editor', options);
    this.container = container;
    this.container.appendChild(this.element);
    this.setupInitialContent(options.initialContent);
    this.setWindowTitle(buildWindowTitle(options));
  }
  setupInitialContent(initialContent = ''){
    const linesToAppend = parseContent(initialContent);
    this.setLines([]);
    this.appendLines(linesToAppend);
  }
  setLines(lines){
    this.lines = [];
  }
  appendLines(textLines){
    textLines.forEach(textLine => {
      const line = buildEditorLine(this.lines, textLine);
      appendContentToApplication(this, line);
    });
  }
  write({ codeSample }, onComplete){
    const textLines = parseContent(codeSample);
    writeMultipleLines(this, textLines, onComplete);
  }
}

function parseContent(content){
  return textService.removeBlankFirstLine(content);
}

function buildWindowTitle(options){
  return options.windowTitle || '~/demo/demo.js';
}

function writeMultipleLines(application, textLines, onComplete){
  const textLine = textLines.shift();
  if(textLine !== undefined){
    inactivateLastLineWritten(application.lines);
    writeSingleLine(application, textLine, () => {
      writeMultipleLines(application, textLines, onComplete);
    });
  } else {
    onComplete();
  }
}

function inactivateLastLineWritten(lines){
  if(lines.length) lines[lines.length-1].setInactive();
}

function writeSingleLine(application, text, onComplete){
  const line = buildEditorLine(application.lines);
  appendContentToApplication(application, line);
  line.setActive();
  line.write(text, onComplete);
}

function buildEditorLine(applicationLines, text){
  return new EditorLine(applicationLines.length + 1, text);
}

function appendContentToApplication(application, line){
  application.addContent(line.element);
  application.lines.push(line);
}
