"use client"

import axios from "axios";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import toast from "react-hot-toast";

import { Category, Color, Product, Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiTrashAlt } from "react-icons/bi";
import AlertModal from "@/app/components/modals/AlertModal";
import ImageUpload from "@/app/components/ImageUpload";
import Select from "@/app/components/Select";
import Checkbox from "@/app/components/Checkbox";

interface ProductFormProps {
    initialData: Product | null | undefined;
    categories: Category[];
    colors: Color[];
    sizes: Size[];
}
const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
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
            image: initialData?.image || [],
            price: initialData?.price || 0,
            categoryId: initialData?.categoryId || "",
            colorId: initialData?.colorId || "",
            sizeId: initialData?.sizeId || "",
            isFeatured: initialData?.isFeatured || false,
            isArchived: initialData?.isArchived || false
        }
    })

    const name = watch("name");
    const image = watch("image");
    const price = watch("price");
    const isFeatured = watch("isFeatured");
    const isArchived = watch("isArchived");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        if(name.length <= 1) {
            setError("name", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        if(image.length == 0) {
            setError("image", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        if(price.length <= 0) {
            setError("price", {
                type: "minLength",
                message: "String must contain at least 1 character(s)"
            })

            return null
        }
        
        setIsLoading(true);

            try {
                if(initialData) {
                    await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
                } else {
                    await axios.post(`/api/${params.storeId}/products`, data)
                }
                
                router.refresh();
                router.push(`/${params.storeId}/products`);
                toast.success(toastMessage)
            } catch(error) {
                toast.error("Something went wrong!")
            } finally {
                setIsLoading(false)
            }
    };
    
    const onDelete = async () => {
        setIsLoading(true);

        axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            .then(() => {
                router.refresh();
                router.push(`/${params.storeId}/products`);
                toast.success("Product deleted.")
            })
            .catch(() => toast.error("something went wrong!"))
            .finally(() => {
                setIsLoading(false);
                setIsOpen(false);
            })
    }
    
    const filteredImage = (url: string) => {
        const filtered = image.filter((image: string) => image != url);
        return filtered;
    };
    
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
                    value={image ? image.map((item: string) => item) : []}
                    onChange={(url) => setValue("image", [...image, url])}
                    onRemove={(url) => setValue("image", filteredImage(url))}
                    disabled={isLoading}
                />
                        
                <div className="flex w-full items-center gap-x-12 gap-y-8 flex-wrap">
                    <Input
                        register={register}
                        errors={errors}
                        placeholder="Product name"
                        required
                        label="Name"
                        id="name"
                        className="max-w-sm"
                        disabled={isLoading}
                    />
                    <Input
                        register={register}
                        errors={errors}
                        placeholder="9.99"
                        required
                        label="Price"
                        id="price"
                        type="number"
                        className="max-w-sm"
                        disabled={isLoading}
                    />
                    <Select
                        label="Category"
                        options={categories}
                        disabled={isLoading}
                        onChange={(value) => setValue("categoryId", value)}
                    />
                    <Select
                        label="Size"
                        options={sizes}
                        disabled={isLoading}
                        onChange={(value) => setValue("sizeId", value)}
                    />
                    <Select
                        label="Color"
                        options={colors}
                        disabled={isLoading}
                        onChange={(value) => setValue("colorId", value)}
                    />
                    <Checkbox
                        label="Featured"
                        description="this product will appear on the home page."
                        onChange={(value) => setValue("isFeatured", value)}
                        state={isFeatured}
                    />
                    <Checkbox
                        label="Archived"
                        description="this product will not appear anywhere in the store."
                        onChange={(value) => setValue("isArchived", value)}
                        state={isArchived}
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
 
export default ProductForm;