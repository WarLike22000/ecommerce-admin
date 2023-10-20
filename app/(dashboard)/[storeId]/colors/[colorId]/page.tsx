import prisma from "@/app/libs/prismadb";
import ColorForm from "./components/ColorForm";

const ColorPage = async ({
    params
} : {
    params: { colorId: string }
}) => {

        let color;
    
        if(params.colorId.length === 24) {
            color = await prisma.color.findFirst({
                where: {
                    id: params.colorId
                }
            });
        }
        
        return ( 
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ColorForm initialData={color}/>
                </div>
            </div>
         );
        
}
 
export default ColorPage;