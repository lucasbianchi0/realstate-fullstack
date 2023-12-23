import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyDetail from './pages/PropertyDetail';
import Account from './pages/Account';


const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path='/login' element={ <Login/>} />
          <Route path='/signup' element={ <Signup/>} />
          <Route path='/account' element={ <Account/>} />
          <Route path='/property/:id' element={ <PropertyDetail/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

