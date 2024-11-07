import { useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { mapAPI } from '@/services/api/map';
import useMapStore from '@/store/useMapStore';
import { useFormContext, useController } from 'react-hook-form';
import Icon from '@/ui/icon';

const InputCombobox = ({ id }) => {
  const { markers, setMarkers } = useMapStore(state=>state);
  const [query, setQuery] = useState('');
  const [ locations, setLocations ] = useState([]);
  const [selected, setSelected] = useState('');
  const { register, watch, setValue, getValues, control } = useFormContext();
  const { field } = useController({ control, name });
  const selectedLocation = watch('location');

  const handleSearch = async (event) => {
    const locations = await mapAPI.searchLocation(event.target.value);
    setLocations(locations);
  };

  const handleSelect = (location) => {
    setSelected(location);
    setValue(`location[${id}]`, location);
    // setValue('location', [...selectedLocation, location]);
  };

  const deleteField = () => {
    const fields = getValues('location');
    setValue('location', fields.filter((_,i)=>i !== id));
    // setMarkers(markers.filter(m=>m.location !== ))
  }

  console.log(selectedLocation);
  console.log('selectged', selected)

  return (
    <Combobox value={selected} onChange={(loc)=>handleSelect(loc)}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'relative w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"'
            )}
            id={id}
            displayValue={(loc) => loc}
            placeholder="Enter destination location or press on map"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearch}
            {...register(`location[${id}]`)}
          />
          { id > 1 && <ComboboxButton onClick={deleteField} className="group absolute inset-y-0 right-0 my-2 mx-1 rounded-full">
            <TrashIcon className="size-6 text-indigo-500" />
          </ComboboxButton> }
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-gray/5 bg-white p-1',
            'transition duration-100 ease-in'
          )}
        >
          {locations?.map(({ properties}, ind) => (
            <ComboboxOption
              key={ind}
              value={properties?.name}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100"
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <div className="text-sm/6">{properties?.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
  )
};

export default InputCombobox;