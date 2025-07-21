import React from "react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Stations", href: "/stations" },
  { label: "My Trips", href: "/my-trips" },
  { label: "Account", href: "/account" },
  { label: "Subscription plan", href: "#" },
];

export default function Sidebar({ activeRoute, cars = [], selectedCarIndex = 0, onCarSelect }: {
  activeRoute?: string;
  cars?: any[];
  selectedCarIndex?: number;
  onCarSelect?: (idx: number) => void;
}) {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#1DE782] to-[#181A20] p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <span className="text-3xl">⚡</span>
          <span className="font-bold text-2xl tracking-wide">EV HUB</span>
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                (activeRoute === item.href
                  ? "font-semibold text-[#1DE782]"
                  : "hover:text-[#1DE782]") +
                " transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10">
          {cars.length > 0 ? (
            <div className="flex flex-col gap-2">
              {cars.map((car, idx) => (
                <button
                  key={car.name}
                  onClick={() => onCarSelect && onCarSelect(idx)}
                  className={
                    "flex items-center gap-2 px-2 py-1 rounded transition " +
                    (selectedCarIndex === idx
                      ? "bg-[#181A20] border border-[#1DE782] text-[#1DE782] font-semibold"
                      : "hover:bg-[#23262F] text-white")
                  }
                >
                  <img src={car.image} alt={car.name} className="w-8 h-5" />
                  <div>
                    <div className="font-semibold text-sm">{car.name}</div>
                    <div className={"text-xs " + (car.battery < 20 ? "text-red-400" : "text-[#1DE782]")}>{`Battery ${car.battery}% | ${car.miles} miles`}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <img src="/car-tesla.png" alt="Tesla" className="w-10 h-6" />
                  <div>
                    <div className="font-semibold">Tesla Model X</div>
                    <div className="text-xs text-[#1DE782]">Battery 58% | 120 miles</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src="/car-nissan.png" alt="Nissan" className="w-10 h-6" />
                  <div>
                    <div className="font-semibold">Nissan Leaf</div>
                    <div className="text-xs text-red-400">Battery 18% | 45 miles</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button className="bg-[#1DE782] text-black font-semibold rounded py-2 mt-10">Learn More</button>
    </aside>
  );
} 