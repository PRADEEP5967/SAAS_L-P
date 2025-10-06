import { ChartData, GeoLocation, MetricCard } from "@/types/dashboard";

export const chartData: Record<string, ChartData> = {
  revenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Revenue",
      data: [3000, 4500, 4000, 5500, 5000, 6500],
      borderColor: "rgb(99, 102, 241)",
      tension: 0.4
    }]
  },
  users: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Active Users",
      data: [1200, 1900, 2100, 2400, 2800, 3100],
      borderColor: "rgb(34, 197, 94)",
      tension: 0.4
    }]
  }
};

export const metrics: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$126,430",
    change: "+14.5%",
    description: "vs. last month"
  },
  {
    title: "Active Users",
    value: "2,340",
    change: "+5.25%",
    description: "vs. last month"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+2.3%",
    description: "vs. last month"
  },
  {
    title: "Avg. Session Duration",
    value: "2m 56s",
    change: "+1.2%",
    description: "vs. last month"
  }
];

export const geoData: { users: GeoLocation[] } = {
  users: [
    { location: "New York", coordinates: [-74.006, 40.7128], users: 1200 },
    { location: "London", coordinates: [-0.1276, 51.5074], users: 980 },
    { location: "Tokyo", coordinates: [139.6917, 35.6895], users: 850 },
    { location: "Singapore", coordinates: [103.8198, 1.3521], users: 720 },
    { location: "Sydney", coordinates: [151.2093, -33.8688], users: 650 }
  ]
};