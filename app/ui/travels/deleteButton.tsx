import { deleteTravel } from '@/app/lib/actions';
 
 
export function DeleteButton({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteTravel.bind(null, id);
 
  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        Delete
      </button>
    </form>
  );
}