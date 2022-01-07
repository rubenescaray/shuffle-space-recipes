import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/authService'
import { useDispatch } from 'react-redux'
import { login } from '../redux/user'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await AuthService.register(username, email, password)

    if (resp.error) {
      alert(resp.error)
      return
    }

    dispatch(login(resp))
    alert('User created and logged!')
    navigate('/recipes')
  }

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser !== null) {
      dispatch(login(currentUser))
      navigate('/recipes')
    }
  }, [])

  return (
    <div className="login-page">
      <div className="divider"></div>
      <div className="section">
      <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='Register' className='btn btn-block' />
      </form>
      </div>
    </div>
  )
}

export default Register