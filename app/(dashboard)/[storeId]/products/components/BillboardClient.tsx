"use client"

import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

import { AiOutlinePlus } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./BillboardColumn";
import { DataTable } from "@/app/components/DataTable";
import ApiList from "@/app/components/ApiList";

interface ProductClientProps {
    data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button
                    black
                    type="button"
                    className="flex gap-1 items-center"
                    onClick={() => router.push(`/${params.storeId}/products/new`)}
                >
                    <AiOutlinePlus size={15} />
                    Add new
                </Button>
            </div>
            <hr />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for products" />
            <hr />
            <ApiList entityName="products" entityIdName="productId" />
        </>
     );
}
 
export default ProductClient;