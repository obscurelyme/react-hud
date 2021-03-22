import * as esbuild from 'esbuild';
import { SANDBOX } from './paths';

const options = [...process.argv];
// NOTE: Don't care about first 2 arguments
options.splice(0, 2);

export type Build = esbuild.BuildResult & {
  outputFiles: esbuild.OutputFile[];
};

export type IncrementalBuild = esbuild.BuildIncremental;

export async function compile(): Promise<Build> {
  return new Promise((resolve, reject) => {
    esbuild
      .build({
        entryPoints: [`${SANDBOX.SOURCE}/index.tsx`],
        bundle: true,
        platform: 'browser',
        target: 'es2020',
        outfile: `${SANDBOX.DIST}/app.js`,
        sourcemap: 'inline',
        minify: false,
        format: 'esm',
        define: {
          'process.env.NODE_ENV': '"development"',
        },
        color: true,
        incremental: false,
        treeShaking: true,
        tsconfig: `${SANDBOX.TSCONFIG}`,
      })
      .then((build: Build) => {
        resolve(build);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}

export async function compileIncremental(): Promise<IncrementalBuild> {
  return new Promise((resolve, reject) => {
    esbuild
      .build({
        entryPoints: [`${SANDBOX.SOURCE}/index.tsx`],
        bundle: true,
        platform: 'browser',
        target: 'es2020',
        outfile: `${SANDBOX.DIST}/app.js`,
        sourcemap: 'inline',
        minify: false,
        format: 'esm',
        define: {
          'process.env.NODE_ENV': '"development"',
        },
        color: true,
        incremental: true,
        treeShaking: true,
        tsconfig: `${SANDBOX.TSCONFIG}`,
      })
      .then((build: IncrementalBuild) => {
        resolve(build);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}
