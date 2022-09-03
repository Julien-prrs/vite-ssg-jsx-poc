/// <reference types="vite/client" />

declare namespace JSX {
   export type Element = any
   export interface IntrinsicElements {
      [elemName: string]: any
   }
}
