const esbuild = require('esbuild');
const { resolve } = require('path');
const chokidar = require('chokidar');

const SANDBOX_PATH = resolve(__dirname, '..', 'packages', 'sandbox', 'src');

const watcher = chokidar.watch(SANDBOX_PATH, {
  persistent: true,
});

watcher.on('add', path => {
  console.log(`File ${path} has been added`);
});

watcher.on('change', path => {
  console.log('File', path, 'was changed');
  esbuild
    .build({
      entryPoints: [`${SANDBOX_PATH}/index.tsx`],
      bundle: true,
      outfile: `${SANDBOX_PATH}/../dist/app.js`,
      define: {
        'process.env.NODE_ENV': '"development"',
      },
    })
    .then()
    .catch();
});

watcher.on('close', () => {
  console.log('Watcher has closed');
});

watcher.on('error', error => {
  console.log('Error', error);
  watcher.close();
});
