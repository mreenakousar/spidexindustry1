
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { productCategories } from "../../data/site";
// import * as CategoryIcons from "../ui/CategoryIcons";
// import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About Us" },
//   { href: "/services", label: "Services" },
//   { href: "/factory-production", label: "Production" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/product-categories", label: "Product Categories" },
//   { href: "/pricing-calculator", label: "Calculator", accent: true },
//   { href: "/contact", label: "Contact Us" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [hoveredCat, setHoveredCat] = useState<string | null>(
//     productCategories[0]?.id ?? null
//   );
//   const [hoveredSub, setHoveredSub] = useState<string | null>(null);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "auto";
//   }, [menuOpen]);

//   const linkClass = (href: string, accent?: boolean) => {
//     const isActive = pathname === href;

//     return `
//       relative flex items-center gap-1
//       px-3 py-2 text-sm md:text-[15px]
//       rounded-md transition-all whitespace-nowrap
//       ${isActive ? "text-primary font-semibold" : "text-slate-700 hover:text-primary"}
//       ${accent ? "bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100" : ""}
//     `;
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center shrink-0">
//           <Image src="/logo.svg" alt="logo" width={140} height={40} />
//         </Link>

//         {/* DESKTOP NAV */}
//         <nav className="hidden lg:flex items-center gap-1">

//           {navLinks.map((link) =>
//             link.href === "/product-categories" ? (
//               <div key="cat" className="relative group">

//                 <Link href="/product-categories" className={`${linkClass(link.href, link.accent)} flex items-center gap-1`}>
//                   {link.label}
//                   <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
//                 </Link>

//                 {/* MEGA MENU */}
//                 <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full mt-2 w-[760px] bg-white border rounded-xl shadow-xl transition-all duration-200">

//                   <div className="flex">

//                     {/* LEFT */}
//                     <div className="w-60 border-r p-4">
//                       {productCategories.map((cat) => {
//                         const Icon = (CategoryIcons as any)[cat.icon];
//                         const active = hoveredCat === cat.id;

//                         return (
//                           <button
//                             key={cat.id}
//                             onMouseEnter={() => {
//                               setHoveredCat(cat.id);
//                               setHoveredSub(cat.sub?.[0]?.href ?? null);
//                             }}
//                             className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
//                               active ? "bg-slate-50" : "hover:bg-slate-50"
//                             }`}
//                           >
//                             {Icon && (
//                               <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-slate-500"}`} />
//                             )}
//                             <span className="font-medium text-slate-800">
//                               {cat.label}
//                             </span>
//                           </button>
//                         );
//                       })}
//                     </div>

//                     {/* RIGHT */}
//                     <div className="flex-1 p-5">

//                       {productCategories.map((cat) => {
//                         if (cat.id !== hoveredCat) return null;

//                         return (
//                           <div key={cat.id} className="grid grid-cols-2 gap-6">

//                             <div>
//                               <h4 className="text-sm font-semibold mb-3 text-slate-900">
//                                 Sub Categories
//                               </h4>

//                               <div className="space-y-1">
//                                 {cat.sub.map((s) => (
//                                   <button
//                                     key={s.href}
//                                     onMouseEnter={() => setHoveredSub(s.href)}
//                                     className={`w-full text-left px-2 py-2 rounded-md text-sm transition ${
//                                       hoveredSub === s.href
//                                         ? "bg-slate-50 text-primary"
//                                         : "text-slate-700 hover:bg-slate-50"
//                                     }`}
//                                   >
//                                     {s.label}
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>

//                             <div>
//                               <h4 className="text-sm font-semibold mb-3 text-slate-900">
//                                 Details
//                               </h4>

//                               <div className="space-y-1">
//                                 {cat.sub
//                                   .find((s) => s.href === hoveredSub)
//                                   ?.sub?.map((item) => (
//                                     <Link
//                                       key={item.href}
//                                       href={item.href}
//                                       className="block text-sm text-slate-600 hover:text-primary"
//                                     >
//                                       {item.label}
//                                     </Link>
//                                   )) ?? (
//                                   <p className="text-sm text-slate-400">
//                                     Select category
//                                   </p>
//                                 )}
//                               </div>
//                             </div>

//                           </div>
//                         );
//                       })}
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <Link key={link.href} href={link.href} className={linkClass(link.href, link.accent)}>
//                 {link.label}
//               </Link>
//             )
//           )}
//         </nav>

//         {/* ACTION BUTTONS */}
//         <div className="hidden lg:flex items-center gap-2">
//           <Link href="/login" className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50">
//             Login
//           </Link>

//           <Link href="/signup" className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50">
//             Sign Up
//           </Link>

//           <Link href="/get-quote" className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:opacity-90">
//             Request Quote
//           </Link>
//         </div>

//         {/* MOBILE BUTTON */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="lg:hidden p-2 border rounded-md"
//         >
//           ☰
//         </button>
//       </div>

