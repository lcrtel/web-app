import { fetchUser } from "@/utils/user";
import { PaymentsForm } from "./paymentsForm";

export default async function Page() {
    const user = await fetchUser();
    return (
        <>
            <h2 className=" font-bold text-xl tracking-tight mb-4">
                Payment Methods
            </h2>
            <PaymentsForm user={user} />
        </>
    );
}
