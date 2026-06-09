import { BlueprintBackground } from "@/components/site/blueprint-background";
import { Cursor } from "@/components/site/cursor";
import { Loader } from "@/components/site/loader";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Receive } from "@/components/site/receive";
import { Services } from "@/components/site/services";
import { Credentials } from "@/components/site/credentials";
import { Clients } from "@/components/site/clients";
import { Work } from "@/components/site/work";
import { Process } from "@/components/site/process";
import { Principal } from "@/components/site/principal";
import { Trust } from "@/components/site/trust";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Sunlight } from "@/components/site/sunlight";
import { MobileCTA } from "@/components/site/mobile-cta";

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Loader />
      <Cursor />
      <BlueprintBackground />
      <Sunlight />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Receive />
        <Services />
        <Credentials />
        <Clients />
        <Work />
        <Process />
        <Principal />
        <Trust />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
