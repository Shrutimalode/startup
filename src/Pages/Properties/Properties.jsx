import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getAllProperties } from '../../actions/Properties/Properties';
import { useNavigate } from 'react-router';

const Properties = () => {
    const { data: properties, isLoading } = useSWR('properties', getAllProperties, {
        refreshInterval: 1000 * 60,
    });
    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = properties?.filter(property => (filter === '' || filter === property?.project_type))?.filter(property =>
        property?.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // const filters = [...new Set(properties?.map(property => property?.project_type))];

    useEffect(() => {
        const typeFilter = localStorage.getItem('typeFilter');
        if (typeFilter) {
            setFilter(typeFilter);
            localStorage.removeItem('typeFilter');
        }
        const searchFilter = localStorage.getItem('searchFilter');
        if (searchFilter) {
            setSearchTerm(searchFilter);
            localStorage.removeItem('searchFilter');
        }
    }, [properties]);

    return (
        <div className="properties-page bg-base-100 min-h-screen py-10">
            {/* <h1 className="text-4xl font-bold text-center text-primary mb-4">Properties</h1> */}
            <div className="flex justify-center mb-6 sm:mb-8">
                <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-10/12 focus-within:outline-none max-w-none"
                />
            </div>

            {/* <form className="filter w-full flex justify-center items-center gap-2 mb-4">
                <input className="btn btn-square" onClick={() => setFilter('')} type="reset" value="×" />
                {filters.map((filtert, index) => (<input key={`${filtert}_${index}`} onClick={() => setFilter(filtert)} className="btn" type="radio" name="frameworks" aria-label={filtert} checked={filtert === filter} />))}
            </form> */}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 md:px-10">
                {isLoading ? (
                    [...Array(8)].map((_, i) => <PropertySkeleton key={`property_skeleton_${i}`} />)
                ) : (
                    filteredProperties.length > 0 ? (
                        filteredProperties.map((property, i) => <PropertyCard key={`property_card_${i}`} property={property} />)
                    ) : (
                        <div className="col-span-full text-center text-error">
                            <p>No properties found.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

const PropertyCard = ({ property }) => {
    const naviagate = useNavigate();
    const imgUrl = property?.image_url_1 || property?.image_url_2 || property?.image_url_3;
    const imgAlt = property?.project_name || property?.address || "";
    const propertyName = property?.project_name || "";

    const handleClick = () => {
        localStorage.setItem('property', JSON.stringify(property));
        naviagate(`/propertyDetails`);
    }

    return (
        <button type='button' onClick={()=>handleClick()} aria-label='propertyBtn' className="card cursor-pointer rounded-lg h-32 sm:h-34 md:h-36 relative overflow-hidden bg-base-100 pb-2 shadow-xl">
            <img src={imgUrl} alt={imgAlt} className='absolute w-full h-full' />
            <div className="absolute w-full h-full bg-black/50 sm:bg-black/30" />
            <div className="absolute w-full h-full z-[2] flex justify-cneter items-center px-1 pb-1">
                <div className="font-bold text-white text-sm uppercase w-full overflow-hidden max-h-10 flex text-center truncate-2">{propertyName}</div>
            </div>
        </button>
    );
}
const PropertySkeleton = () => {
    return (
        <div className="card rounded-lg overflow-hidden h-32 sm:h-34 md:h-36 bg-base-100 pb-2 shadow-xl">
                <div className="skeleton w-full h-full absolute"></div>
        </div>
    );
}

export default Properties;


{/* <div className="card rounded-lg overflow-hidden bg-base-100 pb-2 shadow-xl">
    <div className="img relative h-24 border border-base-content/40">
        <img src={property?.image_url_1} alt={property?.project_name} className='w-full h-full absolute z-[2]' />
        <div className="skeleton w-full h-full absolute"></div>
    </div>
    <div className="border border-base-content/40 rounded-b-lg py-2 flex flex-col gap-1 items-start px-2 justify-center">
        <div className="font-bold text-lg uppercase">{property.project_name}</div>
        <div className='flex gap-1 text-sm font-semibold'>Price: <span className='opacity-70'>{property?.price}</span><span className='opacity-70'>{property?.price_unit}</span></div>
    </div>
</div> */}