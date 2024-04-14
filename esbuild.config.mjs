import esbuild from 'esbuild'

// eslint-disable-next-line no-undef
const arguments_ = process.argv.slice(2)
const development = arguments_.includes('--dev')

esbuild.buildSync({
  bundle: true,
  entryPoints: ['./src/extension.ts'],
  external: ['vscode'],
  format: 'cjs',
  minify: !development,
  outfile: 'dist/extension.js',
  platform: 'node',
  sourcemap: development,
})
