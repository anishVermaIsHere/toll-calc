"use client";
import { mapAPI } from "@/services/api/map";
import useMapStore from "@/store/useMapStore";
import { useEffect } from "react";
import InputCombobox from "./inputcombobox";
import { useFormContext } from "react-hook-form";
import Icon from "@/ui/icon";

const TollForm = () => {
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useFormContext();

  const locations = watch('location');

  console.log('location', locations);

  const onSubmit = (data) => console.log(data);

  const swapLocations = (e) => {
    e.preventDefault();
    const formLocations = getValues('location').reverse();
    setValue(`location`, formLocations);
  }

  const addDestination = (e) => {
    e.preventDefault();
    const formLocations = getValues('location');
    setValue('location', [...formLocations, '']);
  }

  useEffect(()=>{
    locations?.map((location, index)=>{
      setValue(`location[${index}]`, location);
    });

  }, [locations])

  
  return (
    <div className="border-b border-gray-900/10 pb-12 px-10">
      <h2 className="text-base font-semibold leading-7 text-gray-900 mt-4">
        Calculate your toll
      </h2>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
                <div className="w-full">
                {/* <label htmlFor="origin" className="block text-sm font-medium leading-6 text-indigo-500">
                    Origin
                </label> */}
                {locations?.map(
                  (location, index)=>(
                    <>
                    <div key={location} className="mt-2">
                        <InputCombobox key={index} id={index} />
                    </div> 
                  </>
                ))}
                </div>
                <div className="flex items-center justify-center gap-4 my-2">
                    <button className="bg-indigo-500 border rounded w-full p-1 grid place-items-center" onClick={addDestination}>
                      <Icon.plus />
                    </button>
                    <button className="bg-indigo-500 border rounded w-full p-1 grid place-items-center" onClick={swapLocations}>
                       <Icon.updown />
                    </button>
                </div>
                <div className="w-full">
                <label
                    htmlFor="destination"
                    className="block text-sm font-medium leading-6 text-indigo-500"
                >
                    Destination
                </label>
                <div className="mt-2">
                    <input
                    id="destination"
                    type="text"
                    placeholder="Enter destination location or long press on map"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                    {...register('destination')}
                    
                    />
                </div>
                </div>
          </div>
        
          <div className="mt-4">
            <label
              htmlFor="vehicleType"
              className="block text-sm font-medium leading-6 text-indigo-500"
            >
              Select vehicle type
            </label>
            <div className="mt-2">
              <select
                id="vehicleType"
                className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:max-w-xs sm:text-sm sm:leading-6"
                {...register('vehicleType')}
              >
                <option className="p-3">United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium leading-6 text-indigo-500"
            >
              Time
            </label>
            <div className="mt-2">
              <input
                id="dateTime"
                type="datetime-local"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                {...register('dateTime')}
              
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="px-5 py-2 text-white bg-indigo-500 rounded my-4 w-full">Submit</button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TollForm;
