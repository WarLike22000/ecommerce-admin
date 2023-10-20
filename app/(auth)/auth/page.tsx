import getCurrentUser from "@/app/actions/getCurrentUser";
import AuthForm from "../components/AuthForm";

const AuthPage = async () => {

    const currentUser = await getCurrentUser();
    
    return (
        <>
            <AuthForm currentUser={currentUser!} />
        </>
    )
}
 
export default AuthPage;