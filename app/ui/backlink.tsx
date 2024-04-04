
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface BackLinkProps {
    backToLink: string;
    backToText: string
}

export default async function BackLink({ backToLink, backToText }: BackLinkProps) {

    return (
        <>
            <a href={backToLink} className="flex gap-1 m-4 items-center">
                <ChevronLeftIcon className="h-5 w-5 text-custom-dark-blue" />
                <p className="text-custom-dark-blue text-sm">{backToText}</p>
            </a>
        </>
    )


}