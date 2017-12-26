/**
 * 视图枚举
 * */
export enum EViewType {
    VALUE,          /*值*/
    TYPE,           /*类型*/
    STATEMENT,      /*类型声明*/
    MODULE,         /*模块*/
    INTERFACE,      /*接口*/
    ENUM,           /*枚举*/
    CLASS,          /*类*/
    VARIABLE,       /*变量*/
    PROPERTY,       /*成员*/
    METHOD,         /*方法*/
    FUNCTION,       /*函数*/
    FILE,           /*文件*/
    EXPRESSION,     /*表达式*/
    SIGNATURE,      /*附加标记*/
    NOTE            /*注释*/
}

/**
 * 附加关键字枚举
 * */
export enum ESignature {
    EXPORT,         /*导出*/
    ABSTRACT,       /*抽象*/
    READONLY        /*只读*/
}

//基础节点
export interface ITsNode {
    name:string;
    parent:ITsNode;
    note?:INoteNode;
    viewRef:HTMLElement;
    viewType:EViewType;
}

export interface IValueLikeNode extends ITsNode {
    value:number|string|ITsNode;
    viewType:EViewType.VALUE|EViewType.TYPE|EViewType.STATEMENT|EViewType.PROPERTY|EViewType.VARIABLE|EViewType.SIGNATURE;
}

//注释元素
type NoteElement = string | ISignatureNode;

//注释节点
export interface INoteNode extends ITsNode {
    elements:NoteElement[];
    viewType:EViewType.NOTE;
}

//价值节点
export interface IValueNode extends IValueLikeNode {
    value:string|ITsNode;
    viewType:EViewType.VALUE;
}

//类型节点
export interface ITypeNode extends IValueLikeNode {
    value:"string"|"number"|"void"|"any"|ITsNode;
    viewType:EViewType.TYPE;
}

export interface IStatementLikeNode extends IValueLikeNode {
    type:ITypeNode;
    viewType:EViewType.STATEMENT|EViewType.PROPERTY|EViewType.VARIABLE;
}

//类型+价值节点
export interface IStatementNode extends IStatementLikeNode {
    viewType:EViewType.STATEMENT;
}

//标记节点
export interface ISignatureNode extends IValueLikeNode {
    value:ESignature;
    followText?:string;
    viewType:EViewType.SIGNATURE;
}

//代码节点
export interface IExpressionNode extends ITsNode {
    text:string;
    viewType:EViewType.EXPRESSION;
}

//文件节点
export interface ITsDoc extends IModuleNode {
    modules:IModuleNode[];
    viewType:EViewType.FILE;
}

//模块节点
export interface IModuleNode extends ITsNode {
    interfaces:IInterfaceNode[];
    enums:IEnumNode[];
    classes:IClassNode[];
    variables:IVariableNode[];
    functions:IFunctionNode[];
    types:ITypeNode[];
    viewType:EViewType.MODULE|EViewType.FILE;
}

//类节点
export interface IClassNode extends IInterfaceLikeNode {
    extends:IClassNode[];
    implement:null|IInterfaceNode;
    viewType:EViewType.CLASS;
}

//变量节点
export interface IVariableNode extends IStatementLikeNode {
    declareType:"let"|"var"|"const"|ITsNode;
    viewType:EViewType.VARIABLE;
}

//函数节点
export interface IFunctionNode extends ITsNode {
    params:IStatementNode[];
    return:ITypeNode;
    viewType:EViewType.FUNCTION;
}

export interface IInterfaceLikeNode extends ITsNode {
    methods:IMethodNode[];
    properties:IPropertyNode[];
    extends:IInterfaceLikeNode[];
    viewType:EViewType.INTERFACE|EViewType.CLASS;
}

//接口节点
export interface IInterfaceNode extends IInterfaceLikeNode {
    viewType:EViewType.INTERFACE
}

//成员访问类型
export interface IAccessType extends IValueNode {
    value:"public"|"private"|"protected";
}

//属性节点
export interface IPropertyNode extends IStatementLikeNode {
    accessType:IAccessType;
    viewType:EViewType.PROPERTY;
}

//方法节点
export interface IMethodNode extends IFunctionNode {
    accessType:IAccessType;
    viewType:EViewType.FUNCTION;
}

//枚举节点
export interface IEnumNode extends ITsNode {
    members:IValueNode[];
    viewType:EViewType.ENUM;
}

/**
 * 语法解析器
 * */
export interface IDocAnalyzer {
    /**
     * 读文件
     * external
     * */
    readSource(file:string):ITsDoc;

    /**
     * 读取语法树主干
     * @internal
     * */
    readTrees():void;
    /**
     * 生成引用
     * @internal
     * */
    createRef():void;
}

/**
 * @internal
 * 节点渲染器
 * */
export interface INodeRender {

    nodeType:EViewType;

    /**
     * 完整渲染
     * */
    renderNode(node:ITsNode):HTMLElement;

    /**
     * 渲染引用
     * */
    renderNodeRef(node:ITsNode):HTMLElement;
}