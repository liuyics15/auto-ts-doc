"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 视图枚举
 * */
var EViewType;
(function (EViewType) {
    EViewType[EViewType["VALUE"] = 0] = "VALUE";
    EViewType[EViewType["TYPE"] = 1] = "TYPE";
    EViewType[EViewType["STATEMENT"] = 2] = "STATEMENT";
    EViewType[EViewType["MODULE"] = 3] = "MODULE";
    EViewType[EViewType["INTERFACE"] = 4] = "INTERFACE";
    EViewType[EViewType["ENUM"] = 5] = "ENUM";
    EViewType[EViewType["CLASS"] = 6] = "CLASS";
    EViewType[EViewType["VARIABLE"] = 7] = "VARIABLE";
    EViewType[EViewType["PROPERTY"] = 8] = "PROPERTY";
    EViewType[EViewType["METHOD"] = 9] = "METHOD";
    EViewType[EViewType["FUNCTION"] = 10] = "FUNCTION";
    EViewType[EViewType["FILE"] = 11] = "FILE";
    EViewType[EViewType["EXPRESSION"] = 12] = "EXPRESSION";
    EViewType[EViewType["SIGNATURE"] = 13] = "SIGNATURE";
    EViewType[EViewType["NOTE"] = 14] = "NOTE"; /*注释*/
})(EViewType = exports.EViewType || (exports.EViewType = {}));
/**
 * 附加关键字枚举
 * */
var ESignature;
(function (ESignature) {
    ESignature[ESignature["EXPORT"] = 0] = "EXPORT";
    ESignature[ESignature["ABSTRACT"] = 1] = "ABSTRACT";
    ESignature[ESignature["READONLY"] = 2] = "READONLY"; /*只读*/
})(ESignature = exports.ESignature || (exports.ESignature = {}));
