
abstract class RenderBase implements INodeRender {

    nodeType:EViewType;

    /**
     * 完整渲染
     * */
    abstract renderNode(node:ITsNode):HTMLElement;

    /**
     * 引用渲染
     * */
    abstract renderNodeRef(node:ITsNode):HTMLElement;

}