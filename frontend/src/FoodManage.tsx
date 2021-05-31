import React, { useEffect, useState } from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import Foodprops from './types/Foodprops'
import './css/foodmanage.css'
import {FoodProps1} from './types/Props'
/*
    菜品管理页面应该是:左侧是选择品区,右侧是选择的菜区
*/

function FoodItem( props:FoodProps1){
    const food = props.food
    const onDelete = props.onDelete
    const primary : Foodprops ={
        name:food.name ,
        desc :food.desc ,
        price :food.priFood,
        category :food.category,
        status:food.status,
        img: null 
    }

    const [foodInfo,setFoodInfo] = useState(food)
    const [isMOdify,setIsModify] = useState(false)
    const [foodProps,setFoodProps] = useState(primary)
    function save(){
        const fd = new FormData()
        //这个是为了传图片
        for(const key in foodProps){
            const val = (foodProps as any)[key]
            fd.append(key,val)
        }
        api.put(`/restaurant/${food.rid}/food/` + food.id,fd).then( (foodInfo) =>{
            //这个api还得改一下
            // console.log(foodInfo)
            setFoodInfo(foodInfo.data)
        })
        setIsModify(!isMOdify)
        //重新把食品信息渲染出来
    }
    //菜品修改,后端然后把菜单信息返回来与同时渲染到页面上
    function change(e:React.FormEvent<HTMLInputElement>){
        setFoodProps({
            ...foodProps,
        [(e.target as any)?.name] : (e.target as any).value
        })
    }
    function imgChange(e:React.FormEvent<HTMLInputElement>){
        setFoodProps({
            ...foodProps,
             img : (e.target as any)?.files[0]
        })
    }
    function deletFood(){
         api.delete(`/restaurant/${food.rid}/food/`+ food.id).then( () => {
             onDelete(food.id)
            //  api.get(`/restaurant/food`).then(res =>{
            //     setFoods(res.data)
            // })
         })
            
    }
    function setOffline(){
        api.put(`/restaurant/${food.rid}/food/`+ food.id ,{
            ...foodProps,
            status:'on'
        }).then( (res)=>{
            setFoodInfo(res.data)
        })
    }
    function setOnline(){
        api.put(`/restaurant/${food.rid}/food/`+ food.id ,{
            ...foodProps,
            status:'off'
        }).then(res =>{
            setFoodInfo(res.data)
        })
    }
    return (
        <div className='fooditem-wrap'>
            <h3>{'菜名 : '+ foodInfo.name}</h3>
            {
                !isMOdify?
            <div>
                <img src={'http://localhost:5000/uploader/' + foodInfo.img} alt={foodInfo.name} className='foodimg'></img>
                <div className='foodinfo-wrap'>
                    <p>顾客评价&nbsp;:&nbsp;{foodInfo.desc}</p>
                    <p>价格&nbsp;:&nbsp;{foodInfo.price}</p>
                    <p>分类&nbsp;:&nbsp;{foodInfo.category?foodInfo.category:'暂未分类'}</p>
                </div>
            </div>:
            <div className='changeinfo'>
                <div>
                    名称:<input type='text' onChange={change} defaultValue={foodInfo.name} name='name'></input>
                </div>
                 <div>
                    描述:<input type='text' onChange={change} defaultValue={foodInfo.desc} name='desc'></input>
                 </div>
                
                 <div>
                    价格:<input type='text' onChange={change} defaultValue={foodInfo.price} name='price'></input>
                 </div>
               
                 <div>
                 分类:<input type='text' onChange={change} defaultValue={foodInfo.category} name='category'></input>
                 </div>
                 
                 <div>
                 分类&nbsp;:<input type='file' onChange={imgChange} name='img'></input>
                 </div>
                 
            </div>
            }
            <div className='foodchoose-wrap'>
                <button onClick={()=>{setIsModify(true)}}>修改</button>
                <button onClick={save}>保存</button>
                {foodInfo.status === 'on' && 
                <button onClick={ setOnline }>下架</button>}
                {foodInfo.status === 'off' && 
                <button onClick={ setOffline }>上架</button>}
                <button onClick={deletFood}>删除</button>
            </div>
        </div>
    )
}
export default function FoodManage(){
    const [foods,setFoods] = React.useState([])
    React.useEffect( () => {
        api.get(`/restaurant/food`).then(res =>{
            setFoods(res.data)
            //每次都需要渲染重新加载
        })
    },[])
    console.log( foods )
    //拿到所有食物列表 ,
    function onDelete(id:string){
        setFoods(foods.filter(item => !((item as any)?.id === id)))
    }
    return (
        <div> 
            <div className='addfood'>
                <Link to='/manage/add-food'><i className="iconfont addfont">&#xe618;</i></Link>
                <span>&nbsp;&nbsp;添加菜品</span> 
            </div>
            {/* 总添加菜品标签 */}
            <div>
                {
                foods.map(food => {
                    return (
                        <FoodItem key={(food as any)?.id} food={food} onDelete = {onDelete}/>
                    )
                })
                }
            </div>
        </div>
    )
}