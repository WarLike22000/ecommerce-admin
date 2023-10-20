import prisma from "@/app/libs/prismadb";
import ColorsClient from "./components/BillboardClient";

import { format } from "date-fns";
import { ColorColumn } from "./components/BillboardColumn";

const ColorPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const colors = await prisma.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={formattedColors} />
            </div>
        </div>
     );
}
 
export default ColorPage;