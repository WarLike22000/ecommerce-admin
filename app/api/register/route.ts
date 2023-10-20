import { NextResponse } from "next/server";

import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            password
        } = body;

        if(!name || !email || !password) {
            return new NextResponse("Missing info", { status: 400 });
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        return NextResponse.json(user);
        
    } catch (error) {
        console.log(error, "ERROR_REGISTER")
        return new NextResponse("Internal error", { status: 500 });
    }
}