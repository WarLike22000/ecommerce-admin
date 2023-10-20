"use client"

import axios from "axios";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import toast from "react-hot-toast";

import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import AlertModal from "@/app/components/modals/AlertModal";

interface ColorFormProps {
    initialData: Color | null | undefined;
}

const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit a color" : "Add a new color";
    const toastMessage = initialData ? "Color updated." : "Color created.";
    const action = initialData ? "Save changes" : "Create";
    
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        setError,
        watch,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            name: initialData?.name,
            value: initialData?.value
        }
    });

    const name = watch("name")
    const value = watch("value")
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        if(name.length <= 1) {
            setError("name", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }

        if(value.length < 4) {
            setError("value", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }

        if(!/^#/.test(value)) {
            setError("value", {
                type: "pattern",
                message: "String must be a valid hex code"
            })

            return null;
        }
        
        setIsLoading(true);

            try {
                if(initialData) {
                    await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
                } else {
                    await axios.post(`/api/${params.storeId}/colors`, data)
                }
                
                router.refresh();
                router.push(`/${params.storeId}/colors`);
                toast.success(toastMessage)
            } catch(error) {
                toast.error("Something went wrong!")
            } finally {
                setIsLoading(false)
            }
    };
    
    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            .then(() => {
                router.refresh();
                router.push(`/${params.storeId}/colors`);
                toast.success("Color deleted.")
            })
            .catch(() => toast.error("Make sure you removed all products using this color first"))
            .finally(() => {
                setIsLoading(false);
                setIsOpen(false);
            })
    }
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={isLoading}
                        red
                        onClick={() => setIsOpen(true)}
                        type="button"
                    >
                        <BiTrashAlt size={20} />
                    </Button>
                )}
            </div>
            <hr />
            <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex w-full items-center gap-x-12 gap-y-8 flex-wrap">
                        <Input
                            register={register}
                            errors={errors}
                            placeholder="Color name"
                            required
                            label="Name"
                            id="name"
                            className="max-w-sm"
                            disabled={isLoading}
                        />
                        <div className="flex items-center gap-x-4">
                        <Input
                            register={register}
                            errors={errors}
                            placeholder="Color value"
                            required
                            label="Value"
                            id="value"
                            className="max-w-sm"
                            disabled={isLoading}
                        />
                        <div
                            className="border rounded-full p-4 mb-4"
                            style={{ backgroundColor: value }}
                        />
                        </div>
                    </div>
                
                <Button
                    black
                    disabled={isLoading}
                    type="submit"
                    className="mt-4 ml-auto"
                >
                    {action}
                </Button>
            </form>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
                loading={isLoading}
            />
        </>
     );
}
 
export default ColorForm;