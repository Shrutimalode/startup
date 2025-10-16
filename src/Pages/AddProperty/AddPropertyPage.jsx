import React, { useState } from "react";
import LocationForm from "./Steps/LocationForm";
import BasicDetails from "./Steps/BasicDetails";
import ImageForm from "./Steps/ImageForm";
import AdditionalDetails from "./Steps/AddtionalDetails";
import { getUser } from "../../Utils/AuthData";
import toast from "react-hot-toast";
import { addProperty } from "../../actions/AddProperty/AddProperty";
import { mutate } from "swr";

const AddPropertyPage = ({ref}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => currentStep > 1 ? setCurrentStep(currentStep - 1) : null;


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
const handleSubmit = (e) => {
    const user = getUser()
    if (!user) {
        toast.error("Please Login Again to Continue")
        return;
    }
    e.preventDefault();
    
    if ((currentStep === 4) || (currentStep === 3 && (formData?.["project_type"] !== "flat" && formData?.["project_type"] !== "house"))) {
        let finalData = {
            project_name: formData?.["project_name"] || "",
            project_type: formData?.["project_type"] || "",
            project_status: formData?.["project_status"] || "",
            project_category: formData?.["project_category"] || "",
            price_unit: formData?.["price_unit"] || "",
            country: formData?.["country"] || "",
            city: formData?.["city"] || "",
            address: formData?.["address"] || "", // Don't concatenate, send as single string
            latitude: Number(formData?.["latitude"]) || 0,
            longitude: Number(formData?.["longitude"]) || 0,
            description: formData?.["description"] || "",
            assigned_agent: formData?.["assigned_agent"] || "",
            aminities: formData?.["aminities"] || "", // Note: typo in API - "aminities" not "amenities"
            price: Number(formData?.["price"]) || 0,
            contact: formData?.["contact"] || "",
            owner_name: formData?.["owner_name"] || user?.name || "", // Add owner_name
            image_url_1: formData?.["image_url_1"] || "",
            image_url_2: formData?.["image_url_2"] || "",
            image_url_3: formData?.["image_url_3"] || "",
            total_building_area: Number(formData?.["total_building_area"]) || 0,
            sealable_area: Number(formData?.["sealable_area"]) || 0,
            north_side_area: Number(formData?.["north_side_area"]) || 0,
            south_side_area: Number(formData?.["south_side_area"]) || 0,
            east_side_area: Number(formData?.["east_side_area"]) || 0,
            west_side_area: Number(formData?.["west_side_area"]) || 0,
            verified: false // Default to false as per API
        }

        // Remove user_id since it's not in the API schema
        // Add any additional fields that might be in your form but not in finalData

        console.log("Final data being sent:", finalData);

        toast.promise(addProperty(finalData), {
            loading: "Adding Property",
            success: (data) => {
                console.log("Success response:", data);
                if (data.status === 200 || data.status === 201) {
                    setFormData({});
                    setCurrentStep(1);
                    ref?.current?.close();
                    mutate('properties')
                    return "Property Added Successfully";
                }
                toast.error("Failed to Add Property");
            },
            error: (error) => {
                console.log("Error details:", error);
                console.log("Error response:", error.response);
                return "Failed to Add Property";
            }
        })
    }
    else {
        nextStep();
    }
}

    return (
        <form onSubmit={handleSubmit} className="flex flex-col overflow-auto gap-4 justify-center items-center">
            <ul className="steps h-[10dvh]">
                <li className={`step text-xs sm:text-md sm:w-[5rem] md:w-[10rem] ${currentStep > 0 ? 'step-primary' : ''}`}>Basic Details</li>
                <li className={`step text-xs sm:text-md sm:w-[5rem] md:w-[10rem] ${currentStep > 1 ? 'step-primary' : ''}`}>Location</li>
                <li className={`step text-xs sm:text-md sm:w-[5rem] md:w-[10rem] ${currentStep > 2 ? 'step-primary' : ''}`}>Image</li>
                {(formData?.["project_type"] === "flat" || formData?.["project_type"] === "house") && <li className={`step text-xs sm:text-md sm:w-[5rem] md:w-[10rem] ${currentStep > 3 ? 'step-primary' : ''}`}>Additional Details</li>}
            </ul>
            <div className="w-full max-h-[70dvh] h-[70dvh] overflow-auto grow flex flex-col justify-center items-center">
                {currentStep === 1 && <BasicDetails data={formData} handleInputChange={handleInputChange} />}
                {currentStep === 2 && <LocationForm data={formData} handleInputChange={handleInputChange} />}
                {currentStep === 3 && <ImageForm data={formData} handleInputChange={handleInputChange} />}
                {currentStep === 4 && <AdditionalDetails data={formData} handleInputChange={handleInputChange} />}
            </div>
            <div className="buttons h-[8dvh] justify-center flex gap-6 items-end flex-wrap">
                <button type="button" disabled={currentStep === 1}
                    className="btn btn-ghost btn-soft min-w-fit w-36"
                    onClick={prevStep}
                >
                    Previous
                </button>
                <button type="submit"
                    className="btn btn-primary btn-soft min-w-fit w-36"
                >
                    {(currentStep === 4) || (currentStep === 3 && (formData?.["project_type"] !== "flat" && formData?.["project_type"] !== "house")) ? "Add Property" : "Next"}
                </button>
            </div>
        </form>
    );
};

export default AddPropertyPage;