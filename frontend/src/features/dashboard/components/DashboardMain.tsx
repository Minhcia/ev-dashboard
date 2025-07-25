'use client';
import React, { useState, useEffect } from "react";
import Sidebar from "@/shared/components/Sidebar";
import { useDashboardData } from "../hooks/useDashboardData";
import CarImage from "./CarImage";

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function DashboardMain() {
  const { data, loading, error } = useDashboardData();
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-white bg-[#181A20]">Loading dashboard...</div>;
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-400 bg-[#181A20]">Error: {error.message}</div>;

  const { user, stations } = data;
  const cars = user.cars;
  const car = cars[selectedCarIndex];
  const { stats } = car;

  // Center mặc định là trạm đầu tiên
  const centerLatLng = stations[0]?.lat && stations[0]?.lng ? { lat: stations[0].lat, lng: stations[0].lng } : null;
  // Lọc các trạm trong bán kính 10km từ centerLatLng
  const stationsInRadius = centerLatLng
    ? stations.filter((s: any) => s.lat && s.lng && getDistanceKm(centerLatLng.lat, centerLatLng.lng, s.lat, s.lng) <= 10)
    : stations;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#181A20] text-white">
      <div className="flex-shrink-0">
        <Sidebar
          activeRoute="/dashboard"
          cars={cars}
          selectedCarIndex={selectedCarIndex}
          onCarSelect={setSelectedCarIndex}
        />
      </div>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* EV Cars Card */}
                <div className="bg-[#23262F] rounded-xl p-4 md:p-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">EV cars</span>
                    <span className="text-[#1DE782] font-semibold">{car.name}</span>
                  </div>
                  <div className="flex flex-wrap justify-between text-sm mb-2 gap-2">
                    <span>Time: <b>{stats.evCars.time}</b></span>
                    <span>Battery: <b>{stats.evCars.battery}%</b></span>
                    <span>Power reserve: <b>{stats.evCars.reserve} km</b></span>
                  </div>
                  <div className="bg-[#1DE782] h-4 rounded mb-2" style={{width: `${stats.evCars.battery}%`}} />
                  <div className="text-right text-xs">{stats.evCars.remain} Remaining</div>
                </div>
                {/* Gas Savings Card */}
                <div className="bg-[#23262F] rounded-xl p-4 md:p-6 flex flex-col gap-2">
                  <div className="font-semibold mb-2">Gas Savings</div>
                  <div className="flex flex-wrap justify-between text-sm mb-2 gap-2">
                    <span>Saved money: <b>${stats.gasSavings.saved}</b></span>
                    <span>Using private: <b>${stats.gasSavings.private}</b></span>
                    <span>CO₂ not burned: <b>{stats.gasSavings.co2} O₂</b></span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(8)].map((_,i) => <div key={i} className="bg-[#1DE782] h-3 w-6 rounded" />)}
                    {[...Array(8)].map((_,i) => <div key={i} className="bg-[#393C49] h-3 w-6 rounded" />)}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#1DE782]">CA$32</span>
                    <span>Total spent: CA${stats.gasSavings.spent}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Charge Statistics Card */}
            <div className="bg-[#23262F] rounded-xl p-4 md:p-6">
              <div className="font-semibold mb-2">Charge statistics</div>
              <div className="flex flex-wrap justify-between text-xs mb-2 gap-2">
                <span>Total spent: <b>${stats.charge.spent}</b></span>
                <span>Total charged: <b>{stats.charge.charged} kWh</b></span>
                <span>Total time: <b>{stats.charge.time} hr</b></span>
                <span>Visited stations: <b>{stats.charge.stations}</b></span>
                <span>Parking time: <b>{stats.charge.parking} hr</b></span>
                <span>Cycle Count: <b>{stats.charge.cycles}</b></span>
              </div>
              {/* Chart */}
              <div className="h-32 bg-[#181A20] rounded mb-2 flex items-end gap-1 px-2">
                {stats.charge.chart.map((h:number,i:number) => (
                  <div key={i} className="w-4 rounded-t bg-gradient-to-t from-[#1DE782] to-[#393C49]" style={{height: `${h}px`}} />
                ))}
              </div>
              <div className="flex flex-wrap justify-between text-xs mt-2 gap-2">
                {stats.charge.labels.map((item:any, i:number) => (
                  <span key={i} style={{color: item.color}}>{item.label} - {item.value}%</span>
                ))}
              </div>
            </div>
            <CarImage carName={car.name} image={car.image} />
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-6 mt-6 xl:mt-0">
            {/* Quick Trip Planner */}
            <div className="bg-[#23262F] rounded-xl p-4 md:p-6 mb-6">
              <div className="font-semibold mb-2">Quick Trip Planner</div>
              <div className="flex flex-col gap-2">
                <select className="bg-[#181A20] rounded p-2 text-white" value={car.name} onChange={e => setSelectedCarIndex(cars.findIndex((c: any) => c.name === e.target.value))}>
                  {cars.map((car:any) => <option key={car.name}>{car.name}</option>)}
                </select>
                <input className="bg-[#181A20] rounded p-2 text-white" placeholder="Your Location" />
                <button className="bg-[#1DE782] text-black font-semibold rounded py-2 mt-2">Get Directions</button>
              </div>
            </div>
            {/* Stations List */}
            <div className="bg-[#23262F] rounded-xl p-4 md:p-6 flex-1">
              <div className="font-semibold mb-2">Stations list</div>
              <div className="flex flex-col gap-4">
                {stationsInRadius.map((station:any, i:number) => (
                  <div key={i} className="flex items-center justify-between bg-[#181A20] rounded p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-700 rounded" />
                      <div>
                        <div className="font-semibold">{station.name}</div>
                        <div className="text-xs text-gray-400">{station.address}</div>
                        <div className="text-xs text-[#1DE782]">Ports: {station.ports}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <div className="flex flex-wrap gap-2">
                        {station.types.map((type:string, j:number) => (
                          <span key={j} className={j===0?"bg-[#1DE782] text-black":"bg-[#393C49] text-white" + " rounded px-2 py-1 text-xs"}>{type}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <button className="bg-[#1DE782] text-black rounded px-3 py-1 text-xs">Book</button>
                        <button className="bg-[#393C49] text-white rounded px-3 py-1 text-xs">Support</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 