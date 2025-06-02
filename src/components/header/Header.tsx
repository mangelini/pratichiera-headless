import woocommerce from "@/utils/woocommerce";
import {Category} from "@/types/category";
import Link from "next/link";
import NavigationMenu from "@/components/navigation-menu/NavigationMenu";
import {Pizza, Search, User} from "lucide-react";
import HamburgerMenu from "@/components/hamburger-menu/HamburgerMenu";

export default async function Header() {
    const categoriesResponse = await woocommerce.get("products/categories");
    const categories: Category[] = categoriesResponse.data;

    return (
        <div className="bg-white shadow flex w-full items-center justify-between px-6 py-2">
            <div className={"lg:hidden"}>
                <HamburgerMenu categories={categories} />
            </div>
            <div className={"hidden lg:flex w-full"}>
                <Link href="/" className="flex items-center">
                    <Pizza className={"text-gray-600 hover:text-gray-800"}/>
                </Link>

                <NavigationMenu categories={categories} />
            </div>
            <div className={"flex gap-x-4"}>
                <Link href={"/search"} className={"text-gray-600 hover:text-gray-800"}>
                    <Search className={"h-6 w-6"} />
                </Link>
                <Link href="/account" className="text-gray-600 hover:text-gray-800">
                    <User className="h-6 w-6" />
                </Link>
            </div>
        </div>
    )
}