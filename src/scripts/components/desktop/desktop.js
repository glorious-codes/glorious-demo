import '@styles/desktop.styl';
import { EditorApplication } from '../editor-application/editor-application';
import { TerminalApplication } from '../terminal-application/terminal-application';
import domService from '../../services/dom/dom';
import template from './desktop.html';

export class Desktop {
  constructor(container){
    this.element = domService.parseHtml(template);
    this.container = container;
    this.openApplications = [];
    this.container.appendChild(this.element);
  }
  openApplication(appType, appOptions){
    const app = getOpenApplication(this.openApplications, appType);
    return app ? app : buildApplication(this, appType, appOptions);
  }
  minimizeAllApplications(onComplete){
    this.openApplications.forEach(openApplication => openApplication.minimize());
    if(onComplete)
      setTimeout(onComplete, getDefaultAnimationDuration());
  }
  maximizeApplication(application, onComplete){
    application.maximize();
    if(application.inanimate)
      onComplete();
    else
      setTimeout(onComplete, getDefaultAnimationDuration());
  }
}

function buildApplication(desktop, appType, options){
  const Application = appType == 'editor' ? EditorApplication: TerminalApplication;
  const application = new Application(desktop.element, options);
  desktop.openApplications.push(application);
  desktop.element.appendChild(application.element);
  return application;
}

function getOpenApplication(openApplications, appType){
  return openApplications.find(openApplication => {
    return openApplication.type === appType;
  });
}

function getDefaultAnimationDuration(){
  return 750;
}
