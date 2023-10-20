"use client"

import { SizeColumn } from "./BillboardColumn";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import AlertModal from "@/app/components/modals/AlertModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
    data: SizeColumn;
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const params = useParams();
    
    const actionClass = "p-2flex items-center gap-x-3 cursor-pointer hover:bg-gray-100 transition rounded-lg text-gray-700 hover:text-gray-900 font-sans"
    
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Size Id copied to the clipboard.");
    }

    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            .then(() => {
                router.refresh();
                toast.success("Size deleted.");
            })
            .catch(() => toast.error("Make sure you removed all products using this size first"))
            .finally(() => {
                setIsLoading(false);
                setIsOpen(false);
            })
    }
    
    return ( 
        <>
            <AlertModal
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
                loading={isLoading}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer w-fit rounded-full p-1 hover:bg-slate-100 transition">
                        <span className="sr-only">Open menu</span>
                        <FiMoreHorizontal size={18} />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className={actionClass} onClick={() => onCopy(data.id)}>
                        <IoCopyOutline />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem className={actionClass} onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
                        <GrDocumentUpdate />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className={actionClass} onClick={() => setIsOpen(true)}>
                        <BiTrashAlt />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
     );
}
 
export default CellAction;