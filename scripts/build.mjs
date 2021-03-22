import esbuild from 'esbuild';
import chokidar from 'chokidar';
import { SANDBOX } from './paths.ts';
import { exec, spawn } from 'child_process';

const typecheckProcess = spawn('yarn', ['workspace', '@coffee-maker/sandbox', 'typecheck'], {
  stdio: 'inherit',
});

typecheckProcess.on('error', err => {
  console.error(err);
});

typecheckProcess.on('data', data => {
  process.stdin.write(data);
});

typecheckProcess.on('close', code => {
  if (code !== 0) {
    console.log(`typechecking exited with code ${code}`);
  }
  process.stdin.end();
});

const watcher = chokidar.watch(SANDBOX.SOURCE, {
  persistent: true,
});

watcher.on('add', path => {
  console.log(`File ${path} has been added`);
});

watcher.on('change', path => {
  console.log('File:', path, 'was changed');
  typecheckProcess.send();
  exec('yarn workspace @coffee-maker/sandbox typecheck', (err, stdout, stdin) => {
    if (err) {
      console.error(stdout);
    } else {
      // esbuild
      //   .build({
      //     entryPoints: [`${SANDBOX.SOURCE}/index.tsx`],
      //     bundle: true,
      //     minify: false,
      //     sourcemap: 'inline',
      //     outfile: `${SANDBOX.DIST}/app.js`,
      //     define: {
      //       'process.env.NODE_ENV': '"development"',
      //     },
      //   })
      //   .then()
      //   .catch();
    }
  });
});

watcher.on('close', () => {
  console.log('Watcher has closed');
});

watcher.on('error', error => {
  console.log('Error', error);
  watcher.close();
});
