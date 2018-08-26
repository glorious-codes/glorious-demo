import textService from '../../services/text/text';
import { Application } from '../application/application';
import { TerminalCommandLine } from '../terminal-command-line/terminal-command-line';
import { TerminalResponseLine } from '../terminal-response-line/terminal-response-line';

export class TerminalApplication extends Application {
  constructor(container, options = {}){
    super('terminal', options);
    this.container = container;
    this.container.appendChild(this.element);
    this.commandLines = [];
    this.setWindowTitle(buildWindowTitle(options));
    this.setPromptString(buildPromptString(options));
  }
  setPromptString(string){
    this.promptString = string;
  }
  command({ command }, onComplete){
    setLastCommandLineWrittenAsInactive(this.commandLines);
    writeCommandLine(this, command, onComplete);
  }
  respond({ response }, onComplete){
    const responseLines = textService.removeBlankFirstLine(response);
    for(let i = 0; i < responseLines.length; i++)
      this.addContent(buildResponseLineElement(responseLines[i]));
    onComplete();
  }
}

function buildWindowTitle(options){
  return options.windowTitle || 'bash';
}

function buildPromptString(options){
  return options.promptString || '~/demo $';
}

function setLastCommandLineWrittenAsInactive(commandLines){
  if(commandLines.length)
    commandLines[commandLines.length - 1].setInactive();
}

function writeCommandLine(terminalApplication, command, onComplete){
  const line = new TerminalCommandLine(terminalApplication.promptString);
  terminalApplication.commandLines.push(line);
  terminalApplication.addContent(line.element);
  line.setActive();
  line.command(command, onComplete);
}

function buildResponseLineElement(lineText){
  const line = new TerminalResponseLine();
  line.setText(lineText);
  return line.element;
}
