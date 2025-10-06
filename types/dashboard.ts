export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension?: number;
  }[];
}

export interface GeoLocation {
  location: string;
  coordinates: [number, number];
  users: number;
}

export interface MetricCard {
  title: string;
  value: string;
  change: string;
  description: string;
}