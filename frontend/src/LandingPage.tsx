import React, { Suspense, useState } from 'react';
import { withRouter,RouteComponentProps } from 'react-router';
import api from './api';
// import createFetcher from './fetcher';
// import './css/landingpage.css'
// var fetcher = createFetcher( (did:number) =>{
//     return api.get('/deskinfo?did=' + did , {
//         did : did
//     })
//     //url后面是问号,所以用的req.query
// })
interface Idid{
    did:string
}
const DeskInfo  = (did: Idid) => {
    api.get('/deskinfo?did=' + did).then(res => console.log(res))
    // console.log(info)
    return (
        // <div >
        //     <span>您当前桌次是:</span>
        //     <span>{info.title}</span>
        //     {/* 桌号 和 餐厅名字(后端的数据库关键字里面有title) */}
        //     <span>{info.name + '桌'}</span>
        // </div>
        <div>
            <p>zhoujing
               </p>
        </div>

    )
}
const LandingPage:React.FC<React.PropsWithChildren<RouteComponentProps>> = (props:React.PropsWithChildren<RouteComponentProps>) => {
    // var [cumstom, setCustom] = useState(0)
    // var rid = props.match.params.rid
    var did:string = (props.match.params as any)?.did
    // function startOrder() {
    //     props.history.push(`/r/${rid}/d/${did}/c/${cumstom}`)
    // }
    // 获取餐厅信息
    // fetcher 和 suspense
    return (
        <div className='restitle'>
            {/* <Suspense fallback={<div>正在加载桌面信息</div>} > */}
                <DeskInfo did = {did}/>
            {/* </Suspense> */}
            {/* <h1 className='foodpeople'> 选择用餐人数 </h1>
            <li className={cumstom === 1 ? 'active' : null} onClick={() => { setCustom(1) }}>1</li>
            <li className={cumstom === 2 ? 'active' : null} onClick={() => { setCustom(2) }}>2</li>
            <li className={cumstom === 3 ? 'active' : null} onClick={() => { setCustom(3) }}>3</li>
            <li className={cumstom === 4 ? 'active' : null} onClick={() => { setCustom(4) }}>4</li><br></br>
            <button onClick={startOrder}>
                开始点餐
            </button> */}
        </div>
    )
}
export default withRouter(LandingPage)
