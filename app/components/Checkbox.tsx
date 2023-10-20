"use client"

import { Switch } from "@headlessui/react";
import { useState } from "react";

interface CheckboxProps {
    label: string;
    description: string;
    onChange: (value: boolean) => void;
    state: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    description,
    onChange,
    state
}) => {

    const [enabled, setEnabled] = useState(state);
    
    return ( 
        <Switch
            checked={enabled}
            onChange={setEnabled}
        >
            <div onClick={() => onChange(!enabled)} className="flex flex-row w-full max-w-[320px] items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer">
                <div className={`w-4 h-4 px-2 rounded-md ${enabled ? "bg-gray-800" : "bg-white"} border border-gray-400`} />
                <div className="space-y-1 text-left font-sans">
                    <div className="text-base text-gray-800">
                        {label}
                    </div>
                    <div className="text-sm text-gray-500">
                        {description}
                    </div>                    
                </div>
            </div>
        </Switch>
     );
}
 
export default Checkbox;