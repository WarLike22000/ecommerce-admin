import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request,
    { params }: { params: { sizeId: string } }
) {
    try {
        if(!params.sizeId) {
            return new NextResponse("size id is required", { status: 400 });
        };
        
        const size = await prisma.size.findUnique({
            where: {
                id: params.sizeId,
            }
        });
    
        return NextResponse.json(size);
    } catch (error) {
        console.log("SIZE_GET", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
    
        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        const { name, value } = body;
    
        if(!name) {
            return new NextResponse("Name is required", { status: 400 });
        };

        if(!value) {
            return new NextResponse("Value is required", { status: 400 });
        };
    
        if(!params.sizeId) {
            return new NextResponse("size id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const sizes = await prisma.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        });
    
        return NextResponse.json(sizes);
    } catch (error) {
        console.log("SIZES_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        if(!params.sizeId) {
            return new NextResponse("size id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const size = await prisma.size.deleteMany({
            where: {
                id: params.sizeId,
            }
        });
    
        return NextResponse.json(size);
    } catch (error) {
        console.log("SIZE_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};