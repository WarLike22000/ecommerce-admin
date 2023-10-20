import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
    
        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        const { name } = body;
    
        if(!name) {
            return new NextResponse("Name is required", { status: 400 });
        };
    
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const store = await prisma.store.updateMany({
            where: {
                id: params.storeId,
                userId: currentUser.id
            },
            data: {
                name
            }
        });
    
        return NextResponse.json(store);
    } catch (error) {
        console.log("STORE_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    request: Request,
    params: { params: { storeId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        if(!params.params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const store = await prisma.store.deleteMany({
            where: {
                id: params.params.storeId,
                userId: currentUser.id
            }
        });
    
        return NextResponse.json(store);
    } catch (error) {
        console.log("STORE_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};