import { ComponentProps, Builder } from './build_component';

class Fluency {
    /**
     * 组件参数
     */
    private componentProps: ComponentProps;

    private componentBuilder: Builder;
    

    constructor({
        webComponentName = 'f-root',
        template = '',
        style = '',
    } = {}) {
        this.componentProps = {
            webComponentName,
            template,
            style,
        };

        this.componentBuilder = new Builder(this.componentProps);
        this.componentBuilder.init();
    }
}

export default Fluency;