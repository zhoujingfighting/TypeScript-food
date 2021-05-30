import React, { useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import api from './api'
//React.FC<接口名>
const Login: React.FC<React.PropsWithChildren<RouteComponentProps>> = (props: React.PropsWithChildren<RouteComponentProps>) => {
    const nameref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    console.log('login')
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const name: string = nameref.current === null ? "" : nameref.current.value
        const password = passwordref.current === null ? "" : passwordref.current.value
        try {
            const res = await api.post('/login', { name, password })
            //要带状态
            props.history.push(`/restaurant/${res.data.id}/manage`)
        } catch (error) {
            alert('登录名或者密码错误')
        }

    }
    return (
        <div>
            <div className='background'>
            </div>
            <div className='login'>
                <div className='title'>
                    <h1 className='log-h1'>餐厅管理员登录</h1>
                </div>
                <div className='form'>
                    <form onSubmit={login}>
                        <div className='flex'>
                            <span>用户名:</span>
                            <input type='text' ref={nameref} placeholder='请输入账户名' />
                        </div>
                        <div className='flex'>
                            <span>密&nbsp;&nbsp;&nbsp;码:</span>
                            <input type='password' ref={passwordref} />
                        </div>
                        <div className='button'>
                            <button className='log-button'>点击此处登录</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login)