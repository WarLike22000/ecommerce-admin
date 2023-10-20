"use client"

import axios from "axios";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import toast from "react-hot-toast";

import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import AlertModal from "@/app/components/modals/AlertModal";
import ImageUpload from "@/app/components/ImageUpload";

interface SizeFormProps {
    initialData: Size | null | undefined;
}

const SizeForm: React.FC<SizeFormProps> = ({
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size" : "Add a new size";
    const toastMessage = initialData ? "Size updated." : "Size created.";
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
    })

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

        if(value.length == 0) {
            setError("value", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        
        setIsLoading(true);

            try {
                if(initialData) {
                    await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
                } else {
                    await axios.post(`/api/${params.storeId}/sizes`, data)
                }
                
                router.refresh();
                router.push(`/${params.storeId}/sizes`);
                toast.success(toastMessage)
            } catch(error) {
                toast.error("Something went wrong!")
            } finally {
                setIsLoading(false)
            }
    };
    
    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            .then(() => {
                router.refresh();
                router.push(`/${params.storeId}/sizes`);
                toast.success("Size deleted.")
            })
            .catch(() => toast.error("Make sure you removed all products using this size first"))
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
                            placeholder="Size name"
                            required
                            label="Name"
                            id="name"
                            className="max-w-sm"
                            disabled={isLoading}
                        />
                        <Input
                            register={register}
                            errors={errors}
                            placeholder="Size value"
                            required
                            label="Value"
                            id="value"
                            className="max-w-sm"
                            disabled={isLoading}
                        />
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
 
export default SizeForm;