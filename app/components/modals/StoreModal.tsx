"use client"

import axios from "axios";
import Modal from "../Modal";
import toast from "react-hot-toast";
import Input from "../Input";
import Button from "../Button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useStoreModal } from "@/app/hooks/useStoreModal";
import { useState } from "react";

const StoreModal = () => {

    const storeModal = useStoreModal();
    const [isLoading, setIsLoading] = useState(false);

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
            name: ""
        }
    });

    const name = watch("name");
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        if(name.length <= 1) {
            setError("name", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        
        setIsLoading(true);

        axios.post("/api/stores", data)
        .then((res) => {
            window.location.assign(`/${res.data.id}`)
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false))
    };
    
    return ( 
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <form
                className="mt-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        label="Name"
                        id="name"
                        required
                        placeholder="E-commerce"
                    />
                </div>
                <div className="flex items-center justify-end w-full mt-5 gap-2">
                    <Button
                        onClick={storeModal.onClose}
                        outline
                        type="button"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        black
                        disabled={isLoading}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Modal>
     );
}
 
export default StoreModal;