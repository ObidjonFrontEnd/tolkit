import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	useMediaQuery,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice'

const MainLayout = () => {
	const [open, setOpen] = useState(false)
	const isMobile = useMediaQuery('(max-width: 600px)')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const token = useSelector(state => state.user.accessToken)
	const handleToggleDrawer = () => setOpen(!open)

	const handleLogout = async () => {
		dispatch(logout())
		navigate('/')
	}
		useEffect(()=>{
			localStorage.setItem('accessToken' , JSON.stringify(token))
		},[token])

	return (
		<div className='flex h-screen flex-col'>
			<AppBar position='sticky' sx={{ zIndex: 1300 }}>
				<Toolbar className='flex justify-between'>
					<h1 className='text-white'>App</h1>
					{isMobile ? (
						<Button color='inherit' onClick={handleToggleDrawer}>
							<MenuIcon />
						</Button>
					) : (
						<div className='flex space-x-4'>
							<NavLink
								to='/dashboard'
								className={({ isActive }) =>
									isActive ? 'text-orange-500 font-semibold' : 'text-white'
								}
							>
								Dashboard
							</NavLink>
							<NavLink
								to='/users'
								className={({ isActive }) =>
									isActive ? 'text-orange-500 font-semibold' : 'text-white'
								}
							>
								Users
							</NavLink>
							<NavLink
								to='/comments'
								className={({ isActive }) =>
									isActive ? 'text-orange-500 font-semibold' : 'text-white'
								}
							>
								Comments
							</NavLink>
						</div>
					)}
				</Toolbar>
			</AppBar>


			{isMobile && (
	<Drawer 
		open={open}
		onClose={handleToggleDrawer}
		sx={{
			width: 250,
			flexShrink: 0,
			'& .MuiDrawer-paper': {
				width: 250,
				boxSizing: 'border-box',
				paddingTop: '64px', // Это добавит отступ сверху, чтобы элементы списка были ниже AppBar
			},
		}}
		variant='temporary'
		anchor='left'
	>
		<List className='space-y-4'>
			<ListItem className='cursor-pointer' button onClick={() => navigate('/dashboard')}>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem className='cursor-pointer' button onClick={() => navigate('/users')}>
				<ListItemText primary='Users' />
			</ListItem>
			<ListItem className='cursor-pointer' button onClick={() => navigate('/comments')}>
				<ListItemText primary='Comments' />
			</ListItem>
		</List>
	</Drawer>
			)}


			<div className='flex-1 p-6'>
				<Outlet />
			</div>

			{isMobile && (
				<Button
					variant='contained'
					color='error'
					onClick={handleLogout}
					className='m-4 fixed bottom-0 left-0 right-0'
				>
					Logout
				</Button>
			)}
		</div>
	)
}

export default MainLayout
