import { useState } from "react";
import { supportedLocations, furnishingOptions, parkingOptions } from "../constants/propertyOptions";

const initialState = {
  area_sqft: 1450,
  bhk: 3,
  bathrooms: 2,
  parking: parkingOptions[1],
  location: supportedLocations[0],
  furnishing: furnishingOptions[1]
};

const usePredictionForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: ["area_sqft", "bhk", "bathrooms", "parking"].includes(name) ? Number(value) : value
    }));
  };

  return {
    formData,
    setFormData,
    handleChange
  };
};

export default usePredictionForm;
