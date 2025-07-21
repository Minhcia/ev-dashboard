// Fake API for account
export async function fetchAccountData() {
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
    offers: [
      "Cyber Monday", "Green Week", "For Nissan", "Green Month", "For Tesla", "Do you want to see more ?"
    ],
    plans: [
      {
        name: "Pay As You Go",
        prices: [0.37, 0.47, 0.57],
        sessionFee: 0.99,
        reservation: 2.99,
        rate: 0.00,
      },
      {
        name: "EV Hub Basic",
        prices: [0.32, 0.42, 0.52],
        sessionFee: 0.00,
        reservation: 0.00,
        rate: 0.99,
      },
      {
        name: "EV Hub Plus",
        prices: [0.27, 0.37, 0.47],
        sessionFee: 0.00,
        reservation: 0.00,
        rate: 6.99,
      },
      {
        name: "EV Hub Pro",
        prices: [0.22, 0.32, 0.42],
        sessionFee: 0.00,
        reservation: 0.00,
        rate: 12.99,
      },
    ],
  };
} 