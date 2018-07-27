import '@styles/editor-application.styl';
import { Application } from '../application/application';
import { EditorLine } from '../editor-line/editor-line';
import textService from '../../services/text/text';

export class EditorApplication extends Application {
  constructor(container, options = {}){
    super('editor', options);
    this.container = container;
    this.container.appendChild(this.element);
    this.lines = [];
    this.setWindowTitle(buildWindowTitle(options));
  }
  write({ codeSample }, onComplete){
    const textLines = textService.removeBlankFirstLine(codeSample);
    writeMultipleLines(this, textLines, onComplete);
  }
}

function buildWindowTitle(options){
  return options.windowTitle || '~/demo/demo.js';
}

function writeMultipleLines(application, textLines, onComplete){
  const textLine = textLines.shift();
  if(textLine !== undefined)
    writeSingleLine(application, textLine, () => {
      writeMultipleLines(application, textLines, onComplete);
    });
  else
    onComplete();
}

function writeSingleLine(application, textLine, onComplete){
  const line = new EditorLine(application.lines.length + 1);
  application.addContent(line.element);
  application.lines.push(line);
  line.write(textLine, onComplete);
}
