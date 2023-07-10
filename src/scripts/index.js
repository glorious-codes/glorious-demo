import '@styles/_variables.styl';
import '@styles/_mixins.styl';
import fyzer from '@glorious/fyzer';
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
  write(codeSample, { onCompleteDelay, ...options } = {}){
    this.steps.push({
      app: 'editor',
      action: 'write',
      params: { codeSample },
      onCompleteDelay,
      options
    });
    return this;
  }
  command(command, { onCompleteDelay, promptString, ...options } = {}){
    this.steps.push({
      app: 'terminal',
      action: 'command',
      params: {
        command,
        promptString
      },
      onCompleteDelay,
      options
    });
    return this;
  }
  respond(response, { onCompleteDelay, ...options } = {}){
    this.steps.push({
      app: 'terminal',
      action: 'respond',
      params: { response },
      onCompleteDelay,
      options
    });
    return this;
  }
  end(){
    return new Promise(resolve => {
      const { container, steps } = this;
      awaitContainerAppearsAboveTheFoldToPlay(container, steps, resolve);
    });
  }
}

function awaitContainerAppearsAboveTheFoldToPlay(container, steps, resolve){
  const subscriptionId = fyzer.subscribe(container, () => {
    const player = new Player(container, steps);
    fyzer.unsubscribe(subscriptionId);
    player.play().then(resolve);
  });
}
