import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DataPoint {
  year: string;
  value: number;
}

interface LineChartProps {
  historicalData: DataPoint[];
  projectedData: DataPoint[];
  colors: {
    historical: string;
    projected: string;
    grid: string;
  };
}

export const LineChart: React.FC<LineChartProps> = ({ 
  historicalData, 
  projectedData,
  colors
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const allYears = [
      ...historicalData.map(d => d.year),
      ...projectedData.map(d => d.year)
    ];

    const allValues = [
      ...historicalData.map(d => d.value),
      ...projectedData.map(d => d.value)
    ];

    const maxValue = Math.max(...allValues) * 1.2;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: allYears,
        datasets: [
          {
            label: 'Historical',
            data: [...historicalData.map(d => d.value), ...Array(projectedData.length).fill(null)],
            borderColor: colors.historical,
            backgroundColor: colors.historical,
            tension: 0.3,
            pointRadius: 3,
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Projected',
            data: [...Array(historicalData.length).fill(null), ...projectedData.map(d => d.value)],
            borderColor: colors.projected,
            backgroundColor: colors.projected,
            borderDash: [5, 5],
            tension: 0.3,
            pointRadius: 3,
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 8
              }
            }
          },
          y: {
            display: true,
            suggestedMax: maxValue,
            beginAtZero: true,
            grid: {
              color: colors.grid
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 8
              },
              callback: function(value) {
                return value.toString().length > 4 ? 
                  value.toString().slice(0, 4) + '...' : 
                  value;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#111827',
            bodyColor: '#111827',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 6,
            boxPadding: 3,
            usePointStyle: true,
            caretSize: 5,
            titleFont: {
              size: 10
            },
            bodyFont: {
              size: 10
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [historicalData, projectedData, colors]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};
