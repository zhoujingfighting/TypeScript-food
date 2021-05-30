import React, { useRef} from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import api from './api'
const Register:React.FC<React.PropsWithChildren<RouteComponentProps>> = (props:React.PropsWithChildren<RouteComponentProps>) => {
    const nameref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    const emailref = useRef<HTMLInputElement>(null)
    const titleref = useRef<HTMLInputElement>(null)
    async function register(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const name: string = nameref.current === null ? "" : nameref.current.value
        if(!name.length){
            alert('用户名不能为空')
            return
        }    
        const email = emailref.current === null ? "" : emailref.current.value
        const password = passwordref.current === null ? "" : passwordref.current.value
        const title = titleref.current === null ? "" : titleref.current.value
        try{
            await api.post('/register',{name,email,password,title})
            props.history.push('/login') 
        }catch(error){
                alert('此用户名已经存在')
        }
    }
    return (
        <div className='register'>
            <div className='reg-bg'></div>
            <div className='register-title'>
                <h1
                className='reg-h1'
                >餐厅管理员注册</h1>
            </div>
            <form onSubmit={register}>
                <div className='register-flex'>
                    <span>用户名:</span>
                    <input type = 'text' ref={nameref} placeholder='请输入用户名'/>
                </div> 
                <div className='register-flex'>
                    <span >邮&nbsp;&nbsp;&nbsp;箱:</span>
                    <input type = 'email' ref={emailref} />
                </div> 
                <div className='register-flex'>
                    <span >密&nbsp;&nbsp;&nbsp;码:</span>
                    <input type = 'password' ref={passwordref}/>
                </div>
                <div className='register-flex'>
                    <span>餐厅名:</span>
                    <input type = 'text' ref={titleref} placeholder='请输入餐厅名称'/>
                </div>
                <div className='register-button'>
                    <button>点击此处注册您的餐厅</button>
                </div>
            </form>
        </div>
    )
}
export default withRouter(Register)

