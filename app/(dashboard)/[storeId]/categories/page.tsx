import prisma from "@/app/libs/prismadb";
import CategoryClient from "./components/BillboardClient";

import { format } from "date-fns";
import { CategoryColumn } from "./components/BillboardColumn";

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const categories = await prisma.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedBillboards: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedBillboards} />
            </div>
        </div>
     );
}
 
export default CategoriesPage;