//       {/* MOBILE DRAWER */}
//       <div className={`fixed inset-0 z-50 bg-white transition-transform duration-300 lg:hidden ${
//         menuOpen ? "translate-x-0" : "translate-x-full"
//       }`}>

//         <div className="flex items-center justify-between px-5 py-4 border-b">
//           <Image src="/logo.svg" alt="logo" width={130} height={40} />

//           <button onClick={() => setMenuOpen(false)}>
//             <XMarkIcon className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-5 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-70px)]">

//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className="text-base py-3 border-b text-slate-800"
//             >
//               {link.label}
//             </Link>
//           ))}

//           <div className="mt-6 flex flex-col gap-3">
//             <Link href="/login" className="border p-3 rounded-md text-center">
//               Login
//             </Link>
//             <Link href="/signup" className="border p-3 rounded-md text-center">
//               Sign Up
//             </Link>
//             <Link href="/get-quote" className="bg-primary text-white p-3 rounded-md text-center">
//               Request Quote
//             </Link>
//           </div>

//         </div>
//       </div>

//     </header>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { productCategories } from "../../data/site";
import * as CategoryIcons from "../ui/CategoryIcons";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/factory-production", label: "Production" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/product-categories", label: "Product Categories" },
  { href: "/reviews", label: "Reviews", accent: true },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [hoveredCat, setHoveredCat] = useState<string | null>(
    productCategories[0]?.id ?? null
  );
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const linkClass = (href: string, accent?: boolean) => {
    const isActive = pathname === href;

    return `
      flex items-center gap-1
      px-3 py-2 text-sm md:text-[15px]
      rounded-md transition-all whitespace-nowrap
      ${isActive ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"}
      ${accent ? "bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100" : ""}
    `;
  };

  return (
    <header className="sticky top-0 z-[9999] w-full bg-white/80 backdrop-blur-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.svg" alt="logo" width={140} height={40} />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1">

          {navLinks.map((link) =>
            link.href === "/product-categories" ? (
              <div key="mega" className="relative group">

                <Link
                  href="/product-categories"
                  className={`${linkClass(link.href, link.accent)} flex items-center gap-1`}
                >
                  {link.label}
                  <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>

                {/* MEGA MENU */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full mt-2 w-[780px] bg-white border rounded-xl shadow-xl transition-all duration-200 z-[9999]">

                  <div className="flex">

                    {/* LEFT */}
                    <div className="w-60 border-r p-4">
                      {productCategories.map((cat) => {
                        const Icon = (CategoryIcons as any)[cat.icon];
                        const active = hoveredCat === cat.id;

                        return (
                          <button
                            key={cat.id}
                            onMouseEnter={() => {
                              setHoveredCat(cat.id);
                              setHoveredSub(cat.sub?.[0]?.href ?? null);
                            }}
                            className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                              active ? "bg-slate-50" : "hover:bg-slate-50"
                            }`}
                          >
                            {Icon && (
                              <Icon className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-500"}`} />
                            )}
                            <span className="font-medium text-slate-800">
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 p-5">

                      {productCategories.map((cat) => {
                        if (cat.id !== hoveredCat) return null;

                        return (
                          <div key={cat.id} className="grid grid-cols-2 gap-6">

                            <div>
                              <h4 className="text-sm font-semibold mb-3">
                                Sub Categories
                              </h4>

                              <div className="space-y-1">
                                {cat.sub.map((s) => (
                                  <button
                                    key={s.href}
                                    onMouseEnter={() => setHoveredSub(s.href)}
                                    className={`w-full text-left px-2 py-2 rounded-md text-sm ${
                                      hoveredSub === s.href
                                        ? "bg-slate-50 text-blue-600 font-medium"
                                        : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                  >
                                    {s.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold mb-3">
                                Details
                              </h4>

                              <div className="space-y-1">
                                {cat.sub
                                  .find((s) => s.href === hoveredSub)
                                  ?.sub?.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className="block text-sm text-slate-600 hover:text-blue-600"
                                    >
                                      {item.label}
                                    </Link>
                                  )) ?? (
                                  <p className="text-sm text-slate-400">
                                    Select category
                                  </p>
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
            ) : (
              <Link key={link.href} href={link.href} className={linkClass(link.href, link.accent)}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/login" className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50">
            Login
          </Link>

          <Link href="/signup" className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50">
            Sign Up
          </Link>

          <Link href="/get-quote" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:opacity-90">
            Request Quote
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 border rounded-md"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[9999] bg-white transition-transform duration-300 lg:hidden ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}>

        <div className="flex items-center justify-between px-5 py-4 border-b">
          <Image src="/logo.svg" alt="logo" width={130} height={40} />

          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-70px)]">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base py-3 border-b text-slate-800"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/login" className="border p-3 rounded-md text-center">
              Login
            </Link>
            <Link href="/signup" className="border p-3 rounded-md text-center">
              Sign Up
            </Link>
            <Link href="/get-quote" className="bg-blue-600 text-white p-3 rounded-md text-center">
              Request Quote
            </Link>
          </div>

        </div>
      </div>

    </header>
  );
}