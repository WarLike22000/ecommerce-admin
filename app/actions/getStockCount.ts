import prisma from "@/app/libs/prismadb";

export const getStockCount = async (storeId: string) => {
    const stockCount = await prisma.product.count({
        where: {
            storeId,
            isArchived: false
        }
    });

    return stockCount;
}