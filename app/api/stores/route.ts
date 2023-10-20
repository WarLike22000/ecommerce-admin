import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { name } = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if(!name) {
            return new NextResponse("Name is require", { status: 400 });
        };

        const store = await prisma.store.create({
            data: {
                name,
                userId: currentUser.id
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log("STORES_POST", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}