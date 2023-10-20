"use client"

import axios from "axios";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import toast from "react-hot-toast";

import { Billboard, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import AlertModal from "@/app/components/modals/AlertModal";
import Select from "@/app/components/Select";

interface CategoryFormProps {
    initialData: Category | null | undefined;
    billboards: Billboard[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
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
            billboardId: initialData?.billboardId
        }
    })

    const name = watch("name");
    const billboardId = watch("billboardId");
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        if(name.length <= 1) {
            setError("name", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }

        if(billboardId.length <= 1) {
            setError("billboardId", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        
        setIsLoading(true);

            try {
                if(initialData) {
                    await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
                } else {
                    await axios.post(`/api/${params.storeId}/categories`, data)
                }
                
                router.refresh();
                router.push(`/${params.storeId}/categories`);
                toast.success(toastMessage)
            } catch(error) {
                toast.error("Something went wrong!")
            } finally {
                setIsLoading(false)
            }
    };
    
    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            .then(() => {
                router.refresh();
                router.push(`/${params.storeId}/categories`);
                toast.success("Category deleted.")
            })
            .catch(() => toast.error("Make sure you removed all products using this category first"))
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

                <div className="w-full flex flex-wrap items-center gap-x-12 gap-y-8">
                <Input
                    register={register}
                    errors={errors}
                    placeholder="Category name"
                    required
                    label="Name"
                    id="name"
                    className="max-w-sm"
                    disabled={isLoading}
                />

                <Select
                    options={billboards}
                    label="Billboard"
                    onChange={(value: string) =>setValue("billboardId", value) }
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
 
export default CategoryForm;