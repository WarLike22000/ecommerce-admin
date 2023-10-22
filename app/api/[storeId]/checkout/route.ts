import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.FRONTEND_STORE_URL!,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async  function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
};

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
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
    
        const products = await prisma.product.updateMany({
            where: {
                id: {
                    in: productIds
                }
            },
            data: {
                isArchived: true
            }
        })
        
        return NextResponse.json({ url: `${process.env.FRONTEND_STORE_URL}/cart?success=1` })
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}