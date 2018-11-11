import { Desktop } from '../desktop/desktop';

export class Player {
  constructor(container, steps){
    this.container = container;
    this.steps = steps;
    this.desktop = new Desktop(container);
    this.setCurrentStep(0);
  }
  play(onComplete){
    let currentStep = this.getCurrentStep();
    if(currentStep < this.steps.length){
      const step = this.steps[currentStep];
      playStep(this.desktop, step, () => {
        this.setCurrentStep(currentStep + 1);
        this.play();
      }, step.onCompleteDelay);
    } else if(onComplete) {
      onComplete();
    }
  }
  getCurrentStep(){
    return this.currentStep;
  }
  setCurrentStep(stepNumber){
    this.currentStep = stepNumber;
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
