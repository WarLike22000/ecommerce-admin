"use client"

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from "next/navigation";

import axios from 'axios';
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { User } from "@prisma/client";

type TAuth = "LOGIN" | "REGISTER";

interface AuthFormProps {
    currentUser?: User;
}

const AuthForm: React.FC<AuthFormProps> = ({
    currentUser
}) => {

    const [variant, setVariant] = useState<TAuth>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const session = useSession();

    useEffect(() => {
        if(session.status === "authenticated" && currentUser?.email) {
            router.push("/")
        }
    }, [router, session.status, currentUser]);
    
    const changeVariant = useCallback(() => {
        reset()
        if(variant === "LOGIN") {
            setVariant("REGISTER")
        } else {
            setVariant("LOGIN")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors
        },
        reset,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const name = watch("name");
    const email = watch("email");
    const password = watch("password");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(variant === 'REGISTER') {
            if(name.length < 2) {
                setError("name", {
                    type: "validate",
                    message: "The name is short."
                })
    
                return null;
            }
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

        if(variant === "REGISTER") {
            axios.post("/api/register", data)
            .then(() => {
                signIn("credentials", data)
                toast.success("Create account!");
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
        };

        if(variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error("Invalid credentials")
                };

                if(callback?.ok && !callback?.error) {
                    toast.success("Logged in!")
                    router.push("/")
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    return ( 
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-center h-full"
        >
            <div className="bg-white shadow-lg sm:px-6 px-4 py-4 w-full sm:max-w-md space-y-5 rounded-lg mx-2 border-[1px]">
                <div className="w-full">
                    <h3 className='text-gray-900 font-bold text-xl'>
                        {variant === "LOGIN" ? "Sign in" : "Create your account"}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                        to continue to ecommerce-admin
                    </p>
                </div>

                <div className="w-full">
                    <div
                        onClick={() => signIn("google")}
                        className="w-full bg-white hover:bg-gray-100 transition border border-gray-200 rounded-md flex items-center p-3 cursor-pointer"
                    >
                        <FcGoogle size={30} />
                        <p className="text-base text-gray-700 ml-2">
                            Continue with Google
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <span className="bg-white px-2 text-gray-900">
                            or
                        </span>
                    </div>
                </div>

                <div className="w-full space-y-5">
                    {variant === "REGISTER" && (
                        <Input
                        label="Name"
                        id="name"
                        register={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                    />
                    )}
                    <Input
                        label="Email"
                        id="email"
                        register={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                        type="email"
                    />
                    <Input
                        label="Password"
                        id="password"
                        register={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                        type="password"
                    />
                </div>

                <div className="w-full">
                    <Button
                        disabled={isLoading}
                        blue
                        widthFull
                        type="submit"
                    >
                        Continue
                    </Button>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="text-gray-600 text-sm">
                        {
                            variant === "LOGIN" ?
                            <span>No account?</span> :
                            <span>Have an account?</span>
                        }
                    </div>
                    <div
                        onClick={changeVariant}
                        className="underline text-sm text-sky-600 cursor-pointer"
                    >
                        {
                            variant === "LOGIN" ?
                            <span>Sign up</span> :
                            <span>Sign in</span>
                        }
                    </div>
                </div>
            </div>
        </form>
     );
}
 
export default AuthForm;