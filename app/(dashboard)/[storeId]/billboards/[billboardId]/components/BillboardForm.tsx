"use client"

import axios from "axios";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import toast from "react-hot-toast";

import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import AlertModal from "@/app/components/modals/AlertModal";
import ImageUpload from "@/app/components/ImageUpload";

interface BillboardFormProps {
    initialData: Billboard | null | undefined;
}

const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
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
            label: initialData?.label,
            imageUrl: initialData?.imageUrl
        }
    })

    const label = watch("label")
    const imageUrl = watch("imageUrl")
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        if(label.length <= 1) {
            setError("label", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        
        setIsLoading(true);

            try {
                if(initialData) {
                    await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
                } else {
                    await axios.post(`/api/${params.storeId}/billboards`, data)
                }
                
                router.refresh();
                router.push(`/${params.storeId}/billboards`);
                toast.success(toastMessage)
            } catch(error) {
                toast.error("Something went wrong!")
            } finally {
                setIsLoading(false)
            }
    };
    
    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            .then(() => {
                router.refresh();
                router.push(`/${params.storeId}/billboards`);
                toast.success("Billboard deleted.")
            })
            .catch(() => toast.error("Make sure you removed all categories using this billboard first"))
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

                <ImageUpload
                    value={imageUrl ? [imageUrl] : []}
                    onChange={(url) => setValue("imageUrl", url)}
                    onRemove={() => setValue("imageUrl", "")}
                    disabled={isLoading}
                />
                        
                <Input
                    register={register}
                    errors={errors}
                    placeholder="Billboard label"
                    required
                    label="Label"
                    id="label"
                    className="max-w-sm"
                    disabled={isLoading}
                />
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
 
export default BillboardForm;