// Fake API for trips
export async function fetchTripsData() {
  await new Promise((res) => setTimeout(res, 300));
  return {
    cars: [
      {
        name: "Tesla Model X",
        battery: 58,
        miles: 260,
        image: "https://www.supercars.net/blog/wp-content/uploads/2017/11/Screen_Shot_2017_11_16_at_11.54.38_PM.jpg",
      },
      {
        name: "Nissan Leaf",
        battery: 18,
        miles: 45,
        image: "https://hips.hearstapps.com/hmg-prod/images/2025-nissan-leaf-121-6690462ff1899.jpg?crop=1xw:1xh;center,top&resize=980:*",
      },
    ],
    tripInfo: {
      startedFrom: "Portland St.",
      time: "6:12 PM, 11 Aug, 23",
    },
    trips: [
      {
        name: "Tesla Station",
        chargingSpeed: "150-350kW",
        chargers: 4,
        parking: "Free",
        cost: "$0.59/kWh",
        method: "& cash",
      },
      {
        name: "Olsun Station",
        chargingSpeed: "50kW",
        chargers: 6,
        parking: "Free",
        cost: "$0.00/Free",
        method: "Mastercard",
      },
    ],
  };
} 