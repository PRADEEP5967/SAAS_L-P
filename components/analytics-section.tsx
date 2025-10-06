"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChartComponent } from './ui/charts/chart';
import { Card } from './ui/card';
import { Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
  }
};

const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30, 45, 57, 52, 65, 75],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const mockMetrics = [
  { label: 'Total Users', value: '10,243', growth: '+12.5%' },
  { label: 'Active Users', value: '8,546', growth: '+23.1%' },
  { label: 'Revenue', value: '$125,430', growth: '+18.7%' }
];

export function AnalyticsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Real-time Analytics</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your business performance with our comprehensive analytics dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockMetrics.map((metric, index) => (
            <div
              key={metric.label}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              data-aos-duration="1000"
            >
              <Card className="p-6">
                <h3 className="text-gray-500 text-sm">{metric.label}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <span className="text-green-500 text-sm">{metric.growth}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="1000"
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="h-[400px]">
            <ChartComponent 
              data={mockChartData}
              options={{
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Monthly Revenue'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}