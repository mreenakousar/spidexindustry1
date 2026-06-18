import "../styles/globals.css";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import WhatsAppWidget from "../components/ui/WhatsAppWidget";
import ScrollRevealProvider from "../components/animations/ScrollRevealProvider";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Premium Custom Clothing Manufacturing",
  description:
    "Premium custom clothing manufacturing for global brands — private label, low MOQ, quality assurance, worldwide shipping.",
  openGraph: {
    title: "Premium Custom Clothing Manufacturing",
    description:
      "Private label production, low MOQ, quality assurance, worldwide shipping.",
    images: ["/hero.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Speedx Industry",
    url: "http://localhost:3000",
    logo: "http://localhost:3000/logo.svg",
    sameAs: [],
  };
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ScrollRevealProvider />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </body>
    </html>
  );
}
