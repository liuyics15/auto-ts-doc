import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";
import {IDocAnalyzer, ITsDoc, ITsNode} from "../interface/Interface";

class Analyzer implements IDocAnalyzer {

    private _originDoc:ts.SourceFile;
    private _convertedDoc:ITsDoc;

    /**
     * 读文件
     * external
     * */
    readSource(file:string):ITsDoc {
        this._originDoc = createOriginDoc(file);
        this.readTrees();
        this.createRef();
    }

    /**
     * 读取语法树主干
     * @internal
     * */
    readTrees():void {

    }

    /**
     * 生成引用
     * @internal
     * */
    createRef():void {

    }
}

interface IRef {
    ref_nodes:string[];
    target:ITsNode;
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
    //生成-->返回语法书
    return ts.createSourceFile(fileName,source,ts.ScriptTarget.Latest);
}

/**
 * 创建自订文档树
 * */
function createCustomDoc(source:ts.SourceFile):ITsDoc {

}

//
function createNode(node:ts.Node):ITsNode {
    switch (node.kind) {
        case ts.SyntaxKind.ModuleDeclaration:{

        }
    }
}