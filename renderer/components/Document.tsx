export type DocumentProps = {
   Assets: {
      Styles: () => JSX.IntrinsicElements | JSX.IntrinsicElements[]
      Scripts: () => JSX.IntrinsicElements | JSX.IntrinsicElements[]
   }
   children?: JSX.Element | JSX.Element[] | JSX.IntrinsicElements | JSX.IntrinsicElements[]
}

export default ({ Assets, children }: DocumentProps) => {
   return (
      <html lang="en" dir="ltr">
         <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + JSX SSG app</title>
            <Assets.Styles />
         </head>
         <body>
            <div id="app">{ children }</div>
            <Assets.Scripts />
         </body>
      </html>
   )
}
