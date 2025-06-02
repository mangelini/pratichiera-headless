"use client"

import Link from "next/link";

import {
    NavigationMenu as NavigationMenuPrimitive,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink
} from '@/components/ui/navigation-menu'
import {Category} from "@/types/category";

interface NavigationMenuProps {
    categories: Category[]
}

export default function NavigationMenu({ categories }: NavigationMenuProps) {
    const sorted = [...categories].sort((a, b) => a.menu_order - b.menu_order)
    const topLevel = sorted.filter((c) => c.parent === 0)
    const getChildren = (parentId: number) =>
        sorted.filter((c) => c.parent === parentId)

    return (
        <NavigationMenuPrimitive>
            <NavigationMenuList className="flex items-center space-x-4 px-6 py-3">
                {
                    topLevel.map((cat) => {
                        const children = getChildren(cat.id)

                        return (
                            <NavigationMenuItem key={cat.id}>
                                {children.length > 0 ? (
                                    <>
                                        <NavigationMenuTrigger>
                                            {cat.name}
                                        </NavigationMenuTrigger>

                                        <NavigationMenuContent>
                                            <ul className={"grid gap-3 lg:grid-cols-2 p-4 md:w-[200px] lg:w-[300px]"}>
                                                {/* Add parent category as first option */}
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href={`/category/${cat.slug}`}>
                                                            <div className="text-sm font-medium leading-none">
                                                                All {cat.name}
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                {children.map((sub) => (
                                                    <li key={sub.id}>
                                                        <NavigationMenuLink asChild>
                                                            <Link href={`/category/${sub.slug}`}>
                                                                <div className="text-sm font-medium leading-none">{sub.name}</div>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink
                                        href={`/category/${cat.slug}`}
                                        className="block px-3 py-1 rounded-md hover:bg-gray-100"
                                    >
                                        {cat.name}
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        )
                    })
                }
            </NavigationMenuList>
        </NavigationMenuPrimitive>
    )
}