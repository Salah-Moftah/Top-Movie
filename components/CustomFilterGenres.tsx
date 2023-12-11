"use client";

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaCheck } from "react-icons/fa6";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { CustomFilterGenresProps, IOptionProps } from '@/types/types';

function CustomFilterGenres({ options, handleFilter, styles } : CustomFilterGenresProps) {
  
  const [selected, setSelected] = useState(options[0])

  return (
    <div className={`${styles} sm:w-44 w-full`}>
      <Listbox value={selected} onChange={(e) => {
        setSelected(e);
        handleFilter(e)
      }}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate">{selected.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}


export default CustomFilterGenres