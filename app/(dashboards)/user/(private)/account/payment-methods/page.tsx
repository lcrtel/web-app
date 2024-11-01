import { PaymentsForm } from "./paymentsForm";

export default async function Page() {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold tracking-tight">Payment Methods</h2>
      <PaymentsForm />
    </>
  );
}
