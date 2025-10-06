"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportMetrics, downloadBlob, getExportFilename } from "@/lib/utils/export";
import { DashboardMetrics, MetricsFilter } from "@/lib/types/dashboard";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  metrics: DashboardMetrics;
  filter: MetricsFilter;
  isExporting?: boolean;
}

export function ExportButton({ metrics, filter, isExporting = false }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: 'xlsx' | 'csv' | 'json' | 'pdf') => {
    try {
      setLoading(true);
      const blob = await exportMetrics(metrics, filter, format);
      const filename = getExportFilename(filter, format);
      downloadBlob(blob, filename);
      toast({
        title: "Export Successful",
        description: `Metrics exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export metrics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={loading || isExporting}
        >
          {loading || isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('xlsx')}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')}>
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}