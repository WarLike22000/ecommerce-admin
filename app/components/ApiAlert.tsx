"use client"

import clsx from "clsx";
import Button from "./Button";

import { GoServer } from "react-icons/go"
import { BiCopy } from "react-icons/bi";
import toast from "react-hot-toast";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin"
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], "secondary" | "destructive"> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {

    const classBadge = clsx(
        
        variantMap[variant] == "secondary" && "text-gray-900 bg-gray-200",
        variantMap[variant] == "destructive" && "text-white bg-red-500"
    )

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to the clipboard.")
    }
    
    return ( 
        <div className="border-[1px] rounded-lg border-gray-200 w-full p-4">
            
            <div className="flex items-center gap-x-3">
                <GoServer className="inline" size={20} />

                <div className="flex items-center gap-x-2">
                    <h3 className="text-base font-semibold text-gray-900">
                        {title}
                    </h3>
                    <p className={`px-2 rounded-lg font-semibold text-[11px] ${classBadge}`}>
                        {textMap[variant]}
                    </p>
                </div>
            </div>

            <div className="mt-4 ml-5 gap-3 flex flex-col lg:flex-row items-start lg:items-center  justify-between">
                <code className="rounded break-all bg-gray-200 px-2 font-mono text-sm sm:text-base font-semibold">
                    {description}
                </code>

                <Button
                    outline
                    type="button"
                    onClick={onCopy}
                >
                    <BiCopy size={15} />
                </Button>
            </div>

        </div>
     );
}
 
export default ApiAlert;