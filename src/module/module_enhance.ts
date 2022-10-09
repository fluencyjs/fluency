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
    module.dirty = makeDirty(module.dirty, index);
    module.syncUpdate();
    
    // 重置dirty
    module.dirty = 0;
}

function makeDirty(dirty: number, index: number): number {
    return (dirty + (1 << index));
}

export function freshData(node: ElementNode | undefined, value: any): ElementNode {
    if (node === undefined) {
        return text('');
    }

    const newTextNode = text(value);
    node.replaceWith(newTextNode);
    return newTextNode;
}