"use client"

import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

import { AiOutlinePlus } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./BillboardColumn";
import { DataTable } from "@/app/components/DataTable";
import ApiList from "@/app/components/ApiList";

interface ColorsClientProps {
    data: ColorColumn[];
}

const ColorsClient: React.FC<ColorsClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage colors for your store"
                />
                <Button
                    black
                    type="button"
                    className="flex gap-1 items-center"
                    onClick={() => router.push(`/${params.storeId}/colors/new`)}
                >
                    <AiOutlinePlus size={15} />
                    Add new
                </Button>
            </div>
            <hr />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for colors" />
            <hr />
            <ApiList entityName="colors" entityIdName="colorId" />
        </>
     );
}
 
export default ColorsClient;