import React from 'react'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import { useSelector } from 'react-redux'

const Users = () => {
	const { username, email } = useSelector((state) => state.user)
	return (
		<Card className="w-full max-w-sm mx-auto shadow-xl rounded-2xl mt-[100px]">
			<h1 className='text-center py-[20xp] text-[24px] font-bold'>Users</h1>
		<CardContent className="flex flex-col items-center gap-4 p-6">
			<Avatar sx={{ width: 64, height: 64 }} className="bg-blue-500">
				{username?.charAt(0)?.toUpperCase()}
			</Avatar>
			<div className="text-center">
				<Typography variant="h6" className="text-gray-800 font-semibold">
					{username || 'Имя пользователя'}
				</Typography>
				<Typography variant="body2" className="text-gray-600">
					{email || 'Email не указан'}
				</Typography>
			</div>
		</CardContent>
		</Card>
	)
}

export default Users
