/* eslint-disable react/prop-types */

const PropertyCard = ({ property }) => {
    return (
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <img className="w-full mb-2 lg:h-[250px]" src={property.img} alt={property.title} />
        <div className="text-xl font-semibold mb-2">{property.title}</div>
        <div className="mb-2">{property.description}</div>
        <div className="text-green-600 font-bold mb-2">${property.price}</div>
      </div>
    );
  };

export default PropertyCard;