import * as ts from 'typescript';
import { SANDBOX } from './paths';

/**
 * Exit Status Codes
 */
const FILE_NOT_FOUND = 4;

enum DiagnosticCode {
  InitialBuild = 6031,
  IncrementalBuild = 6032,
  Error = 6193,
  MaybeSuccess = 6194,
}

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

function reportDiagnostic(diagnostic: ts.Diagnostic): void {
  console.error('Error', diagnostic.code, ':', ts.formatDiagnosticsWithColorAndContext([diagnostic], formatHost));
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic, errorCount: number, onSuccess: () => void): void {
  if (diagnostic.code === DiagnosticCode.InitialBuild || diagnostic.code === DiagnosticCode.IncrementalBuild) {
    // skip...
    return;
  }

  if (!errorCount) {
    onSuccess();
  }

  process.stdout.write(ts.formatDiagnostic(diagnostic, formatHost));
}

export default function typecheck(onSuccess: () => void): void {
  const configPath = ts.findConfigFile(SANDBOX.TSCONFIG, ts.sys.fileExists);
  if (!configPath) {
    console.error('Could not find a valid tsconfig.json file');
    process.exit(FILE_NOT_FOUND);
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    (diagnostic: ts.Diagnostic, newLine: string, options: ts.CompilerOptions, errorCount?: number) => {
      reportWatchStatusChanged(diagnostic, errorCount, onSuccess);
    }
  );

  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames: ReadonlyArray<string>, options, host, oldProgram) => {
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;

  host.afterProgramCreate = program => {
    origPostProgramCreate(program);
  };

  ts.createWatchProgram(host);
}
