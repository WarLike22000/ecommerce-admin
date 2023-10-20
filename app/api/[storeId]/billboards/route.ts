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

        const { label, imageUrl } = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if(!label) {
            return new NextResponse("Label is require", { status: 400 });
        };

        if(!imageUrl) {
            return new NextResponse("ImageUrl is require", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is require", { status: 400 });
        };
        
        const billboard = await prisma.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("BILLBOARDS_POST", error);
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

        const billboards = await prisma.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(billboards);
    } catch (error) {
        console.log("BILLBOARDS_GET", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}