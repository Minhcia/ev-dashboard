'use client';
import React, { useEffect, useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import { fetchAccountData } from "../api";

export default function AccountMain() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);

  useEffect(() => {
    fetchAccountData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-white bg-[#181A20]">Loading account...</div>;
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-400 bg-[#181A20]">Error: {error.message}</div>;

  const { cars, offers, plans } = data;
  const car = cars[selectedCarIndex];

  return (
    <div className="flex min-h-screen bg-[#181A20] text-white">
      <Sidebar activeRoute="/account" cars={cars} selectedCarIndex={selectedCarIndex} onCarSelect={setSelectedCarIndex} />
      {/* Main content */}
      <main className="flex-1 p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-2">Account</h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Offer cards */}
          {offers.map((offer: string, i: number) => (
            <div key={i} className="bg-[#23262F] rounded-xl p-4 flex flex-col items-center justify-center min-h-[80px]">
              <div className="font-semibold mb-1">{offer}</div>
              <button className="bg-[#1DE782] text-black font-semibold rounded px-4 py-1 mt-2">Try Now</button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Pricing table */}
          {plans.map((plan: any, i: number) => (
            <div key={i} className="bg-[#23262F] rounded-xl p-6 flex flex-col gap-2">
              <div className="font-semibold mb-2">{plan.name}</div>
              <div className="flex flex-col gap-1 text-xs">
                <span>12 AM - 8 AM: <b>${plan.prices[0].toFixed(2)} per kWh</b></span>
                <span>8 AM - 12 AM: <b>${plan.prices[1].toFixed(2)} per kWh</b></span>
                <span>12 PM - 6 PM: <b>${plan.prices[2].toFixed(2)} per kWh</b></span>
                <span>Session Fee: <b>${plan.sessionFee.toFixed(2)}</b></span>
                <span>Reservation: <b>${plan.reservation.toFixed(2)}</b></span>
                <span>Rate: <b>{plan.rate === 0 ? "0.00" : plan.rate.toFixed(2)} per month</b></span>
              </div>
              <button className="bg-[#1DE782] text-black font-semibold rounded px-4 py-1 mt-2">Get started</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 