import { Desktop } from '../desktop/desktop';

export class Player {
  constructor(container, steps){
    this.container = container;
    this.steps = steps;
    this.desktop = new Desktop(container);
    this.setCurrentStepNumber(0);
  }
  play(){
    const { desktop, steps } = this;
    return new Promise(resolve => playSteps(this, desktop, steps, resolve));
  }
  getCurrentStepNumber(){
    return this.currentStepNumber;
  }
  setCurrentStepNumber(stepNumber){
    this.currentStepNumber = stepNumber;
  }
}

function playSteps(player, desktop, steps, onComplete){
  let currentStepNumber = player.getCurrentStepNumber();
  if(currentStepNumber < steps.length){
    const step = steps[currentStepNumber];
    playStep(desktop, step, () => {
      player.setCurrentStepNumber(currentStepNumber + 1);
      playSteps(player, desktop, steps, onComplete);
    }, step.onCompleteDelay);
  } else {
    onComplete();
  }
}

function playStep(desktop, step, onComplete, onCompleteDelay = 0){
  getApplication(desktop, step.app, step.options, application => {
    const callback = () => setTimeout(onComplete, onCompleteDelay);
    if(step.action) return application[step.action](step.params, callback);
    return callback();
  });
}

function getApplication(desktop, app, options, onGetApplication){
  const application = desktop.openApplication(app, options);
  const onMaximizeApplication = () => onGetApplication(application);
  if(application.isMaximized) {
    onGetApplication(application);
  } else if(application.inanimate) {
    desktop.minimizeAllApplications();
    desktop.maximizeApplication(application, onMaximizeApplication)
  } else {
    desktop.minimizeAllApplications(() => {
      desktop.maximizeApplication(application, onMaximizeApplication);
    });
  }
}
