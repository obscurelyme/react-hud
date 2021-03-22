import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * Path to packages directory
 */
export const PACKAGES = resolve(__dirname, '..', 'packages');
const SANDBOX_ROOT = resolve(PACKAGES, 'sandbox');
const SANDBOX_SOURCE = resolve(SANDBOX_ROOT, 'src');
const SANDBOX_DIST = resolve(SANDBOX_ROOT, 'dist');
const SANDBOX_TSCONFIG = resolve(SANDBOX_ROOT, 'tsconfig.json');
const HUD_ROOT = resolve(PACKAGES, 'hud');
const HUD_SOURCE = resolve(HUD_ROOT, 'src');
const HUD_DIST = resolve(HUD_ROOT, 'dist');
/**
 * Paths within the Sandbox package
 */
export const SANDBOX = {
    ROOT: SANDBOX_ROOT,
    SOURCE: SANDBOX_SOURCE,
    DIST: SANDBOX_DIST,
    TSCONFIG: SANDBOX_TSCONFIG,
};
/**
 * Path within the HUG package
 */
export const HUD = {
    ROOT: HUD_ROOT,
    SOURCE: HUD_SOURCE,
    DIST: HUD_DIST,
};
