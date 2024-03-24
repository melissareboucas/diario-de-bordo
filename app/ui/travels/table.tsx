
import { fetchTravels, fetchUserById, fetchFilteredTravels } from '@/app/lib/data';
import { DeleteButton } from "@/app/ui/travels/deleteButton";

export default async function TravelsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const travels = await fetchFilteredTravels(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Nome
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Cidade de Origem
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    País de origem
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Cidade de destino
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    País de destino
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Distância
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {travels?.map((travel) => (
                                <tr
                                    key={travel.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={travel.image_url}
                                                className="rounded-full w-28 h-28"
                                                alt={`${travel.name}'s profile picture`}
                                            />
                                            <p>{travel.name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {travel.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {travel.origincity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {travel.origincountry}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {travel.destinycity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {travel.destinycountry}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {travel.distanceinmeters}
                                    </td>
                                    
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                        <a href={`/profile/travels/${travel.id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100">
                            Editar
                        </a >
                                            <DeleteButton id={travel.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
