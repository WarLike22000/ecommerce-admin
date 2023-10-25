import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import bcrypt from "bcrypt";

export async function PATCH(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const {
            name,
            email,
            password
        } = await request.json();

        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const newPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: name || currentUser.name,
                email: email || currentUser.email,
                hashedPassword: newPassword ?? currentUser.hashedPassword
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log("MANAGE_PATCH", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}