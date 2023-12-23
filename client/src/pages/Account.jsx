import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";

const Account = () => {
    const userLogged = useSelector((state)=>state.user)

  return (
    <div>
        <NavBar/>
        <div className="flex justify-center h-screen">
            <div className="bg-white shadow-md rounded border p-8 h-[250px] max-w-md w-5/6 mt-20 ">
                <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-bold mb-2">Nombre</label>
                    <p className="text-gray-600">{userLogged?.user?.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-bold mb-2">Correo Electrónico</label>
                    <p className="text-gray-600">{userLogged?.user?.email}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Account;
