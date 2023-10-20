"use client"

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = () => {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: "Sizes",
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            href: `/${params.storeId}/colors`,
            label: "Colors",
            active: pathname === `/${params.storeId}/colors`
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/${params.storeId}/products`
        },
        {
            href: `/${params.storeId}/orders`,
            label: "Orders",
            active: pathname === `/${params.storeId}/orders`
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        },
    ]
    
    return ( 
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            {
                routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={`
                            text-sm font-semibold transition-colors text-gray-400 hover:text-gray-900
                            ${route.active && "text-gray-900"}
                        `}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
     );
}
 
export default MainNav;