import prisma from "@/app/libs/prismadb";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({
    params
} : {
    params: { productId: string, storeId: string }
}) => {

        let product;
    
        if(params.productId.length === 24) {
            product = await prisma.product.findFirst({
                where: {
                    id: params.productId
                }
            });
        }
        
        const categories = await prisma.category.findMany({
            where: {
                storeId: params.storeId
            }
        })
        const sizes = await prisma.size.findMany({
            where: {
                storeId: params.storeId
            }
        })
        const colors = await prisma.color.findMany({
            where: {
                storeId: params.storeId
            }
        })
        
        return ( 
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ProductForm
                        initialData={product}
                        categories={categories}
                        sizes={sizes}
                        colors={colors}
                    />
                </div>
            </div>
         );
        
}
 
export default ProductPage;