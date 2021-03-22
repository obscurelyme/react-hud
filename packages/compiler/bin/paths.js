"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUD = exports.SANDBOX = exports.PACKAGES = void 0;
const path_1 = require("path");
const ROOT = path_1.resolve(__dirname, '..', '..', '..');
/**
 * Path to packages directory
 */
exports.PACKAGES = path_1.resolve(ROOT, 'packages');
const SANDBOX_ROOT = path_1.resolve(exports.PACKAGES, 'sandbox');
const SANDBOX_SOURCE = path_1.resolve(SANDBOX_ROOT, 'src');
const SANDBOX_DIST = path_1.resolve(SANDBOX_ROOT, 'dist');
const SANDBOX_TSCONFIG = path_1.resolve(SANDBOX_ROOT, 'tsconfig.json');
const HUD_ROOT = path_1.resolve(exports.PACKAGES, 'hud');
const HUD_SOURCE = path_1.resolve(HUD_ROOT, 'src');
const HUD_DIST = path_1.resolve(HUD_ROOT, 'dist');
/**
 * Paths within the Sandbox package
 */
exports.SANDBOX = {
    ROOT: SANDBOX_ROOT,
    SOURCE: SANDBOX_SOURCE,
    DIST: SANDBOX_DIST,
    TSCONFIG: SANDBOX_TSCONFIG,
};
/**
 * Path within the HUG package
 */
exports.HUD = {
    ROOT: HUD_ROOT,
    SOURCE: HUD_SOURCE,
    DIST: HUD_DIST,
};
