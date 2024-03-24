
import { fetchTravelById} from "@/app/lib/data";
import EditTravelForm from "@/app/ui/travels/edit-form";

export default async function Edit({ params }: { params: { id: string } }) {
    const id = params.id;
    const [travel] = await Promise.all([
        fetchTravelById(id)
    ]);
    return (
        <EditTravelForm travel={travel}/>
    );
}