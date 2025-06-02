const BasicDetails = ({ data = {}, handleInputChange }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price") {
            if (value === "0") return;
            handleInputChange(name, value.trim());
            return;
        }


        handleInputChange(name, value);
        if (name === "project_type" && (value === "Plot" || value === "Farm")) {
            handleInputChange("project_status", "Sell");
            handleInputChange("project_category", "Commercial");
        }
        if (name === "project_type" && value !== "Farm") {
            if (data?.["price_unit"] === "acre") handleInputChange("price_unit", "");
        }
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4 ">
            <div className="px-4 h-full w-full flex flex-wrap gap-6 justify-center items-center">

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Property name</legend>
                    <input type="text" value={data?.["project_name"] || ""} onChange={handleChange} pattern=".*[a-zA-Z].*" className="input input-sm sm:input-md w-full validator focus-within:outline-none" required placeholder="Property Name" name="project_name" minLength={3} title="Property Name" />
                    <p className="validator-hint !hidden sm:block">Atleast 3 Characters Required</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend ">Property Type</legend>
                    <select name="project_type" value={data?.["project_type"] || ""} onChange={handleChange} id="project_type" className="select select-sm sm:select-md w-full validator focus-within:outline-none" required >
                        <option value="" disabled>Select Property Type</option>
                        <option value="plot">Plot</option>
                        <option value="flat">Flat</option>
                        <option value="farm">Farm</option>
                        <option value="house">House</option>
                    </select>
                    <p className="validator-hint !hidden sm:block">Select At Least One</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 min-w-fit grow">
                    <legend className="fieldset-legend">Property Status</legend>
                    <select disabled={(data?.["project_type"] === "Plot" || data?.["project_type"] === "Farm")} name="project_status" value={data?.["project_status"] || ""} onChange={handleChange} id="project_status" className="select select-sm sm:select-md w-full validator focus-within:outline-none" required >
                        <option value="" disabled>Select Property Status</option>
                        <option value="Rent">Rent</option>
                        <option value="Sell">Sell</option>
                    </select>
                    <p className="validator-hint !hidden sm:block">Select At Least One</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 grow min-w-fit">
                    <legend className="fieldset-legend">Property Category</legend>
                    <select disabled={data?.["project_type"] === "Farm"} name="project_category" value={data?.["project_category"] || ""} onChange={handleChange} id="project_category" className="select select-sm sm:select-md w-full validator focus-within:outline-none" required >
                        <option value="" disabled>Select Property Category</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                    <p className="validator-hint !hidden sm:block">Select At Least One</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5  grow min-w-fit">
                    <legend className="fieldset-legend">Price</legend>
                    <input type="text" value={data?.["price"] || ""} onChange={handleChange} pattern="[0-9]+" className="input input-sm sm:input-md w-full validator focus-within:outline-none" required placeholder="Price" name="price" title="Price" />
                    <p className="validator-hint !hidden sm:block">Please Enter Valid Price</p>
                </fieldset>

                <fieldset className="fieldset basis-2/5 grow min-w-fit">
                    <legend className="fieldset-legend">Price Unit</legend>
                    <select name="price_unit" value={data?.["price_unit"] || ""} onChange={handleChange} id="price_unit" className="select select-sm sm:select-md w-full validator focus-within:outline-none" required >
                        <option value="" disabled>Select Price Unit</option>
                        <option value="rs">Rupees</option>
                        <option value="rs/sqft">Rupees per Square Feet</option>
                        {data?.["project_type"] === "Farm" && <option value="acre">Acre</option>}
                        <option value="rs/sqmt">Rupees per Square Metre</option>
                    </select>
                    <p className="validator-hint !hidden sm:block">Select At Least One</p>
                </fieldset>
            </div>
        </div>
    );
};

export default BasicDetails;