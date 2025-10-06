"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardMetrics } from "@/components/dashboard-metrics";

export default function TestDashboard() {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const runTests = async () => {
    setTestResults([]);
    
    try {
      // Test 1: Basic metrics fetch
      addResult("Testing basic metrics fetch...");
      const response = await fetch('/api/metrics/dashboard');
      const data = await response.json();
      addResult(`✅ Basic metrics fetch: ${data.success ? 'Success' : 'Failed'}`);

      // Test 2: Filtered metrics
      addResult("Testing filtered metrics...");
      const filteredResponse = await fetch('/api/metrics/dashboard?period=week&type=revenue');
      const filteredData = await filteredResponse.json();
      addResult(`✅ Filtered metrics: ${filteredData.success ? 'Success' : 'Failed'}`);

      // Test 3: Metrics export
      addResult("Testing metrics export...");
      const exportResponse = await fetch('/api/metrics/export?period=month&type=users');
      const blob = await exportResponse.blob();
      addResult(`✅ Export functionality: ${blob.size > 0 ? 'Success' : 'Failed'} (${blob.size} bytes)`);

      // Test 4: Health check
      addResult("Testing health check...");
      const healthResponse = await fetch('/api/health');
      const healthData = await healthResponse.json();
      setHealthStatus(healthData);
      addResult(`✅ Health check: ${healthData.success ? 'Success' : 'Failed'}`);

    } catch (error) {
      addResult(`❌ Error during tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Tests</h1>
        <Button onClick={runTests}>Run Tests</Button>
      </div>

      {/* Main Dashboard */}
      <DashboardMetrics />

      {/* Test Results */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        <div className="space-y-2">
          {testResults.map((result, index) => (
            <div key={index} className="text-sm font-mono">{result}</div>
          ))}
        </div>
      </Card>

      {/* Health Status */}
      {healthStatus && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <pre className="text-sm bg-muted p-4 rounded">
            {JSON.stringify(healthStatus, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}