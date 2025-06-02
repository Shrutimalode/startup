const AdditionalDetails = ({ data = {}, handleInputChange }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value === "0") return;
        handleInputChange(name, value);
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4 ">
            <div className="px-4  h-full w-full flex  gap-6 flex-wrap justify-center items-center">
                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Living Room (Optional)</legend>
                    <input type="text" value={data?.["living_room"] || ""} onChange={handleChange} pattern="[0-9]+" className="input input-sm sm:input-md w-full validator focus-within:outline-none" placeholder="Living Room" name="living_room" title="Living Room" />
                    <p className="validator-hint !hidden sm:flex">Please Enter Valid Number</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Bedroom (Optional)</legend>
                    <input type="text" value={data?.["bedrooms"] || ""} onChange={handleChange} pattern="[0-9]+" className="input input-sm sm:input-md w-full validator focus-within:outline-none" placeholder="Bedroom" name="bedrooms" title="Bedroom" />
                    <p className="validator-hint !hidden sm:block">Please Enter Valid Number</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Kitchen (Optional)</legend>
                    <input type="text" value={data?.["kitchen"] || ""} onChange={handleChange} pattern="[0-9]+" className="input input-sm sm:input-md w-full validator focus-within:outline-none" placeholder="Kitchen" name="kitchen" title="Kitchen" />
                    <p className="validator-hint !hidden sm:block">Please Enter Valid Number</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Bathrooms (Optional)</legend>
                    <input type="text" value={data?.["bathrooms"] || ""} onChange={handleChange} pattern="[0-9]+" className="input input-sm sm:input-md w-full validator focus-within:outline-none" placeholder="Bathrooms" name="bathrooms" title="Bathrooms" />
                    <p className="validator-hint !hidden sm:block">Please Enter Valid Number</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Car Parking (Optional)</legend>
                    <select name="car_parking" value={data?.["car_parking"] || ""} onChange={handleChange} id="car_parking" className="select select-sm sm:select-md w-full validator focus-within:outline-none" >
                        <option value="" disabled>Select Parking</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                    <p className="validator-hint !hidden">Please Enter Valid Number</p>
                    </fieldset>

                <div className="basis-2/5 grow"></div>
            </div>
        </div>
    );
};

export default AdditionalDetails;