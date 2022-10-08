import { Module } from "./module";

export type ElementNode = HTMLElement | Text;

export function element(tagName: string): ElementNode {
    return document.createElement(tagName);
}

export function text(content: string): ElementNode {
    return document.createTextNode(content);
}

export function append(source: ShadowRoot | ElementNode | undefined, target: ElementNode | undefined): void {
    if (source === undefined || target === undefined) {
        return;
    }

    source.appendChild(target);
}

export function $$response(module: Module, index: number, newValue: any): void {
    const oldValue = module.ctx[index];
    if (oldValue === newValue) {
        return;
    }

    module.ctx[index] = newValue;
    // TODO 研究修改
    module.dirty = 1;
    module.syncUpdate();
}

export function freshData(node: ElementNode | undefined, value: any): void {
    if (node === undefined) {
        return;
    }

    node.replaceWith(value);
}