"use client"

import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

import { AiOutlinePlus } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./BillboardColumn";
import { DataTable } from "@/app/components/DataTable";
import ApiList from "@/app/components/ApiList";

interface CategoryClientProps {
    data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button
                    black
                    type="button"
                    className="flex gap-1 items-center"
                    onClick={() => router.push(`/${params.storeId}/categories/new`)}
                >
                    <AiOutlinePlus size={15} />
                    Add new
                </Button>
            </div>
            <hr />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for categories" />
            <hr />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
     );
}
 
export default CategoryClient;