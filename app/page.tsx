import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import HeroBanner from "@/components/HeroBanner";
import CategoryCircles from "@/components/CategoryCircles";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <HeroBanner />
      <CategoryCircles />
      <ProductGrid />
      <Footer />
    </main>
  );
}
