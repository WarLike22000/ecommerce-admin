import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(
    request: Request,
    { params }: { params: { productId: string } }
) {
    try {
        if(!params.productId) {
            return new NextResponse("product id is required", { status: 400 });
        };
        
        const product = await prisma.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                category: true,
                size: true,
                color: true
            }
        });
    
        return NextResponse.json(product);
    } catch (error) {
        console.log("PRODUCT_GET", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
    
        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
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
    
        if(!params.productId) {
            return new NextResponse("product id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        await prisma.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                image,
                isFeatured,
                isArchived
            }
        });

        const products = await prisma.product.update({
            where: {
                id: params.productId
            },
            data: {
                image
            }
        })
    
        return NextResponse.json(products);
    } catch (error) {
        console.log("PRODUCTS_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        };
    
        if(!params.productId) {
            return new NextResponse("product id is required", { status: 400 });
        };
        
        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        };
    
        const product = await prisma.product.deleteMany({
            where: {
                id: params.productId,
            }
        });
    
        return NextResponse.json(product);
    } catch (error) {
        console.log("PRODUCT_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
};