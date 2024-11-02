import Footer from "@/components/Footer";
import PublicNav from "@/components/navigation/PublicNav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <PublicNav />
      {children}
      <Footer />
    </main>
  );
}
