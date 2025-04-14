import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
	const token = useSelector(state => state.user.accessToken)

			useEffect(()=>{
				localStorage.setItem('accessToken' , JSON.stringify(token))
			},[token])
	return (
		<div>
			<Outlet/>
		</div>
	)
}

export default AuthLayout
