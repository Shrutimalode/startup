import toast from "react-hot-toast";
import MapPicker from "../../../Components/MapPicker/MapPicker";

const LocationForm = ({ data = {}, handleInputChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "contact") {
            if (value === "0") return;
            handleInputChange(name, value.trim());
            return;
        }

        handleInputChange(name, value);
    }

    const handleLocationSelect = (latlng) => {
        handleInputChange("latitude", latlng.lat.toString());
        handleInputChange("longitude", latlng.lng.toString());
        toast.success("Location selected successfully!");
    }

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
    const initialPosition = data?.latitude && data?.longitude ? 
        { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) } : null;

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4 ">
            <div className="px-4 h-full w-full flex gap-6 flex-wrap justify-center overflow-auto items-center">

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Address</legend>
                    <input type="text" value={data?.["address"] || ""} placeholder="Address" name="address" pattern=".*[a-zA-Z].*" minLength={3} title="Address" onChange={handleChange} className="input input-sm sm:input-md w-full validator focus-within:outline-none" required />
                    <p className="validator-hint !hidden sm:flex">Field Required</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">City</legend>
                    <input type="text" value={data?.["city"] || ""} placeholder="City" name="city" pattern=".*[a-zA-Z].*" minLength={3} title="City" onChange={handleChange} className="input input-sm sm:input-md w-full validator focus-within:outline-none" required />
                    <p className="validator-hint !hidden sm:flex">Field Required</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">District</legend>
                    <input type="text" value={data?.["district"] || ""} placeholder="District" pattern=".*[a-zA-Z].*" name="district" minLength={3} title="District" onChange={handleChange} className="input input-sm sm:input-md w-full validator focus-within:outline-none" required />
                    <p className="validator-hint !hidden sm:flex">Field Required</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">State</legend>
                    <input type="text" value={data?.["state"] || ""} placeholder="State" pattern=".*[a-zA-Z].*" name="state" minLength={3} title="State" onChange={handleChange} className="input input-sm sm:input-md w-full validator focus-within:outline-none" required />
                    <p className="validator-hint !hidden sm:flex">Field Required</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Country</legend>
                    <input type="text" value={data?.["country"] || ""} placeholder="Country" pattern=".*[a-zA-Z].*" name="country" minLength={3} title="Country" onChange={handleChange} className="input input-sm sm:input-md w-full validator focus-within:outline-none" required />
                    <p className="validator-hint !hidden sm:flex">Field Required</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Contact</legend>
                    <input type="text" value={data?.["contact"] || ""} placeholder="Contact" pattern="[0-9]{10}" name="contact" minLength={3} title="Contact" onChange={handleChange} className="input input-sm sm:input-md w-full validator focus-within:outline-none" required />
                    <p className="validator-hint !hidden sm:flex">Enter 10 Digit Contact</p>
                </fieldset>

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
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Latitude</legend>
                                    <input 
                                        type="number" 
                                        step="any"
                                        value={data?.["latitude"] || ""} 
                                        placeholder="Latitude" 
                                        name="latitude" 
                                        onChange={handleChange} 
                                        className="input input-sm sm:input-md w-full focus-within:outline-none" 
                                    />
                                </fieldset>
                                
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Longitude</legend>
                                    <input 
                                        type="number" 
                                        step="any"
                                        value={data?.["longitude"] || ""} 
                                        placeholder="Longitude" 
                                        name="longitude" 
                                        onChange={handleChange} 
                                        className="input input-sm sm:input-md w-full focus-within:outline-none" 
                                    />
                                </fieldset>
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

            </div>
        </div>
    );

};

export default LocationForm;