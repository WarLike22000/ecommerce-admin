"use client"

import UserButton from "@/app/components/modals/UserButton";
import Image from "next/image";
import MainNav from "@/app/components/MainNav";

import { Store, User } from "@prisma/client";
import { useUserModal } from "@/app/hooks/useUserModal";
import StoreSwitcher from "@/app/components/StoreSwitcher";

interface NavbarProps {
    currentUser?: User;
    stores: Store[];
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
    stores
}) => {

    const userModal = useUserModal();
    
    return ( 
        <div className="border-b">
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher items={stores} />
                <MainNav />
                <div
                    className='ml-auto flex items-center space-x-4'
                >
                    <Image
                        src={currentUser?.image || "/images/placeholder.jpg"}
                        width={35}
                        height={35}
                        className="rounded-full ring-1 ring-gray-400 cursor-pointer hover:opacity-75"
                        alt="userImage"
                        onClick={userModal.onOpen}
                    />
                    <UserButton currentUser={currentUser} />
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;