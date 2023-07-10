import '@styles/desktop.styl';
import { DEFAULT_APPLICATION_ID } from '../../constants/application';
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
    const app = getOpenApplication(this.openApplications, appType, appOptions);
    return app ? app : buildApplication(this, appType, appOptions);
  }
  minimizeAllApplications(onComplete){
    this.openApplications.forEach(openApplication => openApplication.minimize());
    if(onComplete) setTimeout(onComplete, getDefaultAnimationDuration());
  }
  maximizeApplication(application, onComplete){
    application.maximize();
    if(application.inanimate) return onComplete();
    return setTimeout(onComplete, getDefaultAnimationDuration());
  }
}

function buildApplication(desktop, appType, options){
  const Application = appType == 'editor' ? EditorApplication: TerminalApplication;
  const application = new Application(desktop.element, options);
  desktop.openApplications.push(application);
  desktop.element.appendChild(application.element);
  return application;
}

function getOpenApplication(openApplications, appType, appOptions = {}){
  const appId = appOptions.id || DEFAULT_APPLICATION_ID;
  return openApplications.filter(openApplication => {
    return openApplication.type === appType;
  }).find(openApplication => {
    return openApplication.id === appId;
  });
}

function getDefaultAnimationDuration(){
  return 750;
}
