"use client"

import axios from "axios";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import toast from "react-hot-toast";

import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import AlertModal from "@/app/components/modals/AlertModal";
import ApiAlert from "@/app/components/ApiAlert";
import { useOrigin } from "@/app/hooks/useOrigin";

interface SettingsFormProps {
    initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        setError,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: initialData.name
        }
    })

    const name = watch("name")

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        if(name.length <= 1) {
            setError("name", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        
        setIsLoading(true);

        axios.patch(`/api/stores/${params.storeId}`, data)
            .then(() => {
                router.refresh();
                toast.success("Store updated.")
            })
            .catch((error) => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
    };
    
    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/stores/${params.storeId}`)
            .then(() => {
                router.refresh();
                router.push("/");
                toast.success("Store deleted.")
            })
            .catch(() => toast.error("Make sure you removed all products and categories first"))
            .finally(() => {
                setIsLoading(false);
                setIsOpen(false);
            })
    }
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={isLoading}
                    red
                    onClick={() => setIsOpen(true)}
                    type="button"
                >
                    <BiTrashAlt size={20} />
                </Button>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        register={register}
                        errors={errors}
                        placeholder={initialData.name}
                        required
                        label="Name"
                        id="name"
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
                    Save changes
                </Button>
            </form>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
                loading={isLoading}
            />
            <hr />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>
     );
}
 
export default SettingsForm;