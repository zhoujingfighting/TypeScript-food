import fetch from 'unfetch'
const fetcher = (url:string) => fetch(url).then(r => r.json())
export default fetcher
// export default funcFetcher;