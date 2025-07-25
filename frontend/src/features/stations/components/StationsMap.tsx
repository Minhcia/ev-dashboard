import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 21.028511,
  lng: 105.804817
};

export default function StationsMap({ stations }: { stations: Array<{ name: string, lat?: number, lng?: number }> }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {stations.filter(s => s.lat && s.lng).map((station, i) => (
          <Marker key={i} position={{ lat: station.lat!, lng: station.lng! }} label={station.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
} 