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

        const { name, value } = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if(!name) {
            return new NextResponse("Name is require", { status: 400 });
        };

        if(!value) {
            return new NextResponse("Value is require", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is require", { status: 400 });
        };
        
        const size = await prisma.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("SIZES_POST", error);
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

        const sizes = await prisma.size.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(sizes);
    } catch (error) {
        console.log("SIZES_GET", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}