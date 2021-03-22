"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compile_1 = require("./compile");
const typecheck_1 = require("./typecheck");
typecheck_1.default(async () => {
    const build = await compile_1.compile();
    console.log(build);
    build.warnings.forEach(warning => {
        console.warn(warning);
    });
    build.outputFiles?.forEach(file => {
        console.log(file);
    });
});
