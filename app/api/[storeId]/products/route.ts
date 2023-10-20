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

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            image,
            isFeatured,
            isArchived
        } = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if(!name) {
            return new NextResponse("Name is require", { status: 400 });
        };
        if(!price) {
            return new NextResponse("Price is require", { status: 400 });
        };
        if(!categoryId) {
            return new NextResponse("Category id is require", { status: 400 });
        };
        if(!colorId) {
            return new NextResponse("Color id is require", { status: 400 });
        };
        if(!sizeId) {
            return new NextResponse("Size id is require", { status: 400 });
        };
        if(!image || !image.length) {
            return new NextResponse("Image are require", { status: 400 });
        };

        
        if(!params.storeId) {
            return new NextResponse("Store id is require", { status: 400 });
        };
        
        const product = await prisma.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
                image
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("PRODUCTS_POST", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(
    request: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured');
        
        if(!params.storeId) {
            return new NextResponse("Store id is require", { status: 400 });
        };

        const products = await prisma.product.findMany({
            where: {
              storeId: params.storeId,
              categoryId,
              colorId,
              sizeId,
              isFeatured: isFeatured ? true : undefined,
              isArchived: false,
            },
            include: {
              category: true,
              color: true,
              size: true,
            },
            orderBy: {
              createdAt: 'desc',
            }
          });

        return NextResponse.json(products);
    } catch (error) {
        console.log("PRODUCTS_GET", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}