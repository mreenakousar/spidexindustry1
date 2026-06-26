"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";
import { productCategories } from "../../data/site";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/client-area")) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 mt-20">

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">


          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <Image
                  src="/spidex.png"
                  alt="Spidex Industry"
                  width={180}
                  height={60}
                  className="h-[450px] w-[160px] sm:w-[180px] object-contain"
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                A premier textile and apparel manufacturing partner. Delivering high-quality solutions for global brands.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Newsletter</h5>
              <form onSubmit={(e) => e.preventDefault()} className="relative flex w-full max-w-sm items-center">
                <input
                  type="email"
                  placeholder="Enter your business email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 pr-12 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors group"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Products / Categories */}
          <div className="space-y-4">
            <h5 className="font-semibold text-white tracking-wide uppercase text-sm">Products</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/product-categories#${cat.id}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    {cat.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="space-y-4">
            <h5 className="font-semibold text-white tracking-wide uppercase text-sm">Company</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Home
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  About Us
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Client Reviews
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Services &amp; Capabilities
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/factory-production" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Factory &amp; Facilities
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/product-categories" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Product Category
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Portfolio
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Contact Us
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Get a Quote
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Factory Info */}
          <div className="space-y-4">
            <h5 className="font-semibold text-white tracking-wide uppercase text-sm">Factory HQ</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Sialkot, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:+923252252130" className="hover:text-blue-400 transition-colors">+92 325-2252130</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:info@spidexindustry.com" className="hover:text-blue-400 transition-colors break-all">info@spidexindustry.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/50 py-5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} Spidex Industry. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}