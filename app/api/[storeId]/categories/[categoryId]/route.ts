import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        if(!params.categoryId) {
            return new NextResponse("category id is required", { status: 400 });
        };
        
        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                billboard: true
            }
        });
    
        return NextResponse.json(category);
    } catch (error) {
        console.log("CATEGORY_GET", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
    
        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        const { name, billboardId } = body;
    
        if(!name) {
            return new NextResponse("Name is required", { status: 400 });
        };

        if(!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        };
    
        if(!params.categoryId) {
            return new NextResponse("category id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const categories = await prisma.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId
            }
        });
    
        return NextResponse.json(categories);
    } catch (error) {
        console.log("CATEGORIES_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        if(!params.categoryId) {
            return new NextResponse("category id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const category = await prisma.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        });
    
        return NextResponse.json(category);
    } catch (error) {
        console.log("CATEGORY_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};