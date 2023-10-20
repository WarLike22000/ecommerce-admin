import prisma from "@/app/libs/prismadb";
import OrderClient from "./components/BillboardClient";

import { format } from "date-fns";
import { OrderColumn } from "./components/BillboardColumn";

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const orders = await prisma.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(", "),
        totalPrice: item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
     );
}
 
export default OrdersPage;