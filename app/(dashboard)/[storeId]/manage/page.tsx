import getCurrentUser from "@/app/actions/getCurrentUser";
import ManageAccount from "./components/ManageAccount";

const ManagePage = async () => {
    const currentUser = await getCurrentUser();
    
    return ( 
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ManageAccount currentUser={currentUser} />
        </div>
     );
}
 
export default ManagePage;