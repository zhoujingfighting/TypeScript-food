import React, { Suspense, useMemo} from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import OrderManage from './OrderManage'
import FoodManage from './FoodManage'
import DeskManage from './DeskManage'
import AddFood from './AddFood'
import api from './api'
import useSWR from 'swr'
import fetch from 'unfetch'
import fetcher from './fetcher'
import url from './types/deskinfo'
import { Tabs } from 'antd';
import './css/resmanage.css'
const { TabPane } = Tabs;   
interface Iprops{
    rid:number
} 
// const fetcher = (url:string) => fetch(url).then(r => r.json())
// fetcher用法 ,请求不要到数据应该怎么办
const RestaurantManage:React.FC<React.PropsWithChildren<RouteComponentProps>> = (props:React.PropsWithChildren<RouteComponentProps>) => {
    const params = props.match.params 
    // const rid:string= params.rid === null? '' : params.rid 
    const rid = (params as any)?.rid
    console.log(rid)
//从后端拿到餐厅信息
    async function logout(){
        await api.get('/logout')
        // //登出之后
        props.history.push('/')
    }
    //这个请求只用请求一次   
    console.log(url)   
    const { data } = useSWR(url + '?uid=' + rid, fetcher)
    console.log(data)
    const RestaurantInfo = () => {
            if (!data) return <div>loading...</div>
            else{
               return (
                <div className='welcome'>
                   <h2 className='res-h2'><span className='res-span'>欢迎{data.title}</span> </h2> 
                </div>
            ) 
            }       
    } 
    // const RestaurantInfo = () => {
    //     const {data,error} = useSWR(url,fetcher)
    //     console.log(data)
    //     if(data){
    //         return (
    //             <div>
    //                 zhoujing
    //             </div>
    //         )
    //     }else{
    //         return (
    //             <div>
    //                 dfd
    //             </div>
    //         )
    //     }
    // }
    async function handleEvents(e:string){
        switch(e){
            case '1':
                props.history.push(`/restaurant/${rid}/manage/order`)
                break;
            case '2' :
                props.history.push(`/restaurant/${rid}/manage/food`)
                break
            case '3' : 
                props.history.push(`/restaurant/${rid}/manage/desk`)
                break
            case '4' : 
                await api.get('/logout')
                props.history.push('/')
                break
            default:
        }
    }
    return (
        <div className='resmanage'>
               <RestaurantInfo /> 
        <nav className='res-nav'>
            {/* 导航栏 */}
            <Tabs  onChange={handleEvents}>
                 <TabPane tab="订单管理" key="1" >
                 </TabPane>
                 <TabPane tab="菜品管理" key="2" >
                 </TabPane>
                 <TabPane tab="桌面管理" key="3">
                 </TabPane>
                 <TabPane tab="退出登录" key="4">
                 </TabPane>
            </Tabs>
        </nav>
        <main>
            <Switch>
                <Route path="/restaurant/:rid/manage/order" component={ OrderManage } ></Route>
                <Route path='/restaurant/:rid/manage/food'  component={ FoodManage } ></Route>
                <Route path='/restaurant/:rid/manage/desk'  component={ DeskManage } ></Route>
                <Route path='/restaurant/:rid/manage/add-food'  component={ AddFood } ></Route>
            </Switch>
        </main>
    </div>
    )
}
export default withRouter(RestaurantManage)