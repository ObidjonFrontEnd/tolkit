import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/sigin'
import Dashboard from './pages/Dashboard'
import AuthLayout from './Layout/AuthLayout'
import MainLayout from './Layout/MainLayout'
import Users from './pages/users'
import Comments from './pages/comments'
import NotFoundPage from './pages/nonFoudent'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
	console.log(isAuthenticated);
	
  if (!isAuthenticated) {
    return <Navigate to='/' /> 
  }
  return children
}

const ProtectedRouteNo = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to='/dashboard' /> 
  }
  return children
}

function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route element={<ProtectedRouteNo><AuthLayout /></ProtectedRouteNo>}>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>

  
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/comments' element={<Comments />} />
          </Route>

        
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
