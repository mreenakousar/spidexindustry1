"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { productCategories } from "../../data/site";
import * as CategoryIcons from "../ui/CategoryIcons";
import { ChevronDownIcon, XMarkIcon, UserIcon, Squares2X2Icon, BuildingOfficeIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/product-categories", label: "Services & Capabilities", isMega: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us", isDropdown: true },
  { href: "/contact", label: "Contact Us" },
];

const aboutDropdownLinks = [
  { href: "/about", label: "About Us", desc: "Our history, team & facility" },
  { href: "/reviews", label: "Client Reviews", desc: "Customer experiences & testimonials" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  const [hoveredCat, setHoveredCat] = useState<string | null>(
    productCategories[0]?.id ?? null
  );
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
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
      flex items-center gap-1
      px-4 py-2 text-sm xl:text-[15px] font-medium
      rounded-md transition-all whitespace-nowrap
      ${active ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"}
    `;
  };

  return (
    <header className="sticky top-0 z-[99999] w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.svg" alt="logo" width={140} height={40} className="w-[120px] md:w-[140px] h-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isCapabilitiesActive = pathname === "/product-categories" || pathname === "/services" || pathname === "/factory-production";
            const isAboutActive = pathname === "/about" || pathname === "/reviews";
            const isActive = link.isMega ? isCapabilitiesActive : link.isDropdown ? isAboutActive : pathname === link.href;

            if (link.isMega) {
              return (
                <div key="mega" className="relative group">
                  <Link
                    href="/product-categories"
                    className={`${linkClass(link.href, isActive)} flex items-center gap-1`}
                  >
                    {link.label}
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* MEGA MENU */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full mt-2 w-[920px] bg-white border rounded-xl shadow-xl transition-all duration-200 z-[9999]">
                    <div className="flex">
                      {/* MEGA MENU LEFT: GENERAL OVERVIEWS */}
                      <div className="w-64 border-r p-4 bg-slate-50/50 rounded-l-xl">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">Production Ecosystem</h4>
                        <div className="space-y-1">
                          <Link href="/services" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 transition">
                            <Squares2X2Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Sourcing & Services</div>
                              <p className="text-[11px] text-slate-500 leading-normal">Full-scale manufacturing loops</p>
                            </div>
                          </Link>
                          <Link href="/factory-production" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 transition">
                            <BuildingOfficeIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Factory & Facilities</div>
                              <p className="text-[11px] text-slate-500 leading-normal">Multi-stage QA and setup</p>
                            </div>
                          </Link>
                          <Link href="/product-categories" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-100 transition">
                            <DocumentTextIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Complete Catalog</div>
                              <p className="text-[11px] text-slate-500 leading-normal">Interactive apparel specs</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* MEGA MENU MIDDLE: CATEGORIES */}
                      <div className="w-60 border-r p-4">
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
                              className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm transition ${active ? "bg-blue-50/50 text-blue-600 font-semibold" : "hover:bg-slate-50 text-slate-700"
                                }`}
                            >
                              {Icon && (
                                <Icon className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-500"}`} />
                              )}
                              <span>
                                {cat.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* MEGA MENU RIGHT: SUB-CATEGORIES & DETAILS */}
                      <div className="flex-1 p-5 bg-white rounded-r-xl">
                        {productCategories.map((cat) => {
                          if (cat.id !== hoveredCat) return null;

                          return (
                            <div key={cat.id} className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Sub Categories</h4>
                                <div className="space-y-1">
                                  {cat.sub.map((s) => (
                                    <Link
                                      key={s.href}
                                      href={`/product-categories#${cat.id}`}
                                      onMouseEnter={() => setHoveredSub(s.href)}
                                      className={`w-full text-left px-2 py-2 rounded-md text-sm block ${hoveredSub === s.href
                                        ? "bg-slate-50 text-blue-600 font-medium"
                                        : "text-slate-700 hover:bg-slate-50"
                                        }`}
                                    >
                                      {s.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Material Options</h4>
                                <div className="space-y-1">
                                  {cat.sub
                                    .find((s) => s.href === hoveredSub)
                                    ?.sub?.map((item) => (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block text-sm text-slate-600 hover:text-blue-600 py-1"
                                      >
                                        {item.label}
                                      </Link>
                                    )) ?? (
                                      <p className="text-sm text-slate-400">Select sub-category</p>
                                    )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (link.isDropdown) {
              return (
                <div key="dropdown" className="relative group">
                  <span className={`${linkClass(link.href, isActive)} flex items-center gap-1 cursor-pointer`}>
                    {link.label}
                    <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </span>

                  {/* SUB DROPDOWN */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full mt-2 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150">
                    {aboutDropdownLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2.5 text-sm hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <div className="font-semibold">{subLink.label}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{subLink.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={linkClass(link.href, isActive)}>
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
              className="flex items-center justify-center p-2 rounded-full border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-300 transition-all active:scale-95"
              title="Account"
            >
              <UserIcon className="w-[22px] h-[22px]" />
            </button>

            {/* Dropdown Menu */}
            {authDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Welcome
                </div>
                <Link
                  href="/login"
                  onClick={() => setAuthDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setAuthDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Request Quote Button */}
          <Link href="/get-quote" className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shadow-sm transition-all whitespace-nowrap">
            Request Quote
          </Link>
        </div>

        {/* MOBILE & TABLET HAMBURGER BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE & TABLET DRAWER */}
      <div className={`fixed inset-0 z-[9999] bg-white transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Image src="/logo.svg" alt="logo" width={130} height={40} />
          <button onClick={() => setMenuOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-70px)]">
          {/* Mobile Capabilities */}
          <div className="py-2 border-b border-slate-50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Services & Capabilities</span>
            <div className="pl-2 space-y-2.5">
              <Link href="/services" onClick={() => setMenuOpen(false)} className="block text-sm text-slate-800 hover:text-blue-600 font-medium">Sourcing & Services</Link>
              <Link href="/factory-production" onClick={() => setMenuOpen(false)} className="block text-sm text-slate-800 hover:text-blue-600 font-medium">Factory & Facilities</Link>
              <Link href="/product-categories" onClick={() => setMenuOpen(false)} className="block text-sm text-slate-800 hover:text-blue-600 font-medium">Complete Catalog</Link>
            </div>
          </div>

          {/* Mobile Portfolio */}
          <Link
            href="/portfolio"
            onClick={() => setMenuOpen(false)}
            className="text-base py-3 border-b border-slate-50 text-slate-800 flex justify-between items-center"
          >
            Portfolio
          </Link>

          {/* Mobile About Us Dropdown */}
          <div className="py-2 border-b border-slate-50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">About Speedx</span>
            <div className="pl-2 space-y-2.5">
              {aboutDropdownLinks.map((subLink) => (
                <Link
                  key={subLink.href}
                  href={subLink.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-slate-800 hover:text-blue-600 font-medium"
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
            className="text-base py-3 border-b border-slate-50 text-slate-800 flex justify-between items-center"
          >
            Contact Us
          </Link>

          <div className="mt-6 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-slate-200 p-3 rounded-md text-center text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="border border-slate-200 p-3 rounded-md text-center text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
              >
                Sign Up
              </Link>
            </div>
            <Link
              href="/get-quote"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white p-3 rounded-md text-center text-sm font-medium shadow-md hover:bg-blue-700 transition"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}