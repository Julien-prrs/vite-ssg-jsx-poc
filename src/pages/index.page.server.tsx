import axios from 'axios'

export const onBeforeRender = async (context) => {
   const dogs = (await axios.get('https://dog.ceo/api/breeds/list/all')).data.message
   const pageProps = { dogs }

   return {
      pageContext: { pageProps }
   }
}

export const Page = (pageProps) => <>
   <h1>Index</h1>
   <pre>{ JSON.stringify(pageProps) }</pre>
   <ul>
      { Object.keys(pageProps.dogs).map(dog => <li key={dog}>{dog}</li>) }
   </ul>
   <a href="/about">about</a>
</>
