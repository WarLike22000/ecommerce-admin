import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    const { productIds } = await req.json();

    if(!productIds || productIds.length === 0) {
        return new NextResponse("Product ids are required", { status: 400 })
    };

    const order = await prisma.order.create({
        data: {
            storeId: params.storeId,
            isPaid: true,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    });

    return NextResponse.json({ url: `${process.env.FRONTEND_STORE_URL}?success=1` })
}