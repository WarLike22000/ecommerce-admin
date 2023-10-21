"use client"

import { useEffect, useState } from "react";

interface CardProps {
    title: string;
    value: string;
    icon: React.ReactElement;
}

const Card: React.FC<CardProps> = ({
    title,
    value,
    icon
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if(!isMounted) {
        return null
    }
    
    return ( 
        <div className="w-full max-w-[250px] border rounded-md p-3">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">
                    {title}
                </p>
                {icon}
            </div>

            <div>
                <div className="text-2xl font-bold">
                    {value}
                </div>
            </div>
        </div>
     );
}
 
export default Card;