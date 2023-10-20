import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/auth")
    };

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId: currentUser.id
        }
    });

    if(!store) {
        redirect("/");
    };
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
     );
}
 
export default SettingsPage;