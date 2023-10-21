import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/components/Navbar";
import prisma from '@/app/libs/prismadb';

import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/auth");
    };

    

    try {
        await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId: currentUser.id
            }
        });
    } catch (error) {
        redirect("/");
    }
    
    

    const stores = await prisma.store.findMany({
        where: {
            userId: currentUser.id
        }
    });
    
    return (
        <>
        <Suspense fallback={<h1>Loader...</h1>}>
            <Navbar stores={stores} currentUser={currentUser} />
            {children}
        </Suspense>
        </>
    )
}