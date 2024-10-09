export default function PurchasedRoutesPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="">
        <div className="flex justify-between">
          <h3 className="mb-2 text-lg font-semibold">Purchase Requests</h3>
        </div>
        <p>Coming soon...</p>
      </div>
    </section>
  );
}
