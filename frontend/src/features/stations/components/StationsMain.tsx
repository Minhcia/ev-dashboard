'use client';
import React, { useEffect, useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import { fetchStationsData } from "../api";
import StationsMap from "./StationsMap";

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

export default function StationsMain() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  // Center mặc định là trạm đầu tiên
  const [centerLatLng, setCenterLatLng] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    fetchStationsData()
      .then((res) => {
        setData(res);
        setLoading(false);
        if (res.stations && res.stations[0]?.lat && res.stations[0]?.lng) {
          setCenterLatLng({ lat: res.stations[0].lat, lng: res.stations[0].lng });
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-white bg-[#181A20]">Loading stations...</div>;
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-400 bg-[#181A20]">Error: {error.message}</div>;

  const { stations, cars } = data;
  const car = cars[selectedCarIndex];

  // Lọc các trạm trong bán kính 10km từ centerLatLng
  const stationsInRadius = centerLatLng
    ? stations.filter((s: any) => s.lat && s.lng && getDistanceKm(centerLatLng.lat, centerLatLng.lng, s.lat, s.lng) <= 10)
    : stations;

  return (
    <div className="flex min-h-screen bg-[#181A20] text-white">
      <Sidebar activeRoute="/stations" cars={cars} selectedCarIndex={selectedCarIndex} onCarSelect={setSelectedCarIndex} />
      {/* Main content */}
      <main className="flex-1 p-10 grid grid-cols-3 gap-6">
        {/* Map section */}
        <div className="col-span-2 bg-[#23262F] rounded-xl p-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">Stations</h1>
          <div className="bg-[#181A20] rounded-xl h-64 flex items-center justify-center mb-4 overflow-hidden">
            <StationsMap stations={stations} />
          </div>
          <div className="flex gap-4">
            {stationsInRadius.map((station:any, i:number) => (
              <div key={i} className="bg-[#181A20] rounded-xl p-4 flex flex-col items-center w-40">
                <span className="text-[#1DE782] text-2xl mb-2">{station.icon}</span>
                <div className="font-semibold mb-1">{station.name}</div>
                <div className="text-xs text-gray-400 mb-1">{station.miles} miles</div>
                <div className="text-xs mb-1">Type: {station.type}</div>
                <div className="text-xs mb-1">Price: ${station.price} kW</div>
                <div className="text-xs mb-1">Slot: {station.slot}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Vehicle Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#23262F] rounded-xl p-6 flex flex-col items-center">
            <img src={car.image} alt={car.name} className="w-32 mb-2" />
            <div className="font-semibold">{car.name}</div>
            <div className="text-xs text-[#1DE782]">Battery {car.battery}%</div>
            <div className="text-xs">Range {car.miles} miles</div>
            {/* Các trường khác nếu muốn có thể thêm vào fake data và render ở đây */}
          </div>
        </div>
      </main>
    </div>
  );
} 