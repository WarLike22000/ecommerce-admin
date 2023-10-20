"use client"

import Image from "next/image";
import Button from "./Button";

import { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }
    
    if(!isMounted) {
        return null;
    }
    
    return ( 
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                onClick={() => onRemove(url)}
                                red
                                type="button"
                                disabled={disabled}
                            >
                                <BiTrashAlt size={20} />
                            </Button>
                        </div>
                        <Image
                            fill
                            alt="Image"
                            className="object-cover"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="w9aez3yw">
                {({open}) => {

                    const onClick = () => {
                        open();
                    }
                    
                    return (
                        <Button
                            disabled={disabled}
                            type="button"
                            outline
                            onClick={onClick}
                            className="flex items-center gap-1"
                        >
                            <LuImagePlus size={20} />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
            
        </div>
     );
}
 
export default ImageUpload;