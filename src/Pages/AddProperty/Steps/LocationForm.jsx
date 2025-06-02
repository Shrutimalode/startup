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

            </div>
        </div>
    );

};

export default LocationForm;