import  { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../store/properties/api/properties";
import NavBar from '../components/NavBar.jsx'
import PropertySlider from '../components/PropertySlider';
import { Toaster, toast } from 'sonner' 

const PropertyDetail = () => { 
  const { id } = useParams()
  const { data, error, isLoading } = useGetPropertyByIdQuery(id)
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(``);

  useEffect(()=>{
    setMessage(`Hola, me interesa esta propiedad (codigo #${data?.property_id}) y quiero que me contacten para brindarme más información. Muchas gracias.`)
  },[data])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4001/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      });

      if (response.ok) {
        toast.success('Correo enviado correctamente');
      } else {
        toast.error('Error al enviar el correo')
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar el correo')
    }
  }

  return (
    <div>
      <NavBar/>
      <Toaster richColors/>
      {error ? (
      <>Oh no, there was an error</>
    ) : isLoading ? (
      <>Loading...</>
    ) : data ? (
      <div className="container lg:w-[85%] mx-auto p-4">
        <h2 className="text-2xl font-bold mb-2 text-[22px] lg:text-[30px] ">{data.title}</h2>
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="md:w-3/5 pt-4">
            <PropertySlider images={data.img} />
          </div>
          <div className="pt-4 lg:p-4 lg:shadow-lg">
            <p className="text-2xl font-bold text-green-500 mb-2">${data.price}</p>
            <p className="text-gray-700 mb-4">
              {data.description}
            </p>

            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-2 text-zinc-700">Consultar por esta propiedad</h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  placeholder='user@mail.com'
                  type="email"
                  id="email"
                  name="email"
                  className="border rounded w-full py-2 px-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="min-h-[100px] border rounded w-full py-2 px-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>):null}
    </div>
  );
};

export default PropertyDetail;
