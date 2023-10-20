import prisma from "@/app/libs/prismadb";
import CategoryForm from "./components/CategoryForm";

const CategoryPage = async ({
    params
} : {
    params: { categoryId: string, storeId: string }
}) => {

        let category;
    
        if(params.categoryId.length === 24) {
            category = await prisma.category.findFirst({
                where: {
                    id: params.categoryId
                }
            });
        }
        
        const billboards = await prisma.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })
        
        return ( 
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <CategoryForm billboards={billboards} initialData={category}/>
                </div>
            </div>
         );
        
}
 
export default CategoryPage;