"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 渲染适配器
 * */
class RenderAdapter {
    constructor() {
        this._renders = [];
        //todo 注入渲染器
    }
    /**
     * 注入渲染器
     * */
    registerRender(render) {
        this._renders[render.nodeType] = render;
    }
    /**
     * 渲染节点
     * */
    renderNode(node) {
        return this._renders[node.viewType].renderNode(node);
    }
    /**
     * 渲染节点引用
     * */
    renderNodeRef(node) {
        return this._renders[node.viewType].renderNodeRef(node);
    }
}
exports.RenderAdapter = RenderAdapter;
