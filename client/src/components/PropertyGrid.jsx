/* eslint-disable react/prop-types */
import { useGetPropertiesQuery } from "../store/properties/api/properties.js";
import PropertyCard from "./PropertyCard.jsx";
import {Link} from 'react-router-dom'
const PropertyGrid = () => {
  const { data, error, isLoading } = useGetPropertiesQuery()
  console.log(error)
  console.log(data)

    return (
      <div>
        {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.map((property, index) => (
            <Link key={index} to={`/property/${property.property_id}`}>
              <PropertyCard  property={property} />
            </Link>
            
          ))}
        </div>
        ): null}
      </div>
    );
  };

export default PropertyGrid