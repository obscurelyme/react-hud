import { compile } from './compile';
import typecheck from './typecheck';

typecheck(async () => {
  try {
    const build = await compile();
    build.warnings.forEach(warning => {
      console.warn(warning);
    });
    build.outputFiles?.forEach(file => {
      console.log(file);
    });
  } catch (e) {
    console.error('Build Failure:', e);
  }
});
