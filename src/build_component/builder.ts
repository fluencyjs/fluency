import { ComponentProps } from './types';
import WebComponent, { WEB_COMPONENT_REPOSITORY } from './Component';

class Builder {
    private props: ComponentProps;

    constructor(props: ComponentProps) {
        this.props = props;
    }

    init() {
        if (!this.props.webComponentName) {
            return;
        }

        // 获取template Dom
        const templateDom = this.renderTemplate(this.props.template);

        // 获取样式 Dom
        let styleDom;
        if (this.props.style) {
            styleDom = this.renderStyle(this.props.style);
        }

        // 定义组件
        WEB_COMPONENT_REPOSITORY.set(this.props.webComponentName.toLowerCase(), {
            templateDom,
            styleDom,
        });
        window.customElements.define(this.props.webComponentName, WebComponent);
    }

    /**
     * 将模板字符串转换成对应的dom节点
     * 
     * @param templateStr 模板字符串
     * @returns 模板字符串对应的文档片段
     */
    renderTemplate(templateStr: string): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const template = document.createElement('template');
        template.innerHTML = templateStr;
        fragment.appendChild(template.content);

        return fragment;
    }

    /**
     * 将样式字符串转换为样式节点
     * 
     * @param styleStr 样式字符串
     * @returns 样式节点
     */
    renderStyle(styleStr: string): DocumentFragment {
        const styleFragment = document.createDocumentFragment();
        const style = document.createElement('style');
        style.innerHTML = styleStr;
        styleFragment.appendChild(style);

        return styleFragment;
    }
}

export {
    Builder
};