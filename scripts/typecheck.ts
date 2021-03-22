import * as ts from 'typescript';
import { SANDBOX } from './paths';

/**
 * Exit Status Codes
 */
const SUCCESS = 0;
const FILE_NOT_FOUND = 4;
const UNKNOWN = 6;

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

function reportDiagnostic(diagnostic: ts.Diagnostic): void {
  //
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic): void {
  process.stdout.write(ts.formatDiagnostic(diagnostic, formatHost));
}

function main(): void {
  const configPath = ts.findConfigFile(SANDBOX.TSCONFIG, ts.sys.fileExists);
  if (!configPath) {
    process.stderr.write('Could not find a valid tsconfig.json file');
    process.exit(FILE_NOT_FOUND);
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames: ReadonlyArray<string>, options, host, oldProgram) => {
    console.log('** Creating program **');
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;

  host.afterProgramCreate = program => {
    console.log('** Finished making program **');
    origPostProgramCreate!(program);
  };

  ts.createWatchProgram(host);
}

main();

// const args = ['workspace', '@coffee-maker/sandbox', 'typecheck'];
// const proc = spawn('yarn', args, {
//   stdio: 'pipe',
// });

// proc.on('error', err => {
//   process.stdout.write(err);
// });

// proc.on('close', code => {
//   process.stderr.write(`Process exited with code: ${code}`);
// });

// proc.on('message', msg => {
//   process.stdout.write(msg);
// });

// proc.on('something', () => {
//   process.stdout.write('something was called');
// });

// process.stdout.write('write this...');

// proc.emit('something');
