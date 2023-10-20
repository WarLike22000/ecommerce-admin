"use client"

import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

import { AiOutlinePlus } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./BillboardColumn";
import { DataTable } from "@/app/components/DataTable";
import ApiList from "@/app/components/ApiList";

interface BillboardClientProps {
    data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button
                    black
                    type="button"
                    className="flex gap-1 items-center"
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                >
                    <AiOutlinePlus size={15} />
                    Add new
                </Button>
            </div>
            <hr />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading title="API" description="API calls for billboards" />
            <hr />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
     );
}
 
export default BillboardClient;