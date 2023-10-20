import prisma from "@/app/libs/prismadb";
import SizesClient from "./components/BillboardClient";

import { format } from "date-fns";
import { SizeColumn } from "./components/BillboardColumn";

const SizesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const sizes = await prisma.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedSizes} />
            </div>
        </div>
     );
}
 
export default SizesPage;