"use client"

import { Store } from "@prisma/client";
import { useStoreModal } from "@/app/hooks/useStoreModal";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BiSolidStore } from 'react-icons/bi';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';
import { BsSearch, BsCheck } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface StoreSwitcherProps {
    items: Store[];
}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
    items
}) => {
    
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const filteredStore = 
    query === "" ? items :
    items.filter((store) => 
        store.name?.toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    )

    const currentStore = filteredStore.find((item) => item.id === params.storeId);
    
    return ( 
        <div>
            <Combobox>
                <div className="relative bg-white text-sm">
                    <Combobox.Button className="w-[200px] flex items-center justify-between border p-2 hover:bg-gray-200 transition cursor-pointer rounded-lg">
                        <BiSolidStore
                            className="mr-2"
                            size={20}
                        />
                        <p className="font-sans text-base">
                            {currentStore?.name}
                        </p>
                        <HiOutlineChevronUpDown
                            size={20}
                            className="ml-auto text-gray-500"
                        />
                    </Combobox.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-100 ease-out"
                    enterFrom="translate translate-y-4 opacity-0"
                    enterTo="translate translate-y-0 opacity-100"
                    leave="duration-100 ease-in"
                    leaveFrom="translate translate-y-0 opacity-100"
                    leaveTo="translate translate-y-4 opacity-0"
                >
                    <div className="absolute z-30 mt-2 p-1 bg-white shadow-md w-[200px] rounded-md border">
                        <div className="w-full flex items-center justify-center space-x-2">
                            <BsSearch size={15} className="text-gray-700" />
                            <Combobox.Input
                                className="w-full max-w-[150px] p-2 border-none focus:ring-0 outline-none text-sm placeholder:text-sm text-gray-900"
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search store..."
                            />
                        </div>

                        <Combobox.Options className="mt-2 w-full p-2">
                            {filteredStore.length === 0 && query != "" ? (
                                <div className="w-full flex items-center justify-center text-sm text-gray-500">
                                    No store found.
                                </div>
                            ) : filteredStore.map((store) => (
                                <Combobox.Option
                                    onClick={() => {
                                        router.push(`/${store.id}`)
                                    }}
                                    key={store.id}
                                    value={store}
                                    className="text-sm font-sans flex items-center justify-between cursor-pointer hover:bg-gray-100 transition p-2 rounded-md"
                                >
                                    <BiSolidStore
                                        className="mr-2"
                                        size={15}
                                    />
                                    {store.name}
                                    <BsCheck
                                        size={15}
                                        className={`
                                            ml-auto
                                            ${currentStore?.id == store.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }
                                        `}
                                    />
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>

                        <div
                            onClick={storeModal.onOpen}
                            className="bg-sky-100 p-2 rounded-md flex items-center text-base cursor-pointer hover:bg-sky-50 transition font-sans"
                        >
                            <AiOutlinePlusCircle
                                className="mr-2"
                            />
                            Create store
                        </div>
                    </div>
                </Transition>
            </Combobox>
        </div>
     );
}
 
export default StoreSwitcher;