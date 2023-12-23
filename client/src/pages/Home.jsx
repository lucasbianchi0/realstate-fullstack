import { useSelector } from "react-redux";
import NavBar from "../components/NavBar.jsx";
import PropertyGrid from "../components/PropertyGrid.jsx";
// import {properties} from "../db.js"

const Home = () => {
  const userLogged = useSelector((state)=>state.user)
  console.log(userLogged)
  return (
    <div >
        <NavBar/>
        <div className="container mx-auto p-4">
          <h1>Hola, { userLogged?.user?.name} </h1>
          <h2 className="text-3xl font-bold mb-4">Listado de Propiedades</h2>
          <PropertyGrid />
        </div>
      
    </div>
  );
};

export default Home;
