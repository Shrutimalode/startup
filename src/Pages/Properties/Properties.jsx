import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getAllProperties } from '../../actions/Properties/Properties';
import { useNavigate } from 'react-router';
import MapPicker from '../../Components/MapPicker/MapPicker';
import toast from 'react-hot-toast';
import { addProperty } from '../../actions/AddProperty/AddProperty';
import { mutate } from 'swr';

const Properties = () => {
    const { data: properties, isLoading } = useSWR('properties', getAllProperties, {
        refreshInterval: 1000 * 60,
    });
    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

    const filteredProperties = properties?.filter(property => (filter === '' || filter === property?.project_type))?.filter(property =>
        property?.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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

    const handleAddProperty = async (formData) => {
        try {
            // Format the data to match the API structure
            const formattedData = {
                project_name: formData.project_name || "",
                project_type: formData.project_type || "plot",
                project_status: formData.project_status || "Rent",
                project_category: formData.project_category || "1bhk",
                price_unit: formData.price_unit || "rs",
                country: formData.country || "",
                city: formData.city || "",
                address: formData.address || "",
                latitude: formData.latitude ? parseFloat(formData.latitude) : 0,
                longitude: formData.longitude ? parseFloat(formData.longitude) : 0,
                description: formData.description || "",
                assigned_agent: formData.assigned_agent || "",
                aminities: formData.aminities || "",
                price: formData.price ? parseFloat(formData.price) : 0,
                contact: formData.contact || "",
                owner_name: formData.owner_name || "",
                image_url_1: formData.image_url_1 || "",
                image_url_2: formData.image_url_2 || "",
                image_url_3: formData.image_url_3 || "",
                total_buildup_area: formData.total_buildup_area ? parseFloat(formData.total_buildup_area) : 0,
                sealable_area: formData.sealable_area ? parseFloat(formData.sealable_area) : 0,
                north_side_area: formData.north_side_area ? parseFloat(formData.north_side_area) : 0,
                south_side_area: formData.south_side_area ? parseFloat(formData.south_side_area) : 0,
                east_side_area: formData.east_side_area ? parseFloat(formData.east_side_area) : 0,
                west_side_area: formData.west_side_area ? parseFloat(formData.west_side_area) : 0,
                verified: formData.verified || false,
                // Additional fields
                bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : 0,
                bedrooms: formData.bedrooms ? parseFloat(formData.bedrooms) : 0,
                living_room: formData.living_room ? parseFloat(formData.living_room) : 0,
                kitchen: formData.kitchen ? parseFloat(formData.kitchen) : 0,
                car_parking: formData.car_parking || "Not Available"
            };

            console.log("Sending data to API:", formattedData);
            
            const response = await addProperty(formattedData);
            
            if (response && response.status === 200) {
                toast.success("Property added successfully!");
                setShowAddPropertyModal(false);
                // Refresh the properties list
                mutate('properties');
            } else {
                console.error("API response:", response);
                toast.error("Failed to add property: " + (response?.data?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error adding property:", error);
            console.error("Error response:", error.response);
            toast.error("Failed to add property: " + (error.response?.data?.message || error.response?.data || error.message));
        }
    };

    return (
        <div className="properties-page bg-base-100 min-h-screen py-10">
            <div className="flex justify-between items-center mb-6 sm:mb-8 px-4 md:px-10">
                <div className="flex justify-center flex-1">
                    <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-10/12 max-w-md focus-within:outline-none"
                    />
                </div>
                <button
                    onClick={() => setShowAddPropertyModal(true)}
                    className="btn btn-primary ml-4"
                >
                    Add Property
                </button>
            </div>

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

            {showAddPropertyModal && (
                <AddPropertyModal onClose={() => setShowAddPropertyModal(false)} onSubmit={handleAddProperty} />
            )}
        </div>
    );
};

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const imgUrl = property?.image_url_1 || property?.image_url_2 || property?.image_url_3;
    const imgAlt = property?.project_name || property?.address || "";
    const propertyName = property?.project_name || "";

    const handleClick = () => {
        localStorage.setItem('property', JSON.stringify(property));
        navigate(`/propertyDetails`);
    }

    return (
        <button type='button' onClick={handleClick} aria-label='propertyBtn' className="card cursor-pointer rounded-lg h-32 sm:h-34 md:h-36 relative overflow-hidden bg-base-100 pb-2 shadow-xl">
            <img src={imgUrl} alt={imgAlt} className='absolute w-full h-full object-cover' />
            <div className="absolute w-full h-full bg-black/50 sm:bg-black/30" />
            <div className="absolute w-full h-full z-[2] flex justify-center items-center px-1 pb-1">
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

const AddPropertyModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        project_name: '',
        project_type: '',
        project_status: 'Sell',
        project_category: '',
        price_unit: 'rs',
        country: '',
        city: '',
        address: '',
        latitude: '',
        longitude: '',
        description: '',
        assigned_agent: '',
        aminities: '',
        price: '',
        contact: '',
        owner_name: '',
        owner_contact: '',
        image_url_1: '',
        image_url_2: '',
        image_url_3: '',
        total_buildup_area: '',
        sealable_area: '',
        north_side_area: '',
        south_side_area: '',
        east_side_area: '',
        west_side_area: '',
        verified: false,
        // Additional fields that might be expected by the API
        bathrooms: '',
        bedrooms: '',
        living_room: '',
        kitchen: '',
        car_parking: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLocationSelect = (latlng) => {
        setFormData(prev => ({
            ...prev,
            latitude: latlng.lat.toString(),
            longitude: latlng.lng.toString()
        }));
        toast.success("Location selected successfully!");
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    handleLocationSelect(latlng);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    let errorMessage = "Unable to fetch location. ";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage += "Permission denied. Please enable location access.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage += "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            errorMessage += "The request to get location timed out.";
                            break;
                        default:
                            errorMessage += "An unknown error occurred.";
                            break;
                    }
                    toast.error(errorMessage);
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    // Prepare initial position for the map
    const initialPosition = formData.latitude && formData.longitude ? 
        { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) } : null;

    const projectTypes = ['plot', 'farm', 'flat', 'house', 'apartment', 'villa', 'townhouse', 'commercial space', 'other'];
    const projectStatuses = ['Rent', 'Sell'];
    const projectCategories = ['1bhk', '2bhk', '3bhk', '4bhk', '1rk'];
    const priceUnits = ['rs', 'rs/sqft', 'acre', 'rs/sqmt'];

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-4xl max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>✕</button>
                        <h3 className="font-bold text-lg">Add New Property</h3>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="project_name"
                            placeholder="Project Name *"
                            value={formData.project_name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                        <select
                            name="project_type"
                            value={formData.project_type}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Project Type *</option>
                            {projectTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            name="project_status"
                            value={formData.project_status}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            {projectStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <select
                            name="project_category"
                            value={formData.project_category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Category *</option>
                            {projectCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="country"
                            placeholder="Country *"
                            value={formData.country}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            name="city"
                            placeholder="City *"
                            value={formData.city}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <textarea
                        name="address"
                        placeholder="Full Address *"
                        value={formData.address}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        rows="3"
                        required
                    />

                    {/* Location Coordinates Section */}
                    <div className="w-full mt-4">
                        <h3 className="text-lg font-semibold mb-2">Property Location</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                <button 
                                    type="button" 
                                    onClick={getCurrentLocation}
                                    className="btn btn-primary btn-sm md:btn-md"
                                >
                                    Get Current Location
                                </button>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                    <input
                                        name="latitude"
                                        type="number"
                                        step="any"
                                        placeholder="Latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        name="longitude"
                                        type="number"
                                        step="any"
                                        placeholder="Longitude"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>
                            
                            {/* Map Picker */}
                            <div className="mt-4">
                                <label className="label">
                                    <span className="label-text">Select location on map</span>
                                </label>
                                <MapPicker 
                                    onLocationSelect={handleLocationSelect} 
                                    initialPosition={initialPosition}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Click anywhere on the map to select the property location
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="price"
                            type="number"
                            placeholder="Price *"
                            value={formData.price}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                        <select
                            name="price_unit"
                            value={formData.price_unit}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            {priceUnits.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="contact"
                            placeholder="Contact Number *"
                            value={formData.contact}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            name="owner_name"
                            placeholder="Owner Name"
                            value={formData.owner_name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        <input
                            name="owner_contact"
                            placeholder="Owner Contact"
                            value={formData.owner_contact}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        <input
                            name="assigned_agent"
                            placeholder="Assigned Agent"
                            value={formData.assigned_agent}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['image_url_1', 'image_url_2', 'image_url_3'].map((field, index) => (
                            <input
                                key={field}
                                name={field}
                                placeholder={`Image URL ${index + 1}`}
                                value={formData[field]}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        ))}
                    </div>

                    {/* Area Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { name: 'total_buildup_area', label: 'Total Buildup Area' },
                            { name: 'sealable_area', label: 'Sealable Area' },
                            { name: 'north_side_area', label: 'North Side Area' },
                            { name: 'south_side_area', label: 'South Side Area' },
                            { name: 'east_side_area', label: 'East Side Area' },
                            { name: 'west_side_area', label: 'West Side Area' },
                            { name: 'bathrooms', label: 'Bathrooms' },
                            { name: 'bedrooms', label: 'Bedrooms' },
                            { name: 'living_room', label: 'Living Room' },
                            { name: 'kitchen', label: 'Kitchen' }
                        ].map(({ name, label }) => (
                            <input
                                key={name}
                                name={name}
                                type="number"
                                step="any"
                                placeholder={label}
                                value={formData[name]}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        ))}
                    </div>

                    {/* Car Parking */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Car Parking</span>
                        </label>
                        <select
                            name="car_parking"
                            value={formData.car_parking}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Parking</option>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>

                    {/* Description and Amenities */}
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        rows="4"
                    />
                    <textarea
                        name="aminities"
                        placeholder="Amenities (comma separated)"
                        value={formData.aminities}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        rows="3"
                    />

                    {/* Verification */}
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Verified Property</span>
                            <input
                                type="checkbox"
                                name="verified"
                                checked={formData.verified}
                                onChange={handleChange}
                                className="checkbox"
                            />
                        </label>
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Property</button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}

export default Properties;