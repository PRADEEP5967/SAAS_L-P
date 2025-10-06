import { DashboardMetrics, MetricsFilter } from "@/lib/types/dashboard";

type ExportFormat = 'xlsx' | 'csv' | 'json' | 'pdf';

export async function exportMetrics(
  metrics: DashboardMetrics,
  filter: MetricsFilter,
  format: ExportFormat = 'xlsx'
): Promise<Blob> {
  const endpoint = `/api/metrics/export?period=${filter.period}&type=${filter.type}&format=${format}`;
  
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to export metrics');
  }
  
  let contentType: string;
  switch (format) {
    case 'xlsx':
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'csv':
      contentType = 'text/csv';
      break;
    case 'json':
      contentType = 'application/json';
      break;
    case 'pdf':
      contentType = 'application/pdf';
      break;
    default:
      throw new Error('Unsupported format');
  }
  
  // Add content type validation
  const actualContentType = response.headers.get('content-type');
  if (!actualContentType?.includes(contentType)) {
    throw new Error(`Invalid content type: ${actualContentType}`);
  }
  
  return response.blob();
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  
  document.body.appendChild(a);
  a.click();
  
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function getExportFilename(filter: MetricsFilter, format: ExportFormat): string {
  const date = new Date().toISOString().split('T')[0];
  const metric = filter.type;
  const period = filter.period;
  
  return `metrics_${metric}_${period}_${date}.${format}`;
}