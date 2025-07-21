// Fake API for dashboard
export async function fetchDashboardData() {
  // Giả lập delay API
  await new Promise((res) => setTimeout(res, 500));

  // Dữ liệu phần trăm cho các loại charge
  const labelsData = [
    { label: "EV Hub", value: 31, color: "#1DE782" },
    { label: "Work", value: 29, color: "#FACC15" },
    { label: "Home", value: 17, color: "#1DE782" },
    { label: "Sell back", value: 13, color: "#A78BFA" },
    { label: "Other", value: 10, color: "#9CA3AF" },
  ];
  const chart = labelsData.flatMap((item) =>
    Array(Math.round(item.value / 100 * 16)).fill(40 + Math.random() * 40)
  );

  return {
    user: {
      name: "John Doe",
      cars: [
        {
          name: "Tesla Model X",
          battery: 58,
          miles: 260,
          image: "https://www.supercars.net/blog/wp-content/uploads/2017/11/Screen_Shot_2017_11_16_at_11.54.38_PM.jpg",
          stats: {
            evCars: { time: "5:21 h", battery: 88, reserve: 428, remain: "3:31 h" },
            gasSavings: { saved: 1716, private: 259, co2: 39, spent: 253 },
            charge: {
              spent: 87,
              charged: 324,
              time: 52,
              stations: 43,
              parking: 11,
              cycles: 651,
              chart,
              labels: labelsData,
            },
          },
        },
        {
          name: "Nissan Leaf",
          battery: 18,
          miles: 45,
          image: "https://hips.hearstapps.com/hmg-prod/images/2025-nissan-leaf-121-6690462ff1899.jpg?crop=1xw:1xh;center,top&resize=980:*",
          stats: {
            evCars: { time: "2:10 h", battery: 18, reserve: 52, remain: "1:10 h" },
            gasSavings: { saved: 800, private: 120, co2: 15, spent: 120 },
            charge: {
              spent: 40,
              charged: 120,
              time: 20,
              stations: 12,
              parking: 4,
              cycles: 200,
              chart,
              labels: labelsData,
            },
          },
        },
      ],
    },
    stations: [
      {
        name: "Tesla Station",
        address: "1780 N Beale Rd, Marysville",
        ports: 10,
        types: ["Tesla (AC/DC) 100kW", "Nissan (DC) 60kW"],
      },
      {
        name: "Super Charger",
        address: "123 Main St, City",
        ports: 8,
        types: ["Tesla (AC/DC) 150kW"],
      },
    ],
  };
} 