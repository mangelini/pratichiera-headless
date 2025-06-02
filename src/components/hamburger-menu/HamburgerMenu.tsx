"use client"

import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon, ChevronDown, ChevronRight, Pizza} from "lucide-react";
import Link from "next/link";
import {Category} from "@/types/category";
import {useState} from "react";

interface HamburgerMenuProps {
    categories: Category[]
}

export default function HamburgerMenu({ categories }: HamburgerMenuProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set())
    
    const sorted = [...categories].sort((a, b) => a.menu_order - b.menu_order)
    const topLevel = sorted.filter((c) => c.parent === 0)
    const getChildren = (parentId: number) =>
        sorted.filter((c) => c.parent === parentId)

    const toggleCategory = (categoryId: number) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId)
        } else {
            newExpanded.add(categoryId)
        }
        setExpandedCategories(newExpanded)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <MenuIcon className={"h-6 w-6"} />
                    <span className={"sr-only"}>Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <Link href="/" className="flex items-center gap-2">
                    <Pizza className={"text-gray-600 hover:text-gray-800"}/>
                        <SheetTitle>Pratichiera</SheetTitle>
                </Link>
                </SheetHeader>
                <div className="grid gap-2 py-6">
                    {topLevel.map((cat) => {
                        const children = getChildren(cat.id)
                        const isExpanded = expandedCategories.has(cat.id)

                        return (
                            <div key={cat.id} className="space-y-2">
                                {children.length > 0 ? (
                                    <>
                                        <div className="flex items-center">
                                            <Link 
                                                href={`/category/${cat.slug}`}
                                                className="flex px-3 py-2 text-lg font-medium hover:bg-gray-100 rounded-md"
                                            >
                                                {cat.name}
                                            </Link>
                                            <button
                                                onClick={() => toggleCategory(cat.id)}
                                                className="p-2 bg-gray-100 rounded-md"
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <Link 
                                        href={`/category/${cat.slug}`}
                                        className="block px-3 py-2 text-lg font-medium hover:bg-gray-100 rounded-md"
                                    >
                                        {cat.name}
                                    </Link>
                                )}
                                
                                {children.length > 0 && isExpanded && (
                                    <div className="pl-4 space-y-1">
                                        {children.map((sub) => (
                                            <Link
                                                key={sub.id}
                                                href={`/category/${sub.slug}`}
                                                className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}