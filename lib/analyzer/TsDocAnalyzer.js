"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const Interface_1 = require("../interface/Interface");
class Analyzer {
    /**
     * 读文件
     * external
     * */
    readSource(filePath) {
        this._originDoc = createOriginDoc(filePath);
        this.readTrees();
        this.createRef();
        return this._convertedDoc;
    }
    /**
     * 读取语法树主干
     * @internal
     * */
    readTrees() {
        this._convertedDoc = createCustomDoc(this._originDoc);
    }
    /**
     * 生成引用
     * @internal
     * */
    createRef() {
    }
}
exports.Analyzer = Analyzer;
/**
 * 创建原版ts文档树
 * @param file 文件完整路径【相对|绝对】
 * */
function createOriginDoc(file) {
    //路径分段
    let pathVec = file.split(/[/\\]+/);
    //获取文件名
    let fileName = pathVec.pop();
    //读源文件
    let source = ts.sys.readFile(file, "utf8");
    //生成-->返回语法书
    return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest);
}
/**
 * 创建自订文档树
 * */
function createCustomDoc(source) {
    //创建对象
    let back = {
        name: source.fileName,
        parent: null,
        interfaces: [],
        enums: [],
        classes: [],
        variables: [],
        functions: [],
        types: [],
        modules: [],
        children: [],
        viewType: Interface_1.EViewType.FILE
    };
    //创建子节点
    source.statements.forEach((statement) => {
        let node = createNode(statement);
        addChildNode(back, node);
    });
    return back;
}
//创建节点
function createNode(node) {
    switch (node.kind) {
        case ts.SyntaxKind.ModuleDeclaration: {
            return createModuleNode(node);
        }
        case ts.SyntaxKind.TypeAliasDeclaration: {
            return createTypeNode(node);
        }
        case ts.SyntaxKind.InterfaceDeclaration: {
            return createInterfaceNode(node);
        }
        case ts.SyntaxKind.EnumDeclaration: {
            return createEnumNode(node);
        }
        case ts.SyntaxKind.VariableDeclaration: {
            return createVariableNode(node);
        }
        case ts.SyntaxKind.FunctionDeclaration: {
            return createFunctionNode(node);
        }
        case ts.SyntaxKind.MethodDeclaration: {
            return createMethodNode(node);
        }
        case ts.SyntaxKind.PropertyDeclaration: {
            return createPropertyNode(node);
        }
    }
}
//创建【模块】节点
function createModuleNode(origin) {
    return null;
}
//创建【类型】节点
function createTypeNode(origin) {
    return null;
}
//创建【接口】节点
function createInterfaceNode(origin) {
    return null;
}
//创建【枚举】节点
function createEnumNode(origin) {
    return null;
}
//创建【变量】节点
function createVariableNode(origin) {
    return null;
}
function createFunctionNode(origin) {
    return null;
}
function createMethodNode(origin) {
    return null;
}
function createPropertyNode(origin) {
    return null;
}
function createNoteNode(origin) {
    return null;
}
function createStatementNode(origin) {
    return null;
}
//父节点添加字节点
function addChildNode(parentNode, childNode) {
    parentNode.children.push(childNode);
    switch (childNode.viewType) {
        case Interface_1.EViewType.CLASS:
            {
                parentNode.classes.push(childNode);
            }
            break;
        case Interface_1.EViewType.ENUM:
            {
                parentNode.enums.push(childNode);
            }
            break;
        case Interface_1.EViewType.EXPRESSION:
            {
            }
            break;
        case Interface_1.EViewType.FUNCTION:
            {
                parentNode.functions.push(childNode);
            }
            break;
        case Interface_1.EViewType.INTERFACE:
            {
                parentNode.interfaces.push(childNode);
            }
            break;
        case Interface_1.EViewType.METHOD:
            {
                parentNode.methods.push(childNode);
            }
            break;
        case Interface_1.EViewType.PROPERTY:
            {
                parentNode.properties.push(childNode);
            }
            break;
        case Interface_1.EViewType.MODULE:
            {
                parentNode.modules.push(childNode);
            }
            break;
        case Interface_1.EViewType.NOTE:
            {
                parentNode.note = childNode;
            }
            break;
        case Interface_1.EViewType.TYPE:
            {
                parentNode.types.push(childNode);
            }
            break;
        case Interface_1.EViewType.SIGNATURE:
            {
            }
            break;
        case Interface_1.EViewType.STATEMENT:
            {
                parentNode.params.push(childNode);
            }
            break;
        case Interface_1.EViewType.VARIABLE:
            {
                parentNode.variables.push(childNode);
            }
            break;
    }
}
