import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Gallery from "@/components/Gallery";
import Studio from "@/components/Studio";
import Artists from "@/components/Artists";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Gallery />
      <Studio />
      <Artists />
      <Process />
      <Footer />
      <WhatsAppBtn />
    </main>
  );
}
