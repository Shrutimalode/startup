import React, { useEffect, useRef, useState } from "react";
import { FaCar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import Modal from "../../Components/Modal/Modal";
import { getUser, isAuthenticated, setRedirectAfterLogin } from "../../Utils/AuthData";
import toast from "react-hot-toast";
import { bookProperty } from "../../actions/PropertyDetails/PropertyActions";

const PropertyDetails = () => {
    const [property, setProperty] = useState(null);
    const imgRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const propertyData = localStorage.getItem("property");
        if (propertyData) setProperty(JSON.parse(propertyData));
    }, []);

    if (!property) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const handleBookNow = () => {
        if (!isAuthenticated()) {
            setRedirectAfterLogin('/propertyDetails');
            navigate('/login');
            return;
        }

        const user = getUser();
        const bookingData = {
            property_id: property?.property_id || property?.id,
            user_id: user?.id,
        };

        toast.promise(bookProperty(bookingData), {
            loading: 'Booking property...',
            success: (data) => {
                if (data?.status === 200) {
                    toast.success('Property booked successfully');
                } else {
                    toast.error(data?.detail || 'Booking failed');
                }
            },
            error: (err) => {
                toast.error(err?.detail || 'Booking failed');
            }
        });
    };

    return (
        <div className="h-full flex flex-col">
            <div onClick={() => property?.image_url_1 ? imgRef?.current?.showModal() : null} className="relative h-1/3 sm:h-3/5">
                {property?.image_url_1 && <img ref={imgRef} src={property?.image_url_1} alt="Property" className="w-full absolute h-full object-cover" />}
                <div className="w-full absolute h-full bg-base-content/10" />
                <div className="absolute top-0 left-0 p-2 z-[2]">
                    <Link to="/properties"><IoIosArrowBack className="bg-white p-1 rounded-full text-3xl shadow inset-4 text-black" /></Link>
                </div>
            </div>
            <div className="px-6 overflow-auto">
                <h1 className="text-3xl max-h-18 overflow-hidden font-bold mt-4 capitalize truncate-2">{property?.project_name}</h1>
                <p className="text-base-content/50 text-sm mt-2 truncate">{property?.description}</p>
                <div className="mt-2 text-xs font-medium flex flex-wrap gap-1 border-b border-base-content/35 pb-4">
                    {property?.living_room && <span>{property?.living_room || 0} Living Room &middot;</span>}
                    {property?.bedrooms && <span className="text-nowrap">{property?.bedrooms || 0} Bedrooms &middot;</span>}
                    {property?.kitchen && <span>{property?.kitchen || 0} Kitchen &middot;</span>}
                    {property?.bathrooms && <span>{property?.bathrooms || 0} Bathrooms</span>}
                </div>


                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Property Details :</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm pb-4">
                        <p><span className="font-semibold">Type:</span> <span className="uppercase">{property?.project_type}</span></p>
                        <p><span className="font-semibold">Status:</span> {property?.project_status}</p>
                        <p><span className="font-semibold">Category:</span> {property?.project_category}</p>

                        {
                            property?.car_parking === "Available" &&
                            <p className="flex items-center gap-2 flex-wrap">
                                <span className="text-nowrap font-semibold">Car Parking:</span>
                                <span >
                                    <input type="checkbox" checked={property?.car_parking === 'Available'} onChange={() => { }} className={`checkbox ${property?.car_parking === 'Available' ? 'text-success' : 'text-error'}`} name="car_parking" id="car_parking" />
                                </span>
                            </p>
                        }

                    </div>
                    <p className="w-full max-h-12 pb-4 truncate-2 overflow-hidden"><span className="font-semibold">Address:</span> {property?.address}</p>

                    {
                        property?.additional_details && (
                            <div className="additional border-t border-base-content/35 pt-4">
                                <h2 className="text-lg font-semibold">Additional Details:</h2>
                                <p className="text-sm mt-2 opacity-75">
                                    {property?.additional_details} Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi reiciendis praesentium, molestias architecto quasi in numquam earum facere ipsum nisi perferendis quibusdam vitae neque eligendi error distinctio, natus esse fugit.
                                </p> 
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="mt-auto sticky shadow-2xl shadow-white bottom-0 left-0 w-full bg-base-300 py-2 rounded-t-lg">
                <div className="flex px-10 justify-between items-center">
                    <div className="flex flex-col items-center gap-0">
                        <span>Price :</span>
                        <span>
                            <span className="text-lg font-bold mr-2">{property?.price}</span>
                            <span className="font-semibold">{property?.price_unit}</span>
                        </span>
                    </div>
                    <button onClick={() => handleBookNow()} className="btn btn-primary">
                        Book Now
                    </button>
                </div>

            </div>
            <Modal className={''} ref={imgRef}> <img src={property?.image_url_1} alt="Property" className="w-full h-full object-contain" /></Modal>
        </div>
    )
};

export default PropertyDetails;