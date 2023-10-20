"use client"

import { useUserModal } from "@/app/hooks/useUserModal";
import { User } from "@prisma/client";
import { PiSignOutFill } from 'react-icons/pi'
import { MdOutlineManageAccounts } from "react-icons/md";

import Modal from "../Modal";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface UserButtonModal {
    currentUser?: User
}

const UserButton: React.FC<UserButtonModal> = ({
    currentUser
}) => {

    const userModal = useUserModal();
    
    return ( 
        <Modal
            isOpen={userModal.isOpen}
            onClose={userModal.onClose}
        >
            <div className="w-full space-y-6">
                <div className="flex items-center justify-start gap-3 w-full">
                    <Image 
                        src={currentUser?.image || "/images/placeholder.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full ring-1 ring-gray-400"
                        alt="userImage"
                    />
                    <div>
                        <h3 className="text-gray-800 text-base">
                            {currentUser?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {currentUser?.email}
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex gap-4 items-center text-gray-600 text-sm hover:bg-gray-200 transition rounded-md p-3 cursor-pointer">
                        <MdOutlineManageAccounts size={20} />
                        <p>
                            Manage account
                        </p>
                    </div>
                    <div 
                        onClick={() => signOut()}
                        className="flex gap-4 items-center text-gray-600 text-sm hover:bg-gray-200 transition rounded-md p-3 cursor-pointer"
                    >
                        <PiSignOutFill size={20} />
                        <p>
                            Sign out
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
     );
}
 
export default UserButton;