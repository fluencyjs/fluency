import { ComponentContent } from './types';

export const WEB_COMPONENT_REPOSITORY = new Map<string, ComponentContent>();

class WebComponent extends HTMLElement {
    private shadowDom: ShadowRoot;

    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const webComponentName = this.tagName.toLocaleLowerCase();
        
        // 获取web component对应的结构
        const componentContent = WEB_COMPONENT_REPOSITORY.get(webComponentName);
        if (componentContent) {
            componentContent.styleDom && this.shadowDom.appendChild(componentContent.styleDom.cloneNode(true));
            this.shadowDom.appendChild(componentContent.templateDom.cloneNode(true));
        }
    }
}

export default WebComponent;