// 404Page.js
import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mb-4">Страница не найдена</p>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
