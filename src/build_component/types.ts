interface ComponentProps {
    /**
     * web component的名称
     */
     webComponentName: string;

    /**
     * 组件模板
     */
    template: string;

    /**
     * 组件样式
     */
    style?: string;
}


/**
 * 保存自定义标签原始的结构
 */
interface ComponentContent {
    templateDom: DocumentFragment;

    styleDom?: DocumentFragment;
}

export {
    type ComponentProps,
    type ComponentContent,
};