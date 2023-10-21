"use client"

import { Listbox, Transition } from "@headlessui/react";
import { Billboard } from "@prisma/client";
import { Fragment, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

interface SelectProps {
    options: any[];
    label: string;
    onChange: (value: string) => void;
    disabled?: boolean
}

const Select: React.FC<SelectProps> = ({
    options,
    label,
    onChange,
    disabled
}) => {

    const [selected, setSelected] = useState(options[0]);
    
    return ( 
        <Listbox disabled={disabled} value={selected} onChange={setSelected}>
            <div className="w-full max-w-[240px] relative mb-10">
                <label className="font-sans mb-1">
                    {label}
                </label>
                <Listbox.Button className="relative rounded-md p-2 w-full flex items-center justify-between border-[1px] border-gray-400">
                    <p>{selected?.label || selected?.name}</p>
                    <BiChevronDown size={17} />
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                >
                    <Listbox.Options className="absolute mt-1 w-full bg-white border-[1px] p-2 shadow-md rounded-md">
                        {options.map((option) => (
                            <Listbox.Option
                                value={option}
                                key={option.id}
                                className="w-full"
                                onClick={() => onChange(option.id)}
                            >
                                {({selected}) => (
                                    <div className={`flex w-full items-center justify-between hover:bg-slate-100 transition cursor-pointer rounded-md ${selected && "bg-slate-200"} p-2 my-1`}>
                                        <div>
                                            {option.label || option.name}
                                        </div>
                                        {selected && (
                                            <BsCheck />
                                        )}
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
     );
}
 
export default Select;