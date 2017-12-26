import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import {IDocAnalyzer} from "./interface/Interface";
import {Analyzer} from "./analyzer/TsDocAnalyzer";

// const rootPath:string = process.cmd();
// const outPath:string = path.join(rootPath,"out");
//
let g_reader:IDocAnalyzer = new Analyzer();
// let render = new RenderAdapter();
function testReader():void {
    const testFilePath = "../ForTest.ts";
    let doc = g_reader.readSource(testFilePath);
    console.dir(doc);
}

testReader();