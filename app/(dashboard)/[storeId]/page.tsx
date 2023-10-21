import Card from '@/app/components/Card';
import Heading from '@/app/components/Heading';

import { FiDollarSign } from "react-icons/fi";
import { AiOutlineCreditCard } from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { getTotalRevenue } from '@/app/actions/getTotalRevenue';
import { getSalesCount } from '@/app/actions/getSalesCount';
import { getStockCount } from '@/app/actions/getStockCount';

interface DashboardPageParams {
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageParams> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview of your store" />
                <hr />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Card title='Total Revenue' value={`$${totalRevenue}`} icon={<FiDollarSign size={14} />} />
                    <Card title='Sales' value={`+${salesCount}`} icon={<AiOutlineCreditCard size={14} />} />
                    <Card title='Products In Stock' value={stockCount.toString()} icon={<GoPackage size={14} />} />
                </div>
            </div>
        </div>
     );
}
 
export default DashboardPage;