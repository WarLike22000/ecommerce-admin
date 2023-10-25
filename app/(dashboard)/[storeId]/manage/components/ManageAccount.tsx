"use client"

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import axios from "axios";

import { User } from "@prisma/client";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ManageAccountProps {
    currentUser: User | null;
}

const ManageAccount: React.FC<ManageAccountProps> = ({
    currentUser
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        },
        watch,
        setError
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email,
            password: currentUser?.hashedPassword
        }
    });

    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const name = watch("name");
    const email = watch("email");
    const password = watch("password");
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if(name.length < 2) {
            setError("name", {
                type: "validate",
                message: "The name is short."
            })

            return null;
        }
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            setError("email", {
                type: "validate",
                message: "Please enter a valid email."
            })

            return null;
        }
        if(password.length < 4 || password.length > 20) {
            setError("password", {
                type: "validate",
                message: "Your password must be greater than 4 and less than 20."
            })

            return null;
        }
        
        setIsLoading(true);
        
        axios.patch(`/api/${params.storeId}/manage`, data)
        .then(() => {
            toast.success("Information Saved.");
            router.push(`/${params.storeId}`);
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong.");
        })
        .finally(() => setIsLoading(false))
    };
    
    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex items-center gap-5 flex-wrap">
                <Input label="Name" id="name" register={register} errors={errors} disabled={isLoading} placeholder={`${name}`} />
                <Input label="Email" id="email" register={register} errors={errors} disabled={isLoading} placeholder={`${email}`} />
                <Input label="Password" id="password" register={register} errors={errors} type="password" disabled={isLoading} placeholder="new password" />
            </div>
            <Button
                black
                type="submit"
                className="w-fit"
                disabled={isLoading}
            >
                Save changes
            </Button>
        </form>
     );
}
 
export default ManageAccount;