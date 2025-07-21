import React from "react";

export default function CarImage({ carName, image }: { carName: string, image?: string }) {
  const src = image || (carName.includes("Tesla") ? "/car-tesla.png" : "/car-nissan.png");
  return (
    <div className="flex justify-center my-8">
      <img
        src={src}
        alt={carName}
        className="w-full max-w-3xl h-80 object-contain rounded-2xl shadow-2xl bg-[#23262F] p-8"
      />
    </div>
  );
} 