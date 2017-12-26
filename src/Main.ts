import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import {IDocAnalyzer} from "./interface/Interface";
import {RenderAdapter} from "./view/RenderAdapter";

const rootPath:string = process.cmd();
const outPath:string = path.join(rootPath,"out");

let reader:IDocAnalyzer;
let render = new RenderAdapter();

