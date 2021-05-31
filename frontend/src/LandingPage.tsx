import React, { Suspense, useState } from 'react';
import useSWR from 'swr'
import fetcher from './fetcher'
import url from'./types/url'
import Idid from './types/Idid'
import { withRouter,RouteComponentProps } from 'react-router';
import api from './api';
// import './css/landingpage.css'
interface idid{
    did:string
}
const DeskInfo  = (did: idid) => {
    // api.get('/deskinfo?did=' + did).then(res => console.log(res))
    const id = did.did
    const {data,error} = useSWR(url+ id,fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <div>
            <div >
                <span>您当前桌次是:</span>
                <span>{data.title}</span>
                {/* 桌号 和 餐厅名字(后端的数据库关键字里面有title) */}
                <span>{data.name + '桌'}</span>
            </div>
        </div>

    )
}
const LandingPage:React.FC<React.PropsWithChildren<RouteComponentProps>> = (props:React.PropsWithChildren<RouteComponentProps>) => {
    const [cumstom, setCustom] = React.useState(0)
    const rid:string = (props.match.params as any)?.rid
    const did:string = (props.match.params as any)?.did
    console.log(did,rid)
    function startOrder() {
        props.history.push(`/r/${rid}/d/${did}/c/${cumstom}`)
    }
    // 获取餐厅信息
    // fetcher 和 suspense
    return (
        <div className='restitle'>
            <DeskInfo did = { did }/>
            <h1 className='foodpeople'> 选择用餐人数 </h1>
            <li className = {cumstom === 1 ? 'active' : ''} onClick={() => { setCustom(1) }}>1</li>
            <li className={cumstom === 2 ? 'active' : ''} onClick={() => { setCustom(2) }}>2</li>
            <li className={cumstom === 3 ? 'active' : ''} onClick={() => { setCustom(3) }}>3</li>
            <li className={cumstom === 4 ? 'active' : ''} onClick={() => { setCustom(4) }}>4</li><br></br>
            <button onClick={startOrder}>
                开始点餐
            </button>
        </div>
    )
}
export default withRouter(LandingPage)
