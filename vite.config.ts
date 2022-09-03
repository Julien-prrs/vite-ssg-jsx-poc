import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { defineConfig, Plugin } from 'vite'
import ssr from 'vite-plugin-ssr/plugin'

/**
 * TEMP: Temporary plugin to remove an entry if not used.
 * TODO: Take some time to make PR to avoid this dirty plugin ???
 *       @see: `isUsingClientRouter` from node/plugin/plugins/extractExportNamesPlugin.ts
 *       @see: is `config.vitePluginSsr.prerender` accessible from node/plugin/plugins/buildConfig.ts
 */
const _defaultClientPagePath = resolve(__dirname, 'renderer/_default.page.client.tsx')
const noUnusedEntryPlugin = (): Plugin => {
   let usePrerender: boolean = false
   let useClientRouting: boolean = (
      existsSync(_defaultClientPagePath) &&
      /export const clientRouting(\s.*|)=(\s.*|)true/gm.test(readFileSync(_defaultClientPagePath).toString())
   )

   return {
      name: 'no-unused-entry-plugin',
      apply: 'build',
      enforce: 'post',
      config(config) {
         // @ts-ignore
         usePrerender = config.vitePluginSsr.prerender !== false
      },
      options(options) {
         if (!useClientRouting) delete options.input['entry-client-routing']
         if (usePrerender) delete options.input['entry-server-routing']
      }
   }
}

export default defineConfig({
   clearScreen: false,
   plugins: [
      ssr({ prerender: true }),
      noUnusedEntryPlugin()
   ],
   build: {
      rollupOptions: {
         input: {
            main: resolve(__dirname, 'src/main.ts')
         }
      }
   },
   esbuild: {
      jsxInject: `import React from 'react'`
   }
})
