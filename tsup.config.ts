import { defineConfig } from 'tsup'
//  tsup config file
export default defineConfig({
  outExtension({ format }) {
    // esm
    if (format === 'esm') {
      return {
        js: '.mjs',
      }
    }
    // global
    if (format === 'iife') {
      return {
        js: '.global.js',
      }
    }
    // cjs
    return {
      js: '.cjs',
    }
  },
})
