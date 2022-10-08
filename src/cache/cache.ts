const MODULE_POOL: Map<string, any> = new Map();

export function putModule(name: string, module: any): void {
    MODULE_POOL.set(name, module);
}

export function getModule(name: string): any {
    return MODULE_POOL.get(name);
}