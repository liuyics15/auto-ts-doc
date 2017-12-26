
import {INodeRender, ITsNode} from "../interface/Interface";
/**
 * 渲染适配器
 * */
export class RenderAdapter {

    private _renders:INodeRender[];

    constructor() {
        this._renders = [];
        //todo 注入渲染器
    }

    /**
     * 注入渲染器
     * */
    protected registerRender(render:INodeRender):void {
        this._renders[render.nodeType] = render;
    }

    /**
     * 渲染节点
     * */
    public renderNode(node:ITsNode):HTMLElement {
        return this._renders[node.viewType].renderNode(node);
    }

    /**
     * 渲染节点引用
     * */
    public renderNodeRef(node:ITsNode):HTMLElement {
        return this._renders[node.viewType].renderNodeRef(node);
    }
}