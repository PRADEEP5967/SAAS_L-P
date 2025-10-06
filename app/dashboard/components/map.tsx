"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as d3 from "d3";

const userData = [
  { city: "New York", coords: [-74.006, 40.7128], users: 2340 },
  { city: "London", coords: [-0.1276, 51.5074], users: 1893 },
  { city: "Tokyo", coords: [139.6917, 35.6895], users: 1657 },
  { city: "Singapore", coords: [103.8198, 1.3521], users: 982 },
  { city: "Sydney", coords: [151.2093, -33.8688], users: 785 },
];

export function DashboardMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height].join(" "))
      .attr("width", "100%")
      .attr("height", "100%");

    // Create a simple background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#1a1a1a");

    // Create points for user locations
    const projection = d3.geoMercator()
      .scale(120)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    // Add user locations
    svg.selectAll("circle")
      .data(userData)
      .join("circle")
      .attr("cx", d => {
        const [x] = projection(d.coords as [number, number]) || [0];
        return x;
      })
      .attr("cy", d => {
        const [, y] = projection(d.coords as [number, number]) || [0, 0];
        return y;
      })
      .attr("r", d => Math.sqrt(d.users) / 20)
      .attr("fill", "#6366f1")
      .attr("opacity", 0.6)
      .append("title")
      .text(d => `${d.city}: ${d.users} users`);

    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Global User Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <svg ref={svgRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
}