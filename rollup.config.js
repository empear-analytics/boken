import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import * as meta from './package.json'

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`

export default {
    input: 'src/index.js',
    plugins: [
        terser({output: {preamble: copyright}}),
        nodeResolve()
    ],
    output: {
        file: 'dist/boken.min.js',
        format: 'umd',
        name: 'boken',
        indent: false,
    }
}
