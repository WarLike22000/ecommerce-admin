"use client"

import Heading from "@/app/components/Heading";

import { OrderColumn, columns } from "./BillboardColumn";
import { DataTable } from "@/app/components/DataTable";

interface OrderClientProps {
    data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {

    return ( 
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <hr />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
     );
}
 
export default OrderClient;