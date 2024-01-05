import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative">
            <Nav />
            {children}
            <Footer />
        </main>
    );
}
