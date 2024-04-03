
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default async function BackLink() {

    return (
        <>
            <a href="/profile" className="flex gap-1 m-4 items-center">
                <ChevronLeftIcon className="h-5 w-5 text-custom-dark-blue" />
                <p className="text-custom-dark-blue text-sm">Voltar para home</p>
            </a>
        </>
    )


}