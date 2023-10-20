"use client"

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    return ( 
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" onClose={onClose} className="relative z-10">
                <Transition.Child
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm"
                    />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-75"
                        enterTo="opacity-100 scale-110"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100 scale-110"
                        leaveTo="opacity-0 scale-75"
                    >
                        <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                            <div 
                                onClick={onClose}
                                className="absolute top-4 right-4"
                            >
                                <button className="text-gray-600 hover:text-gray-700 transition cursor-pointer focus:ring-2 focus:ring-gray-600 rounded-lg">
                                    <span className="sr-only">Close</span>
                                    <IoClose size={25} />
                                </button>
                            </div>
                            
                            <Dialog.Title
                                as="h2"
                                className="text-lg text-center sm:text-left text-gray-900 font-semibold leading-6"
                            >
                                {title}
                            </Dialog.Title>
                            <Dialog.Description
                                as="p"
                                className="text-gray-500 text-sm text-center sm:text-left"
                            >
                                {description}
                            </Dialog.Description>
                            <div>
                                {children}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
     );
}
 
export default Modal;