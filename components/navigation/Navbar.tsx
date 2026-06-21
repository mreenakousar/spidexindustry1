"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { productCategories } from "../../data/site";
import * as CategoryIcons from "../ui/CategoryIcons";
import { ChevronDownIcon, XMarkIcon, UserIcon, Squares2X2Icon, BuildingOfficeIcon, DocumentTextIcon, Bars3Icon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/about", label: "About Us", isDropdown: true },
  { href: "/services", label: "Services & Capabilities", isMega: true, activeOn: ["/services", "/factory-production"] },
  { href: "/product-categories", label: "Product Category", isMega: true, activeOn: ["/product-categories"] },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact Us" },
];

const aboutDropdownLinks = [
  { href: "/about", label: "About Us", desc: "Our history, team & facility" },
  { href: "/reviews", label: "Client Reviews", desc: "Customer experiences & testimonials" },
];

// Custom inline SVG logo that adapts to text color and has a transparent background
function Logo({ className = "text-white" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40" fill="none" className={className}>
      <text x="12" y="26" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700">SPEEDX INDUSTRY</text>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar in admin and client area panels
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/client-area")) {
    return null;
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  const [hoveredCat, setHoveredCat] = useState<string | null>(
    productCategories[0]?.id ?? null
  );
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Click outside to close auth dropdown
  useEffect(() => {
    const handleOutsideClick = () => setAuthDropdownOpen(false);
    if (authDropdownOpen) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [authDropdownOpen]);

  const linkClass = (href: string, active: boolean) => {
    return `
      relative flex items-center gap-1.5
      px-3.5 py-1.5 text-[14px] font-semibold tracking-wide rounded-full
      transition-all duration-300 ease-out whitespace-nowrap
      ${active
        ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-[0_2px_10px_rgba(59,130,246,0.15)]"
        : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
      }
    `;
  };

  return (
    <header className="fixed top-0 z-[99999] w-full bg-slate-900 backdrop-blur-lg border-b border-slate-800/50 text-white transition-all duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo className="text-white hover:text-blue-400 transition-colors w-[120px] md:w-[140px] h-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isCapabilitiesActive = pathname === "/product-categories" || pathname === "/services" || pathname === "/factory-production";
            const isAboutActive = pathname === "/about" || pathname === "/reviews";
            const isActive = link.isMega ? isCapabilitiesActive : link.isDropdown ? isAboutActive : pathname === link.href;

            if (link.isMega) {
              const isProductCategoryMenu = link.label === "Product Category";
              const isServicesMenu = link.label === "Services & Capabilities";
              // Each mega menu has its own independent active check
              const megaIsActive = (link as any).activeOn
                ? (link as any).activeOn.includes(pathname)
                : false;

              const menuWidthClass = isServicesMenu
                ? "lg:w-[290px]"
                : isProductCategoryMenu
                  ? "lg:w-[500px]"
                  : "lg:w-[920px]";

              return (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`${linkClass(link.href, megaIsActive)} flex items-center gap-1`}
                  >
                    {link.label}
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* MEGA MENU - positioned relative to this nav item */}
                  <div className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-md sm:max-w-xl md:max-w-4xl ${menuWidthClass} bg-[#0B1224] border border-slate-800/80 rounded-2xl shadow-2xl transition-all duration-200 z-[9999]`}>
                    <div className="flex">
                      {/* MEGA MENU LEFT: GENERAL OVERVIEWS */}
                      {!isProductCategoryMenu && (
                        <div className={`p-4 bg-[#070b19]/50 rounded-2xl ${!isServicesMenu ? "w-64 border-r border-slate-800/60 rounded-r-none" : "w-full"}`}>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">Production Ecosystem</h4>
                          <div className="space-y-1">
                            <Link href="/services" className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition">
                              <Squares2X2Icon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Sourcing & Services</div>
                                <p className="text-[11px] text-slate-400 leading-normal">Full-scale manufacturing loops</p>
                              </div>
                            </Link>
                            <Link href="/factory-production" className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition">
                              <BuildingOfficeIcon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Factory & Facilities</div>
                                <p className="text-[11px] text-slate-400 leading-normal">Multi-stage QA and setup</p>
                              </div>
                            </Link>
                            <Link href="/product-categories" className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition">
                              <DocumentTextIcon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Complete Catalog</div>
                                <p className="text-[11px] text-slate-400 leading-normal">Interactive apparel specs</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* MEGA MENU MIDDLE: CATEGORIES */}
                      {!isServicesMenu && (
                        <div className="w-60 border-r border-slate-800/60 p-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">Product Categories</h4>
                          {productCategories.map((cat) => {
                            const Icon = (CategoryIcons as any)[cat.icon];
                            const active = hoveredCat === cat.id;

                            return (
                              <Link
                                key={cat.id}
                                href={`/product-categories#${cat.id}`}
                                onMouseEnter={() => {
                                  setHoveredCat(cat.id);
                                  setHoveredSub(cat.sub?.[0]?.href ?? null);
                                }}
                                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${active ? "bg-blue-500/10 text-blue-400 font-semibold" : "hover:bg-white/5 text-slate-300 hover:text-white"
                                  }`}
                              >
                                {Icon && (
                                  <Icon className={`w-5 h-5 ${active ? "text-blue-400" : "text-slate-400"}`} />
                                )}
                                <span>
                                  {cat.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}

                      {/* MEGA MENU RIGHT: SUB-CATEGORIES & DETAILS */}
                      {!isServicesMenu && (
                        <div className="flex-1 p-5 bg-[#0B1224] rounded-r-2xl">
                          {productCategories.map((cat) => {
                            if (cat.id !== hoveredCat) return null;

                            return (
                              <div key={cat.id} className={`grid ${isProductCategoryMenu ? "grid-cols-1" : "grid-cols-2"} gap-6`}>
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Sub Categories</h4>
                                  <div className="space-y-1">
                                    {cat.sub.map((s) => (
                                      <Link
                                        key={s.href}
                                        href={`/product-categories#${cat.id}`}
                                        onMouseEnter={() => setHoveredSub(s.href)}
                                        className={`w-full text-left px-2.5 py-2 rounded-md text-sm block transition-colors duration-150 ${hoveredSub === s.href
                                          ? "bg-white/5 text-blue-400 font-medium"
                                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                                          }`}
                                      >
                                        {s.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {!isProductCategoryMenu && (
                                  <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Material Options</h4>
                                    <div className="space-y-1">
                                      {cat.sub
                                        .find((s) => s.href === hoveredSub)
                                        ?.sub?.map((item) => (
                                          <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block text-sm text-slate-400 hover:text-blue-400 transition-colors duration-150 py-1"
                                          >
                                            {item.label}
                                          </Link>
                                        )) ?? (
                                          <p className="text-sm text-slate-500">Select sub-category</p>
                                        )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (link.isDropdown) {
              return (
                <div key={link.label} className="relative group">
                  <span className={`${linkClass(link.href, isActive)} flex items-center gap-1 cursor-pointer`}>
                    {link.label}
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </span>

                  {/* SUB DROPDOWN */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full mt-2 w-64 bg-[#0B1224] border border-slate-800/80 rounded-xl shadow-2xl py-2 z-[9999] transition-all duration-200">
                    {aboutDropdownLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="group block px-4 py-2.5 text-sm hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                      >
                        <div className="font-semibold group-hover:text-blue-400 transition-colors">{subLink.label}</div>
                        <div className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors font-normal">{subLink.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={link.label} href={link.href} className={linkClass(link.href, isActive)}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">

          {/* LOGIN/SIGNUP DROPDOWN */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
              className="flex items-center justify-center p-2 rounded-full border border-slate-800 text-slate-300 hover:text-white hover:bg-white/5 hover:border-slate-700 transition-all active:scale-95"
              title="Account"
            >
              <UserIcon className="w-[20px] h-[20px]" />
            </button>

            {/* Dropdown Menu */}
            {authDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0B1224] border border-slate-800/80 rounded-xl shadow-2xl py-2 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Welcome
                </div>
                <Link
                  href="/login"
                  onClick={() => setAuthDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setAuthDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
                <div className="border-t border-slate-800/60 my-1" />
                <button
                  onClick={() => {
                    setAuthDropdownOpen(false);
                    window.location.href = "/";
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Request Quote Button */}
          <Link href="/get-quote" className="px-5 py-2 text-sm bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] shadow-sm transition-all duration-300 active:scale-95 whitespace-nowrap">
            Request Quote
          </Link>
        </div>

        {/* MOBILE & TABLET HAMBURGER BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2.5 border border-white/20 rounded-full hover:bg-white/5 text-white transition-all active:scale-95"
          aria-label="Open Menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE & TABLET DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE & TABLET DRAWER SLIDE-IN FROM RIGHT */}
      <div className={`fixed inset-y-0 right-0 z-[9999] w-full max-w-sm bg-slate-900  backdrop-blur-lg border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <Logo className="text-white w-[120px] h-auto" />
          <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-72px)] bg-slate-900 ">
          <div className="py-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-3">Services & Capabilities</span>
            <div className="pl-2 space-y-3">
              <Link href="/services" onClick={() => setMenuOpen(false)} className="block text-sm text-white hover:text-blue-200 font-medium transition-colors">Sourcing & Services</Link>
              <Link href="/factory-production" onClick={() => setMenuOpen(false)} className="block text-sm text-white hover:text-blue-200 font-medium transition-colors">Factory & Facilities</Link>
              <Link href="/product-categories" onClick={() => setMenuOpen(false)} className="block text-sm text-white hover:text-blue-200 font-medium transition-colors">Complete Catalog</Link>
            </div>
          </div>

          {/* Mobile Product Category */}
          <Link
            href="/product-categories"
            onClick={() => setMenuOpen(false)}
            className="text-base py-3 border-b border-white/10 text-white hover:text-blue-200 font-semibold transition-colors flex justify-between items-center"
          >
            Product Category
          </Link>

          {/* Mobile Portfolio */}
          <Link
            href="/portfolio"
            onClick={() => setMenuOpen(false)}
            className="text-base py-3 border-b border-white/10 text-white hover:text-blue-200 font-semibold transition-colors flex justify-between items-center"
          >
            Portfolio
          </Link>

          {/* Mobile About Us Dropdown */}
          <div className="py-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-3">About Speedx</span>
            <div className="pl-2 space-y-3">
              {aboutDropdownLinks.map((subLink) => (
                <Link
                  key={subLink.href}
                  href={subLink.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-white hover:text-blue-200 font-medium transition-colors"
                >
                  {subLink.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Contact */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-base py-3 border-b border-white/10 text-white hover:text-blue-200 font-semibold transition-colors flex justify-between items-center"
          >
            Contact Us
          </Link>

          <div className="mt-8 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-white/20 p-3 rounded-full text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="border border-white/20 p-3 rounded-full text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-all"
              >
                Sign Up
              </Link>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                window.location.href = "/";
              }}
              className="border border-red-500/30 p-3 rounded-full text-center text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all w-full"
            >
              Logout
            </button>
            <Link
              href="/get-quote"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white p-3 rounded-full text-center text-sm font-semibold shadow-md hover:bg-blue-500 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
