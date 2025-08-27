// Simulated Billing & Usage services
export const fetchRevenueSummary = async () => ({
  total: 127500,
  monthly: [
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 26000 },
    { month: "Jun", revenue: 31000 },
    { month: "Jul", revenue: 32500 },
  ],
});

export const fetchTopUsers = async () => [
  { id: 1, name: "Alice Corp", plan: "Postpaid", data: 520, amount: 8200 },
  { id: 2, name: "Bob LLC", plan: "Prepaid", data: 410, amount: 6400 },
  { id: 3, name: "Cyan Inc", plan: "Postpaid", data: 395, amount: 6100 },
  { id: 4, name: "Delta Ltd", plan: "Prepaid", data: 360, amount: 5900 },
  { id: 5, name: "Echo PLC", plan: "Postpaid", data: 340, amount: 5750 },
];

export const fetchPlanSplit = async () => ({
  prepaid: 68000,
  postpaid: 42000,
});

export const fetchUsageTrends = async () => [
  { month: "Mar", prepaid: 2400, postpaid: 1400 },
  { month: "Apr", prepaid: 3100, postpaid: 1600 },
  { month: "May", prepaid: 3600, postpaid: 2100 },
  { month: "Jun", prepaid: 3900, postpaid: 2300 },
  { month: "Jul", prepaid: 4200, postpaid: 2500 },
];
