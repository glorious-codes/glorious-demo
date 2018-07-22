import '@styles/application.styl';
import domService from '../../services/dom/dom';
import textService from '../../services/text/text';
import template from './application.html';

export class Application {
  constructor(applicationType, options = {}){
    this.type = applicationType;
    this.options = options;
    this.element = buildElement(applicationType);
    this.setOptions(this.options);
  }
  setOptions(options){
    if(options.minHeight)
      this.setMinHeight(options.minHeight);
    if(options.windowTitle)
      this.setWindowTitle(options.windowTitle);
  }
  setMinHeight(height){
    const container = getContentContainerElement(this.element);
    container.style.minHeight = height;
  }
  setWindowTitle(title){
    const titleContainerElement = getWindowTitleContainerElement(this.element);
    titleContainerElement.innerText = title;
    this.windowTitle = title;
  }
  addContent(content){
    const container = getContentContainerElement(this.element);
    container.appendChild(content);
  }
  minimize(){
    this.setMaximized(false);
    handleMaximizedCssClass(this.element, 'remove');
  }
  maximize(){
    this.setMaximized(true);
    handleMaximizedCssClass(this.element, 'add');
  }
  setMaximized(isMaximized){
    this.isMaximized = isMaximized;
  }
}

function buildElement(applicationType, windowTitle){
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

function handleMaximizedCssClass(element, classListMethod){
  element.classList[classListMethod]('application-maximized');
}
