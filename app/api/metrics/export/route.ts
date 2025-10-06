import { NextResponse } from "next/server";
import { MetricPeriod, MetricType } from "@/lib/types/dashboard";
import { getTimeRangeForPeriod } from "@/lib/utils/metrics";
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get("period") as MetricPeriod) || "day";
    const type = (searchParams.get("type") as MetricType) || "users";
    
    // Get time range based on period
    const timeRange = getTimeRangeForPeriod(period);
    
    // Generate export data
    const data = generateExportData(period, type, timeRange);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Metrics');
    
    // Generate buffer
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    // Return response with proper headers
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="metrics-${type}-${period}-${new Date().toISOString()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("[Metrics Export Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "EXPORT_ERROR",
          message: "Failed to export metrics",
          details: error instanceof Error ? { message: error.message } : undefined,
        },
      },
      { status: 500 }
    );
  }
}

function generateExportData(period: MetricPeriod, type: MetricType, timeRange: { start: string; end: string }) {
  // Generate mock data based on period and type
  const dates = generateDateRange(timeRange.start, timeRange.end, period);
  
  return dates.map(date => {
    let value: number;
    switch (type) {
      case "users":
        value = Math.floor(1000 + Math.random() * 500);
        break;
      case "revenue":
        value = Math.floor(50000 + Math.random() * 25000);
        break;
      case "usage":
        value = Math.floor(70 + Math.random() * 30);
        break;
      case "performance":
        value = 98 + Math.random() * 2;
        break;
      default:
        value = 0;
    }
    
    return {
      Date: date.toISOString().split('T')[0],
      Metric: type.charAt(0).toUpperCase() + type.slice(1),
      Value: value,
      Period: period,
    };
  });
}

function generateDateRange(start: string, end: string, period: MetricPeriod) {
  const dates = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    
    switch (period) {
      case "hour":
        current.setHours(current.getHours() + 1);
        break;
      case "day":
        current.setDate(current.getDate() + 1);
        break;
      case "week":
        current.setDate(current.getDate() + 7);
        break;
      case "month":
        current.setMonth(current.getMonth() + 1);
        break;
      case "year":
        current.setFullYear(current.getFullYear() + 1);
        break;
    }
  }
  
  return dates;
}