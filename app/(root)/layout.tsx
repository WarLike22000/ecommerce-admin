import getCurrentUser from "../actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

import { redirect } from "next/navigation";

export default async function StupeLayout({
    children
}:{
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/auth");
    };

    const store = await prisma.store.findFirst({
        where: {
            userId: currentUser.id
        }
    });

    if(store) {
        redirect(`/${store.id}`);
    };

    return (
        <>
            {children}
        </>
    )
}