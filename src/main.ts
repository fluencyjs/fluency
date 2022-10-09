import {
    Module,
    element,
    ElementNode,
    text,
    append,
    $$response,
    freshData,
} from "./module";
import { getModule, putModule } from "./cache";

class Fluency extends HTMLElement {
    private ctx: Array<any>;
    private dirty: number;
    private target: ShadowRoot;

    constructor() {
        super();
        this.ctx = [];
        this.dirty = 0;
        this.target = this.attachShadow({ mode: 'open' });

        this.init();
    }

    private init(): void {
        const webComponentName = this.tagName.toLocaleLowerCase();
        const moduleSymbol = getModule(webComponentName);

        if (moduleSymbol) {
            const moduleInstance: Module = new moduleSymbol(this.ctx, this.target, this.dirty);

            // 设置ctx数组
            moduleInstance.logicScript();

            // 创建元素
            moduleInstance.createElements();

            // 组合module树
            moduleInstance.combinationElements();
        }
    }
}

export default Fluency;




class CreateModule implements Module {
    target: ShadowRoot;
    ctx: Array<any>;
    dirty: number;
    div1?: ElementNode;
    text1?: ElementNode;
    text2?: ElementNode;
    text3?: ElementNode;
    text4?: ElementNode;
    span1?: ElementNode;
    text5?: ElementNode;

    constructor(ctx: any, target: any, dirty: any) {
        this.ctx = ctx;
        this.target = target;
        this.dirty = dirty;
    }

    createElements() {
        this.div1 = element("div");
        this.text1 = text("msg is: ");
        this.text2 = text(this.ctx[0]);
        this.text3 = text(" hh ");
        this.text4 = text(this.ctx[0]);
        this.span1 = element("span");
        this.text5 = text(" world!");
    }

    combinationElements() {
        append(this.target, this.div1);
        append(this.div1, this.text1);
        append(this.div1, this.text2);
        append(this.div1, this.text3);
        append(this.div1, this.text4);
        append(this.div1, this.span1);
        append(this.span1, this.text5);
    }

    syncUpdate() {
        if (this.dirty & 1) {
            this.text2 = freshData(this.text2, this.ctx[0]);
        }
        if (this.dirty & 1) {
            this.text4 = freshData(this.text4, this.ctx[0]);
        }
    }

    logicScript() {
        let msg = "Hello";

        setTimeout(() => {
            msg = "Hello 1111";
            $$response(this, 0, msg);
        }, 3000);

        setTimeout(() => {
            msg = "Hello 哈哈哈";
            $$response(this, 0, msg);
        }, 6000);

        this.ctx = [msg];
    }
}

putModule('f-root', CreateModule);

window.customElements.define('f-root', Fluency);
