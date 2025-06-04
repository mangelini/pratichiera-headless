import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <div className={"flex flex-col w-full items-center justify-end pb-4 lg:pb-8 h-[50vh] bg-gray-400 rounded-xl"}>
            <h1 className={"font-bold text-2xl text-center mb-6 lg:mb-8"}>Parmigiano Reggiano DOP: eccellenza artigianale italiana a casa tua.</h1>
            <Button>
                <Link href={"/shop-online"}>Shop Online</Link>
            </Button>
        </div>
    )
}