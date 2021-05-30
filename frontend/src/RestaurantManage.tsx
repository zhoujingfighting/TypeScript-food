import React, { Suspense, useMemo} from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
// import OrderManage from './OrderManage'
// import FoodManage from './FoodManage'
// import DeskManage from './DeskManage'
// import AddFood from './AddFood'
import api from './api'
import createFetcher from './fetcher'
// import _ from 'lodash'
import { Tabs } from 'antd';
// import './css/resmanage.css'
const { TabPane } = Tabs;   
interface Iprops{
    rid:number
} 
// fetcher用法 ,请求不要到数据应该怎么办
const RestaurantManage:React.FC<React.PropsWithChildren<RouteComponentProps>> = (props:React.PropsWithChildren<RouteComponentProps>) => {
    const params = props.match.params 
    // const rid:string= params.rid === null? '' : params.rid 
    const rid = (params as any)?.rid
    console.log(rid)
//从后端拿到餐厅信息
    // async function logout(){
    //     await api.get('/logout')
    //     // //登出之后
    //     props.history.push('/')
    // }
    //这个请求只用请求一次
    // let RestaurantInfo = useMemo(() => {
    //     const userInfoFetcher = createFetcher(() => {
    //         return api.get('/userinfo')
    //     })
    //     return function RestaurantInfo(){ 
    //         const info = userInfoFetcher.read() 
    //         return (
    //             <div className='welcome'>
    //                <h2 className='res-h2'><span className='res-span'>欢迎{info.data.title}登录</span> </h2> 
    //             </div>
    //         )
    //     }
    // }, [])   
    // const userInfoFetcher = createFetcher(() => {
    //         return api.get('/userinfo')
    //     })    
    // const info = userInfoFetcher.read() 
    // const RestaurantInfo = null
    // useEffect(() => {
    //     RestaurantInfo =  function RestaurantInfo(){ 
    //         return (
    //             <div className='welcome'>
    //                <h2 className='res-h2'><span className='res-span'>欢迎{info.data.title}登录</span> </h2> 
    //             </div>
    //         )
    //     }
    // },[])
    // async function handleEvents(e){
    //     switch(e){
    //         case '1':
    //             props.history.push(`/restaurant/${rid}/manage/order`)
    //             break;
    //         case '2' :
    //             props.history.push(`/restaurant/${rid}/manage/food`)
    //             break
    //         case '3' : 
    //             props.history.push(`/restaurant/${rid}/manage/desk`)
    //             break
    //         case '4' : 
    //             await api.get('/logout')
    //             props.history.push('/')
    //             break
    //         default:
    //     }
    // }
    return (
        <div className='resmanage'>
            zhoujing
        </div>
    )
}
export default withRouter(RestaurantManage)