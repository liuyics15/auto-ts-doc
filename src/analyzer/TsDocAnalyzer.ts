import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";
import {
    EViewType, IDocAnalyzer, IEnumNode, IFunctionNode, IInterfaceNode, IMethodNode, IModuleNode, INoteNode,
    IPropertyNode, IStatementNode, ITsDoc,
    ITsNode,
    ITypeNode, IVariableNode
} from "../interface/Interface";

export class Analyzer implements IDocAnalyzer {

    private _originDoc:ts.SourceFile;
    private _convertedDoc:ITsDoc;

    /**
     * 读文件
     * external
     * */
    readSource(filePath:string):ITsDoc {
        try {
            this._originDoc = createOriginDoc(filePath);
            this.readTrees();
            this.createRef();
            return this._convertedDoc;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    /**
     * 读取语法树主干
     * @internal
     * */
    readTrees():void {
        this._convertedDoc = createCustomDoc(this._originDoc);
    }

    /**
     * 生成引用
     * @internal
     * */
    createRef():void {

    }
}

/**
 * 创建原版ts文档树
 * @param file 文件完整路径【相对|绝对】
 * */
function createOriginDoc(file:string):ts.SourceFile {
    //路径分段
    let pathVec:string[] = file.split(/[/\\]+/);
    //获取文件名
    let fileName:string = pathVec.pop();
    //读源文件
    let source:string = ts.sys.readFile(file,"utf8");
    if(!source) {
        throw new Error(`文件路径错误或文件内容为空！ ${file}`);
    }
    //生成-->返回语法书
    return ts.createSourceFile(fileName,source,ts.ScriptTarget.Latest);
}

/**
 * 创建自订文档树
 * */
function createCustomDoc(source:ts.SourceFile):ITsDoc {
    //创建对象
    let back:ITsDoc = {
        name:source.fileName,
        parent:null,
        interfaces:[],
        enums:[],
        classes:[],
        variables:[],
        functions:[],
        types:[],
        modules:[],
        children:[],
        viewType:EViewType.FILE
    };
    //创建子节点
    source.statements.forEach((statement:ts.Statement)=>{
        let node = createNode(statement);
        addChildNode(back,node);
    });
    return back;
}

//创建节点
function createNode(node:any):ITsNode {
    switch (node.kind) {
        case ts.SyntaxKind.ModuleDeclaration:{
            return createModuleNode(node);
        }
        case ts.SyntaxKind.TypeAliasDeclaration:{
            return createTypeNode(node);
        }
        case ts.SyntaxKind.InterfaceDeclaration:{
            return createInterfaceNode(node);
        }
        case ts.SyntaxKind.EnumDeclaration:{
            return createEnumNode(node);
        }
        case ts.SyntaxKind.VariableDeclaration:{
            return createVariableNode(node);
        }
        case ts.SyntaxKind.FunctionDeclaration:{
            return createFunctionNode(node);
        }
        case ts.SyntaxKind.MethodDeclaration:{
            return createMethodNode(node);
        }
        case ts.SyntaxKind.PropertyDeclaration:{
            return createPropertyNode(node);
        }

    }
}

//创建【模块】节点
function createModuleNode(origin:ts.ModuleDeclaration):IModuleNode {
    let back:IModuleNode = {

    };
    return back;
}

//创建【类型】节点
function createTypeNode(origin:ts.TypeAliasDeclaration):ITypeNode {
    return null;
}

//创建【接口】节点
function createInterfaceNode(origin:ts.InterfaceDeclaration):IInterfaceNode {
    return null;
}

//创建【枚举】节点
function createEnumNode(origin:ts.EnumDeclaration):IEnumNode {
    return null;
}

//创建【变量】节点
function createVariableNode(origin:ts.VariableDeclaration):IVariableNode {
    return null;
}

function createFunctionNode(origin:ts.FunctionDeclaration):IFunctionNode {
    return null;
}

function createMethodNode(origin:ts.MethodDeclaration):IMethodNode {
    return null;
}

function createPropertyNode(origin:ts.PropertyDeclaration):IPropertyNode {
    return null;
}

function createNoteNode(origin):INoteNode {
    return null;
}

function createStatementNode(origin:ts.Statement):IStatementNode {
    return null;
}

//父节点添加字节点
function addChildNode(parentNode:any,childNode:ITsNode):void {
    parentNode.children.push(childNode);
    switch (childNode.viewType) {
        case EViewType.CLASS:{
            parentNode.classes.push(childNode);
        } break;
        case EViewType.ENUM:{
            parentNode.enums.push(childNode);
        } break;
        case EViewType.EXPRESSION:{

        } break;
        case EViewType.FUNCTION:{
            parentNode.functions.push(childNode);
        } break;
        case EViewType.INTERFACE:{
            parentNode.interfaces.push(childNode);
        } break;
        case EViewType.METHOD:{
            parentNode.methods.push(childNode);
        } break;
        case EViewType.PROPERTY:{
            parentNode.properties.push(childNode);
        } break;
        case EViewType.MODULE:{
            parentNode.modules.push(childNode);
        } break;
        case EViewType.NOTE:{
            parentNode.note = childNode;
        } break;
        case EViewType.TYPE:{
            parentNode.types.push(childNode);
        } break;
        case EViewType.SIGNATURE:{

        } break;
        case EViewType.STATEMENT:{
            parentNode.params.push(childNode);
        } break;
        case EViewType.VARIABLE:{
            parentNode.variables.push(childNode);
        } break;
    }
}