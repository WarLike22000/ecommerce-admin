import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { name, billboardId } = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if(!name) {
            return new NextResponse("Name is require", { status: 400 });
        };

        if(!billboardId) {
            return new NextResponse("Billboard id is require", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is require", { status: 400 });
        };
        
        const category = await prisma.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("CATEGORIES_POST", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(
    request: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is require", { status: 400 });
        };

        const categories = await prisma.category.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("CATEGORIES_GET", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}