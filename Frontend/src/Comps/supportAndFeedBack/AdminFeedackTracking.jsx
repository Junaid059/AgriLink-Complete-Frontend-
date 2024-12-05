import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, Filter, Search, Trash2 } from 'lucide-react';
import Footer from '../Footer';
import Header from '../Header';

const categories = ['product', 'service', 'website', 'customer Support'];

const AdminFeedbackTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/api/user/track-feedback');
        setAllFeedbacks(response.data);
        setFilteredFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete-feedback/${id}`);
      // Update both feedback states to remove the deleted item
      const updatedFeedbacks = allFeedbacks.filter(feedback => feedback._id !== id);
      setAllFeedbacks(updatedFeedbacks);
      setFilteredFeedbacks(filteredFeedbacks.filter(feedback => feedback._id !== id));
      setDeleteId(null); // Close the confirmation dialog
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  useEffect(() => {
    const filtered = allFeedbacks.filter(feedback => {
      const matchesSearch = 
        feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        !selectedCategory || 
        feedback.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredFeedbacks(filtered);
  }, [searchQuery, selectedCategory, allFeedbacks]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>

              <div className="flex flex-col md:flex-row gap-4">
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

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFeedbacks.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {feedback.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        {feedback.content}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                          {feedback.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deleteId === feedback._id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Are you sure?</span>
                            <button 
                              onClick={() => handleDelete(feedback._id)}
                              className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                            >
                              Yes
                            </button>
                            <button 
                              onClick={() => setDeleteId(null)}
                              className="text-gray-600 hover:text-gray-800 px-2 py-1 text-sm"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteId(feedback._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminFeedbackTracking;