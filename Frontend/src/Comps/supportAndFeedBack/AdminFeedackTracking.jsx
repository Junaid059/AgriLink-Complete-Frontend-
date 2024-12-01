import { ChevronDown, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';

const dummyFeedbacks = [
  {
    _id: '1',
    content: 'The website is not mobile responsive',
    category: 'Website',
    userId: { _id: 'user1', name: 'John Doe' },
    status: 'Pending',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    _id: '2',
    content: 'Customer support was very helpful',
    category: 'Customer Support',
    userId: { _id: 'user2', name: 'Jane Smith' },
    status: 'Resolved',
    createdAt: '2024-03-02T11:30:00Z',
  },
  {
    _id: '3',
    content: 'Product quality needs improvement',
    category: 'Product',
    userId: { _id: 'user3', name: 'Mike Johnson' },
    status: 'In Progress',
    createdAt: '2024-03-03T09:15:00Z',
  },
  {
    _id: '4',
    content: 'Delivery service was delayed',
    category: 'Service',
    userId: { _id: 'user4', name: 'Sarah Williams' },
    status: 'Pending',
    createdAt: '2024-03-04T14:20:00Z',
  },
];

const categories = ['Product', 'Service', 'Website', 'Customer Support'];

const AdminFeedbackTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Resolved: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredFeedbacks = dummyFeedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.userId.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || feedback.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search feedbacks..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full md:w-48 px-4 py-2 text-left border rounded-lg bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Filter size={18} className="mr-2 text-gray-500" />
                      <span>{selectedCategory || 'All Categories'}</span>
                    </div>
                    <ChevronDown size={18} className="text-gray-500" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      <div
                        className="py-1 cursor-pointer hover:bg-gray-100 px-4"
                        onClick={() => {
                          setSelectedCategory('');
                          setIsDropdownOpen(false);
                        }}
                      >
                        All Categories
                      </div>
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="py-1 cursor-pointer hover:bg-gray-100 px-4"
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feedback
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFeedbacks.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {feedback.userId.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        {feedback.content}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                          {feedback.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            feedback.status
                          )}`}
                        >
                          {feedback.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>{' '}
    </div>
  );
};

export default AdminFeedbackTracking;
