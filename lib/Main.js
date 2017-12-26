"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsDocAnalyzer_1 = require("./analyzer/TsDocAnalyzer");
// const rootPath:string = process.cmd();
// const outPath:string = path.join(rootPath,"out");
//
let g_reader = new TsDocAnalyzer_1.Analyzer();
// let render = new RenderAdapter();
function testReader() {
    const testFilePath = "ForTest.ts";
    let doc = g_reader.readSource(testFilePath);
    console.dir(doc);
}
testReader();
