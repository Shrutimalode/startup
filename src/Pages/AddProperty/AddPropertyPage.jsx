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
                price: formData?.["price"] || "",
                country: formData?.["country"] || "",
                city: formData?.["city"] || "",
                address: `${formData?.["address"] || ""}, ${formData?.["city"] || ""}, ${formData?.["district"] || ""}, ${formData?.["state"] || ""}`,
                user_id: user?.id,
                contact: formData?.["contact"] || "",
            }

            if (formData?.["image_url_1"]) {
                finalData.image_url_1 = formData?.["image_url_1"]
            }
            if (formData?.["living_room"]) {
                finalData.living_room = formData?.["living_room"]
            }
            if (formData?.["bedrooms"]) {
                finalData.bedrooms = formData?.["bedrooms"]
            }
            if (formData?.["kitchen"]) {
                finalData.kitchen = formData?.["kitchen"]
            }
            if (formData?.["bathrooms"]) {
                finalData.bathrooms = formData?.["bathrooms"]
            }
            if (formData?.["car_parking"]) {
                finalData.car_parking = formData?.["car_parking"]
            }

            toast.promise(addProperty(finalData), {
                loading: "Adding Property",
                success: (data) => {
                    if (data.status === 200) {
                        setFormData({});
                        setCurrentStep(1);
                        ref?.current?.close();
                        mutate('properties')
                        return "Property Added Successfully";
                    }
                    toast.error("Failed to Add Property");
                },
                error: (error) => {
                    console.log(error)
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