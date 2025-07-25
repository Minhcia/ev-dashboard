'use client';
import React, { useEffect, useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import { fetchTripsData } from "../api";
import TripsMap from "./TripsMap";

export default function TripsMain() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [originLatLng, setOriginLatLng] = useState<any>(null);
  const [destLatLng, setDestLatLng] = useState<any>(null);

  useEffect(() => {
    fetchTripsData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-white bg-[#181A20]">Loading trips...</div>;
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-400 bg-[#181A20]">Error: {error.message}</div>;

  const { cars, tripInfo, trips } = data;
  const car = cars[selectedCarIndex];

  function handleFindRoute() {
    const findLatLng = (name: string) => {
      const found = trips.find((t: any) => t.name.toLowerCase().includes(name.toLowerCase()));
      return found && found.lat && found.lng ? { lat: found.lat, lng: found.lng } : null;
    };
    setOriginLatLng(findLatLng(location));
    setDestLatLng(findLatLng(destination));
  }

  return (
    <div className="flex min-h-screen bg-[#181A20] text-white">
      <Sidebar activeRoute="/my-trips" cars={cars} selectedCarIndex={selectedCarIndex} onCarSelect={setSelectedCarIndex} />
      {/* Main content */}
      <main className="flex-1 p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-2">Trips</h1>
        <div className="bg-[#23262F] rounded-xl p-6 flex gap-6">
          {/* Map section */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-[#181A20] rounded-xl h-64 flex items-center justify-center mb-4 overflow-hidden">
              <TripsMap trips={trips} origin={originLatLng} destination={destLatLng} />
            </div>
            <div className="flex gap-2">
              <input className="bg-[#181A20] rounded p-2 text-white flex-1" placeholder="Your Location" value={location} onChange={e => setLocation(e.target.value)} />
              <input className="bg-[#181A20] rounded p-2 text-white flex-1" placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
              <button className="bg-[#1DE782] text-black font-semibold rounded px-4" onClick={handleFindRoute}>Get Directions</button>
            </div>
          </div>
          {/* Trip Info */}
          <div className="w-96 flex flex-col gap-4">
            <div className="bg-[#181A20] rounded-xl p-4 mb-2">
              <div className="font-semibold mb-1">Trip Info</div>
              <div className="text-xs mb-1">Started from: <b>{tripInfo.startedFrom}</b></div>
              <div className="text-xs mb-1">Time: {tripInfo.time}</div>
            </div>
            {trips.map((trip:any, i:number) => (
              <div key={i} className="bg-[#181A20] rounded-xl p-4 mb-2">
                <div className="font-semibold mb-1">{trip.name}</div>
                <div className="text-xs mb-1">Charging Speed: {trip.chargingSpeed}</div>
                <div className="text-xs mb-1">Chargers: {trip.chargers}</div>
                <div className="text-xs mb-1">Parking: {trip.parking}</div>
                <div className="text-xs mb-1">Cost: {trip.cost}</div>
                <div className="text-xs mb-1">Method: {trip.method}</div>
              </div>
            ))}
            <button className="bg-[#1DE782] text-black font-semibold rounded py-2 mt-2">Upload</button>
          </div>
        </div>
      </main>
    </div>
  );
} 