import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/user/UserSlice';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.user);


  useEffect(()=>{
    if (userLogged.isAuthenticated){
      navigate('/')
    }
  },[userLogged,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email)
      console.log(password)
      const response = await axios.post('http://localhost:4001/auth/login',
      {
        email,
        password
      })
      console.log(response.data)
      const user = response.data
      dispatch(loginSuccess(user))
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </div>
        <Link to={'/signup'} className='text-zinc-700 '>No tienes usuario? Registrate</Link>
      </form>

    </div>
  );
};

export default Login;
