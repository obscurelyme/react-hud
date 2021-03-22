"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileIncremental = exports.compile = void 0;
const esbuild = require("esbuild");
const paths_1 = require("./paths");
const options = [...process.argv];
// NOTE: Don't care about first 2 arguments
options.splice(0, 2);
async function compile() {
    return new Promise((resolve, reject) => {
        esbuild
            .build({
            entryPoints: [`${paths_1.SANDBOX.SOURCE}/index.tsx`],
            bundle: true,
            platform: 'browser',
            target: 'es2020',
            outfile: `${paths_1.SANDBOX.DIST}/app.js`,
            sourcemap: 'inline',
            minify: false,
            format: 'esm',
            define: {
                'process.env.NODE_ENV': '"development"',
            },
            color: true,
            incremental: false,
            treeShaking: true,
            tsconfig: `${paths_1.SANDBOX.TSCONFIG}`,
        })
            .then((build) => {
            resolve(build);
        })
            .catch(reason => {
            reject(reason);
        });
    });
}
exports.compile = compile;
async function compileIncremental() {
    return new Promise((resolve, reject) => {
        esbuild
            .build({
            entryPoints: [`${paths_1.SANDBOX.SOURCE}/index.tsx`],
            bundle: true,
            platform: 'browser',
            target: 'es2020',
            outfile: `${paths_1.SANDBOX.DIST}/app.js`,
            sourcemap: 'inline',
            minify: false,
            format: 'esm',
            define: {
                'process.env.NODE_ENV': '"development"',
            },
            color: true,
            incremental: true,
            treeShaking: true,
            tsconfig: `${paths_1.SANDBOX.TSCONFIG}`,
        })
            .then((build) => {
            resolve(build);
        })
            .catch(reason => {
            reject(reason);
        });
    });
}
exports.compileIncremental = compileIncremental;
