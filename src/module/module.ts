interface Module {
    ctx: Array<any>;

    dirty: number;

    /**
     * 创建元素
     */
    createElements(): void;

    /**
     * 组合元素
     */
    combinationElements(): void;

    /**
     * 更新属性
     */
    syncUpdate(): void;

    /**
     * 执行module逻辑
     */
    logicScript(): void;
}

export {
    type Module,
};