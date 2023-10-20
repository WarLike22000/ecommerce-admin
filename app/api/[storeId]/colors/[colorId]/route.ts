import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        if(!params.colorId) {
            return new NextResponse("color id is required", { status: 400 });
        };
        
        const color = await prisma.color.findUnique({
            where: {
                id: params.colorId,
            }
        });
    
        return NextResponse.json(color);
    } catch (error) {
        console.log("COLOR_GET", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string, colorId: string } }
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
    
        if(!params.colorId) {
            return new NextResponse("color id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const colors = await prisma.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            }
        });
    
        return NextResponse.json(colors);
    } catch (error) {
        console.log("COLORS_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        if(!params.colorId) {
            return new NextResponse("color id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const color = await prisma.color.deleteMany({
            where: {
                id: params.colorId,
            }
        });
    
        return NextResponse.json(color);
    } catch (error) {
        console.log("COLOR_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};