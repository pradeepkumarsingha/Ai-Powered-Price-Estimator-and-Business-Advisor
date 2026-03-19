import { supportedLocations, furnishingOptions, parkingOptions } from "../../constants/propertyOptions";

const PredictionForm = ({ formData, onChange, onSubmit, isLoading }) => {
  return (
    <form className="panel p-6 md:p-8" onSubmit={onSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label" htmlFor="area_sqft">
            Area: {formData.area_sqft} sqft
          </label>
          <input
            id="area_sqft"
            type="range"
            min="400"
            max="6000"
            step="50"
            value={formData.area_sqft}
            onChange={onChange}
            name="area_sqft"
            className="w-full accent-sky-500"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>400 sqft</span>
            <span>6000 sqft</span>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="bhk">
            BHK
          </label>
          <select id="bhk" name="bhk" value={formData.bhk} onChange={onChange} className="input">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <option key={item} value={item}>
                {item} BHK
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="bathrooms">
            Bathrooms
          </label>
          <select id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={onChange} className="input">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <option key={item} value={item}>
                {item} Bathrooms
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="parking">
            Parking
          </label>
          <select id="parking" name="parking" value={formData.parking} onChange={onChange} className="input">
            {parkingOptions.map((item) => (
              <option key={item} value={item}>
                {item} Parking
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="location">
            Location
          </label>
          <select id="location" name="location" value={formData.location} onChange={onChange} className="input">
            {supportedLocations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="label" htmlFor="furnishing">
            Furnishing
          </label>
          <select id="furnishing" name="furnishing" value={formData.furnishing} onChange={onChange} className="input">
            {furnishingOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Estimating..." : "Generate Prediction"}
      </button>
    </form>
  );
};

export default PredictionForm;
