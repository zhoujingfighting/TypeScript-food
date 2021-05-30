import useSWR from 'swr'
import React from 'react';
import api from './api'
interface Did{
    did:number
}
function funcFetcher(did:number): Promise<string> {
    return api.get('/deskinfo?did=' + did)
}
export default () => {

}
// export default funcFetcher;