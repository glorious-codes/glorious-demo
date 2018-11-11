import '@styles/_variables.styl';
import '@styles/_mixins.styl';
import { Player } from './components/player/player';

export default class {
  constructor(selector){
    this.container = document.querySelector(selector);
    this.steps = [];
  }
  openApp(app, options = {}){
    this.steps.push({
      app,
      options,
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  write(codeSample, options = {}){
    this.steps.push({
      app: 'editor',
      action: 'write',
      params: { codeSample },
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  command(command, options = {}){
    this.steps.push({
      app: 'terminal',
      action: 'command',
      params: {
        command,
        promptString: options.promptString
      },
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  respond(response, options = {}){
    this.steps.push({
      app: 'terminal',
      action: 'respond',
      params: { response },
      onCompleteDelay: options.onCompleteDelay
    });
    return this;
  }
  end(){
    const player = new Player(this.container, this.steps);
    return new Promise(resolve => {
      player.play(resolve);
    });
  }
}
