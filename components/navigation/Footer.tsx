"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer in admin and client area panels
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/client-area")) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16 sm:gap-10">
        
        {/* Column 1: Brand, About & Newsletter */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-bold text-xl tracking-wider text-white">
              SPEEDX <span className="text-blue-500">INDUSTRY</span>
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              A premier textile and apparel manufacturing partner. Delivering high-quality solutions for global brands.
            </p>
          </div>

          {/* Email Newsletter Input */}
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
            <li>
              <Link href="/products/t-shirts" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                Custom T-Shirts <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link href="/products/hoodies" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                Premium Hoodies <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link href="/products/sportswear" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                Performance Sportswear <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link href="/products/athleisure" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                Athleisure Wear <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company Links */}
        <div className="space-y-4">
          <h5 className="font-semibold text-white tracking-wide uppercase text-sm">Company</h5>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Our Facility</Link></li>
            <li><Link href="/services" className="hover:text-blue-400 transition-colors">Manufacturing Services</Link></li>
            <li><Link href="/sustainability" className="hover:text-blue-400 transition-colors">Sustainability</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Get a Quote</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Factory Info */}
        <div className="space-y-4">
          <h5 className="font-semibold text-white tracking-wide uppercase text-sm">Factory HQ</h5>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span>12 KM Sialkot Bypass, Industrial Zone, Sialkot - Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="tel:+923001234567" className="hover:text-blue-400 transition-colors">+92 (300) 123-4567</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="mailto:info@speedxindustry.com" className="hover:text-blue-400 transition-colors">info@speedxindustry.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/50 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-xs text-slate-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Speedx Industry. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}