// Fake API for stations
export async function fetchStationsData() {
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
    stations: [
      {
        name: "Tesla Station",
        type: "DC",
        price: 0.6,
        slot: 6,
        miles: 1.5,
        icon: "⚡",
      },
      {
        name: "Super Charger",
        type: "DC",
        price: 1.2,
        slot: 7,
        miles: 3.0,
        icon: "⚡",
      },
      {
        name: "Shell Station",
        type: "DC",
        price: 1.8,
        slot: 8,
        miles: 4.5,
        icon: "⚡",
      },
    ],
    vehicle: {
      image: "/car-tesla.png",
      name: "Tesla",
      battery: 80,
      range: 340,
      temp: 75.2,
      status: "Good",
      timeLeft: "4:56 h",
      model: "Tesla X",
      activityTime: "1:24 h",
      nearbyStation: "Tesla Station",
      nearbyMiles: 1.5,
    },
  };
} 