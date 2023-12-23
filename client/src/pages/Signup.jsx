import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner' 
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Expresión regular para validar que el nombre contiene solo letras
    const nameRegex = /^[A-Za-z]+$/;
    if (!name.match(nameRegex)) {
      toast.error('Por favor, ingresa un nombre válido (solo letras)')
      throw new Error('Por favor, ingresa un nombre válido (solo letras)');
    }
  
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      toast.error('Por favor, ingresa un correo electrónico válido')
      throw new Error('Por favor, ingresa un correo electrónico válido');
    }
  
    // Expresión regular para validar que la contraseña contenga al menos un número y una letra
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!password.match(passwordRegex)) {
      toast.error('Por favor, una contraseña valida')
      throw new Error('La contraseña debe tener al menos 4 caracteres, incluyendo al menos una letra y un número');
    }
  
    try {
      const data = await axios.post('http://localhost:4001/auth/signup', {
        name,
        email,
        password,
      });
      toast.success('user created successfully')
      console.log(data);
    } catch (error) {
      toast.error(`Error: user couldn't be created`)
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
       <Toaster richColors  />
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
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
            Registrarse
          </button>
        </div>
        <Link to={'/login'} className='text-zinc-700 '>Tienes usuario? Inicia sesion</Link>
      </form>
    </div>
  );
};

export default Signup;
