import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { escapeInject, dangerouslySkipEscape, PageContextBuiltIn } from 'vite-plugin-ssr'
import ReactDOMServer from 'react-dom/server'
import Document, { DocumentProps } from './components/Document'

type BuildManifest = {
   [entry: string]: {
      file: string,
      src?: string,
      isEntry?: boolean,
      imports?: string[]
      css?: string[]
   }
}

const getDevelopmentAssets = (): DocumentProps['Assets'] => ({
   Styles: () => undefined,
   Scripts: () => <script type="module" src="/src/main.ts" />
})

const getProductionAssets = (manifest: BuildManifest): DocumentProps['Assets'] => ({
   Styles: () => manifest['src/main.ts'].css.map((path: string) => <link rel="stylesheet" href={path} />),
   Scripts: () => <script type="module" src={manifest['src/main.ts'].file} />
})

export const render = async (pageContext) => {
   const manifestPath = resolve('./dist/client/manifest.json')
   const manifest: false | BuildManifest = existsSync(manifestPath) && JSON.parse(readFileSync(manifestPath) as unknown as string)

   const { Page, pageProps } = pageContext
   const assets = import.meta.env.PROD ? getProductionAssets(manifest as BuildManifest) : getDevelopmentAssets()

   const template = ReactDOMServer.renderToStaticMarkup(
      <Document Assets={assets}>
         <Page {...pageProps} />
      </Document>
   )

   return escapeInject`<!DOCTYPE html>${dangerouslySkipEscape(template)}`
}
