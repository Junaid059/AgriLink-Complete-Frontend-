import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Header from '../Header';

const FeedbackReport = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        'https://database-microservice-agrilink.onrender.com/feedback/'
      );
      setFeedbacks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getCategoryData = () => {
    const categories = {};
    feedbacks.forEach((feedback) => {
      categories[feedback.category] = (categories[feedback.category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  const getTimelineData = () => {
    const timeline = {};
    feedbacks.forEach((feedback) => {
      const date = new Date(feedback.createdAt).toLocaleDateString();
      timeline[date] = (timeline[date] || 0) + 1;
    });
    return Object.entries(timeline).map(([date, count]) => ({ date, count }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-grow bg-gray-100 py-4">
        <div className="p-6 space-y-0">
          <h1 className="text-2xl font-bold mb-4">Feedback Analytics</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Feedback Timeline</h2>
              <LineChart width={500} height={300} data={getTimelineData()}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">
                Category Distribution
              </h2>
              <PieChart width={500} height={300}>
                <Pie
                  data={getCategoryData()}
                  cx={250}
                  cy={150}
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className="bg-white p-4 rounded-lg shadow col-span-2">
              <h2 className="text-lg font-semibold mb-4">Summary Statistics</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded">
                  <div className="text-2xl font-bold">{feedbacks.length}</div>
                  <div className="text-gray-600">Total Feedbacks</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <div className="text-2xl font-bold">
                    {Object.keys(getCategoryData()).length}
                  </div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded">
                  <div className="text-2xl font-bold">
                    {new Date(
                      Math.max(...feedbacks.map((f) => new Date(f.createdAt)))
                    ).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600">Latest Feedback</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackReport;
