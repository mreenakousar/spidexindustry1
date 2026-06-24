// "use client";

// import { useMemo, useState } from "react";

// const fabrics = [
//   { name: "Basic Cotton", price: 5 },
//   { name: "Premium Cotton", price: 8 },
//   { name: "Polyester", price: 4 },
//   { name: "Dry Fit", price: 10 },
// ];

// export default function PricingCalculatorClient() {
//   const [quantity, setQuantity] = useState("1");
//   const [fabric, setFabric] = useState(fabrics[0]);

//   const qty = useMemo(() => {
//     const n = parseInt(quantity, 10);
//     return isNaN(n) || n < 1 ? 0 : n;
//   }, [quantity]);

//   const total = qty * fabric.price;

//   const handlePress = (val: string) => {
//     if (val === "C") {
//       setQuantity("1");
//       return;
//     }

//     if (val === "⌫") {
//       setQuantity((prev) => prev.slice(0, -1) || "0");
//       return;
//     }

//     setQuantity((prev) => (prev === "0" ? val : (prev + val).slice(0, 5)));
//   };

//   const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫", "C"];

//   return (
//     <section className="container py-16">
//       <h1 className="section-heading">Pricing Calculator</h1>

//       <p className="muted max-w-3xl">
//         Select fabric and enter quantity like a mobile calculator to get instant cost.
//       </p>

//       <div className="mt-10 grid gap-8 md:grid-cols-2">
//         {/* LEFT */}
//         <div className="rounded-2xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-slate-500">Quantity</p>

//           <div className="mt-2 rounded-xl bg-slate-100 p-4 text-right text-3xl font-semibold">
//             {quantity}
//           </div>

//           <div className="mt-6 grid grid-cols-3 gap-3">
//             {buttons.map((btn) => (
//               <button
//                 key={btn}
//                 onClick={() => handlePress(btn)}
//                 className="rounded-xl bg-slate-50 p-4 text-lg shadow-sm active:scale-95"
//               >
//                 {btn}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="rounded-2xl border bg-slate-50 p-6">
//           <h2 className="text-lg font-semibold">Pricing Details</h2>

//           <div className="mt-4 space-y-2">
//             {fabrics.map((f) => (
//               <button
//                 key={f.name}
//                 onClick={() => setFabric(f)}
//                 className={`w-full rounded-xl border p-3 text-left ${
//                   fabric.name === f.name
//                     ? "border-sky-500 bg-sky-50"
//                     : "bg-white"
//                 }`}
//               >
//                 <div className="flex justify-between">
//                   <span>{f.name}</span>
//                   <span>${f.price}</span>
//                 </div>
//               </button>
//             ))}
//           </div>

//           <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
//             <div className="flex justify-between text-sm">
//               <span>Fabric Cost</span>
//               <span>${fabric.price}/unit</span>
//             </div>

//             <div className="mt-2 flex justify-between text-sm">
//               <span>Quantity</span>
//               <span>{qty}</span>
//             </div>

//             <div className="mt-4 border-t pt-4 flex justify-between text-lg font-bold">
//               <span>Total</span>
//               <span>${total}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";

export default function CalculatorPage() {
  const [input, setInput] = useState("");

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ];

  const handleClick = (value: string) => {
    if (value === "=") {
      try {
        // evaluate expression safely
        const result = Function(`"use strict"; return (${input})`)();
        setInput(String(result));
      } catch {
        setInput("Error");
      }
      return;
    }

    setInput((prev) => {
      if (prev === "Error") return value;
      return prev + value;
    });
  };

  const clear = () => setInput("");
  const backspace = () => setInput((prev) => prev.slice(0, -1));

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">

        {/* Display */}
        <div className="mb-4 rounded-xl bg-slate-900 p-4 text-right text-white text-2xl min-h-[60px] flex items-center justify-end">
          {input || "0"}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <button
            onClick={clear}
            className="col-span-2 rounded-xl bg-red-500 p-3 text-white"
          >
            AC
          </button>

          <button
            onClick={backspace}
            className="col-span-2 rounded-xl bg-slate-300 p-3"
          >
            ⌫
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className="rounded-xl bg-slate-100 p-4 text-lg font-semibold active:scale-95 hover:bg-slate-200"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}