import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 21.028511,
  lng: 105.804817
};

export default function TripsMap({ trips, origin, destination }: {
  trips: Array<{ name: string, lat?: number, lng?: number }>;
  origin?: google.maps.LatLngLiteral | null;
  destination?: google.maps.LatLngLiteral | null;
}) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (origin && destination) {
      setDirections(null);
    }
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {trips.filter(t => t.lat && t.lng).map((trip, i) => (
          <Marker key={i} position={{ lat: trip.lat!, lng: trip.lng! }} label={trip.name} />
        ))}
        {origin && destination && !directions && (
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={(res: any) => {
              if (res && res.status === "OK") setDirections(res);
            }}
          />
        )}
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </LoadScript>
  );
} 