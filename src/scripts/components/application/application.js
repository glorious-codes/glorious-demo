import '@styles/application.styl';
import { DEFAULT_APPLICATION_ID } from '../../constants/application';
import domService from '../../services/dom/dom';
import textService from '../../services/text/text';
import template from './application.html';

export class Application {
  constructor(applicationType, { id = DEFAULT_APPLICATION_ID, ...options } = {}){
    this.type = applicationType;
    this.id = id;
    this.options = options;
    this.element = buildElement(applicationType);
    this.setOptions(this.options);
  }
  setOptions(options){
    Object.entries(options).forEach(([optionName, optionValue]) => {
      const handle = this.getOptionHandler(optionName)
      handle && handle(optionValue)
    });
  }
  getOptionHandler(optionName){
    return {
      'minHeight': optionValue => this.setMinHeight(optionValue),
      'windowTitle': optionValue => this.setWindowTitle(optionValue),
      'inanimate': optionValue => this.configAnimation(optionValue),
    }[optionName];
  }
  setMinHeight(height){
    const applicationTopbarHeight = 26;
    const contentContainer = getContentContainerElement(this.element);
    const contentContainerMinHeight = parseInt(height) - applicationTopbarHeight;
    contentContainer.style.minHeight = `${contentContainerMinHeight}px`;
  }
  setWindowTitle(title){
    const titleContainerElement = getWindowTitleContainerElement(this.element);
    titleContainerElement.innerText = title;
    this.windowTitle = title;
  }
  configAnimation(inanimate){
    this.setInanimate(inanimate);
    inanimate && getBaseApplicationElement(this.element).classList.add('application-inanimate');
  }
  addContent(content){
    const container = getContentContainerElement(this.element);
    container.appendChild(content);
  }
  setInanimate(inanimate){
    this.inanimate = inanimate;
  }
  minimize(){
    this.setMaximized(false);
    handleResizingCssClass(this.element, 'remove', 'application-maximized');
    handleResizingCssClass(this.element, 'add', 'application-minimized');
  }
  maximize(){
    this.setMaximized(true);
    handleResizingCssClass(this.element, 'remove', 'application-minimized');
    handleResizingCssClass(this.element, 'add', 'application-maximized');
  }
  setMaximized(isMaximized){
    this.isMaximized = isMaximized;
  }
}

function buildElement(applicationType){
  let element = buildWrapper(applicationType);
  element.appendChild(domService.parseHtml(template));
  return element;
}

function buildWrapper(applicationType){
  const wrapper = document.createElement('div');
  const cssClass = `${textService.toKebabCase(applicationType)}-application`;
  wrapper.setAttribute('class', cssClass);
  return wrapper;
}

function getContentContainerElement(applicationElement){
  return applicationElement.querySelector('[data-content-container]');
}

function getWindowTitleContainerElement(applicationElement){
  return applicationElement.querySelector('[data-title-container]');
}

function handleResizingCssClass(element, classListMethod, cssClass){
  getBaseApplicationElement(element).classList[classListMethod](cssClass);
}

function getBaseApplicationElement(element){
  return element.querySelector('[data-application]');
}
