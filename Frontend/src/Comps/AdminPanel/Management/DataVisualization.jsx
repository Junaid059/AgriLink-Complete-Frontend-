import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Seed Usage',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Pesticide Usage',
      data: [28, 48, 40, 19, 86, 27],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

const barChartData = {
  labels: ['Wheat', 'Corn', 'Soybean', 'Rice', 'Barley'],
  datasets: [
    {
      label: 'Seed Usage (kg)',
      data: [300, 450, 200, 150, 100],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Pesticide Usage (L)',
      data: [50, 70, 30, 40, 20],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const pieChartData = {
  labels: ['Compliant', 'Non-compliant'],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
    },
  ],
};

function DataVisualizations() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading charts...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={lineChartData} options={{ responsive: true }} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Seed and Pesticide Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={barChartData} options={{ responsive: true }} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </CardContent>
      </Card>
    </div>
  );
}

export default DataVisualizations;
