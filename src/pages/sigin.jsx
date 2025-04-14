import {
	Box,
	Button,
	CircularProgress,
	Modal,
	TextField,
	Typography,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/userSlice'

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [fullname, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const [data, dataSet] = useState('')
	const [error, setError] = useState(null)
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const submit = async event => {
		event.preventDefault()
		setOpen(false)
		setLoading(true)
		try {
			const respons = await axios.post(
				'https://api.ashyo.fullstackdev.uz/auth/register',
				{
					fullname,
					email,
					password,
				}
			)
			setOpen(false)
			dataSet(respons.data)
			dispatch(
				setUser({
					accessToken: respons.data.accessToken,
					username: respons.data.user.fullname,
					email: respons.data.user.email,
				})
			)
			navigate('/dashboard')
		} catch (error) {
			setError(error.response?.data?.message || 'Ошибка при логине')
			setOpen(true)
		} finally {
			setLoading(false)
		}
	}
	const handleClose = () => setOpen(false)

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4'>
				<h2 className='text-2xl font-bold text-center'>Sign In</h2>
				<form className='space-y-4' onSubmit={submit}>
					<TextField
						label='Username'
						type='text'
						fullWidth
						onChange={e => {
							setFullName(e.target.value)
						}}
					/>
					<TextField
						label='Email'
						type='email'
						fullWidth
						onChange={e => {
							setEmail(e.target.value)
						}}
					/>
					<TextField
						label='Password'
						type='password'
						fullWidth
						onChange={e => {
							setPassword(e.target.value)
						}}
					/>
					<Button type='submit' variant='contained' fullWidth>
						{loading ? (
							<CircularProgress size={24} color='inherit' />
						) : (
							'Sign In'
						)}
					</Button>
					<Button
						type='button'
						variant='contained'
						fullWidth
						sx={{
							backgroundColor: '#ffff',
							color: '#1976d2',
							'&:hover': {
								color: '#ffff',
								backgroundColor: '#1976d2',
							},
						}}
						onClick={() => {
							navigate('/')
						}}
					>
						Login
					</Button>
				</form>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'flex-end',
				}}
			>
				<Box className='bg-white p-4 m-4 rounded-xl shadow-lg w-80'>
					<Typography
						id='modal-title'
						variant='h6'
						component='h2'
						className='mb-2 text-red-600'
					>
						Error
					</Typography>
					<Typography id='modal-description' className='mb-4'>
						{error}
					</Typography>
					<Button
						variant='contained'
						color='error'
						onClick={handleClose}
						fullWidth
					>
						Close
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
