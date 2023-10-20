import prisma from '@/app/libs/prismadb';

interface DashboardPageParams {
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageParams> = async ({
    params
}) => {

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    
    return ( 
        <div>
            Active store: {store?.name}
        </div>
     );
}
 
export default DashboardPage;