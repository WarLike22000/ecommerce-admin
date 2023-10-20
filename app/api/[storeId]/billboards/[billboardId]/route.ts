import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        if(!params.billboardId) {
            return new NextResponse("billboard id is required", { status: 400 });
        };
        
        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });
    
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("BILLBOARD_GET", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
    
        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        const { label, imageUrl } = body;
    
        if(!label) {
            return new NextResponse("Label is required", { status: 400 });
        };

        if(!imageUrl) {
            return new NextResponse("Image url is required", { status: 400 });
        };
    
        if(!params.billboardId) {
            return new NextResponse("billboard id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const billboards = await prisma.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        });
    
        return NextResponse.json(billboards);
    } catch (error) {
        console.log("BILLBOARDS_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        if(!params.billboardId) {
            return new NextResponse("billboard id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const billboard = await prisma.billboard.deleteMany({
            where: {
                id: params.billboardId,
            }
        });
    
        return NextResponse.json(billboard);
    } catch (error) {
        console.log("BILLBOARD_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};