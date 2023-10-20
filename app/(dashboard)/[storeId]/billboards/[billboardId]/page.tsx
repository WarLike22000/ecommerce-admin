import prisma from "@/app/libs/prismadb";
import BillboardForm from "./components/BillboardForm";

const BillboardPage = async ({
    params
} : {
    params: { billboardId: string }
}) => {

        let billboard;
    
        if(params.billboardId.length === 24) {
            billboard = await prisma.billboard.findFirst({
                where: {
                    id: params.billboardId
                }
            });
        }
        
        return ( 
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <BillboardForm initialData={billboard}/>
                </div>
            </div>
         );
        
}
 
export default BillboardPage;