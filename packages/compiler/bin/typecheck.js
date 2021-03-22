"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const paths_1 = require("./paths");
/**
 * Exit Status Codes
 */
const FILE_NOT_FOUND = 4;
var DiagnosticCode;
(function (DiagnosticCode) {
    DiagnosticCode[DiagnosticCode["InitialBuild"] = 6031] = "InitialBuild";
    DiagnosticCode[DiagnosticCode["IncrementalBuild"] = 6032] = "IncrementalBuild";
    DiagnosticCode[DiagnosticCode["Error"] = 6193] = "Error";
    DiagnosticCode[DiagnosticCode["MaybeSuccess"] = 6194] = "MaybeSuccess";
})(DiagnosticCode || (DiagnosticCode = {}));
const formatHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
};
function reportDiagnostic(diagnostic) {
    console.error('Error', diagnostic.code, ':', ts.formatDiagnosticsWithColorAndContext([diagnostic], formatHost));
}
function reportWatchStatusChanged(diagnostic, errorCount, onSuccess) {
    if (diagnostic.code === DiagnosticCode.InitialBuild || diagnostic.code === DiagnosticCode.IncrementalBuild) {
        // skip...
        return;
    }
    if (!errorCount) {
        onSuccess();
    }
    process.stdout.write(ts.formatDiagnostic(diagnostic, formatHost));
}
function typecheck(onSuccess) {
    const configPath = ts.findConfigFile(paths_1.SANDBOX.TSCONFIG, ts.sys.fileExists);
    if (!configPath) {
        console.error('Could not find a valid tsconfig.json file');
        process.exit(FILE_NOT_FOUND);
    }
    const createProgram = ts.createSemanticDiagnosticsBuilderProgram;
    const host = ts.createWatchCompilerHost(configPath, {}, ts.sys, createProgram, reportDiagnostic, (diagnostic, newLine, options, errorCount) => {
        reportWatchStatusChanged(diagnostic, errorCount, onSuccess);
    });
    const origCreateProgram = host.createProgram;
    host.createProgram = (rootNames, options, host, oldProgram) => {
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    const origPostProgramCreate = host.afterProgramCreate;
    host.afterProgramCreate = program => {
        origPostProgramCreate(program);
    };
    ts.createWatchProgram(host);
}
exports.default = typecheck;
