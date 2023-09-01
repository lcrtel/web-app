import InvoiceForm from "./InvoiceForm";

export default () => {
    return (
        <>
            <h3 className="text-2xl tracking-tight font-bold mb-4">
                Create Invoice
            </h3>
            <div className="p-5 bg-slate-50 rounded-lg">
                <InvoiceForm />
            </div>
        </>
    );
};
