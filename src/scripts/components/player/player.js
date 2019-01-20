import { Desktop } from '../desktop/desktop';

export class Player {
  constructor(container, steps){
    this.container = container;
    this.steps = steps;
    this.desktop = new Desktop(container);
    this.setCurrentStepNumber(0);
  }
  play(){
    return new Promise((resolve, reject) => {
      playSteps(this, this.desktop, this.steps, () => {
        resolve();
      });
    });
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
    if(step.action)
      application[step.action](step.params, () => {
        setTimeout(onComplete, onCompleteDelay);
      });
    else
      setTimeout(onComplete, onCompleteDelay);
  });
}

function getApplication(desktop, app, options, onGetApplication){
  const application = desktop.openApplication(app, options);
  if(application.isMaximized)
    onGetApplication(application);
  else
    desktop.minimizeAllApplications(() => {
      desktop.maximizeApplication(application, () => {
        onGetApplication(application);
      });
    });
}
