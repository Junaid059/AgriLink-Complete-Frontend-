//SusidyRegulations.jsx

import React, { useState, useEffect } from 'react';
import SearchSubsidies from './SearchSubsidies';
import SearchRegulations from './SearchRegulations';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Notifications from './Notifications'; 
import { BellIcon } from '@heroicons/react/20/solid'; 


import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Footer from '../Footer';
import Modal from './Modal';



function SubsidyRegulations() {
  const [isModalOpen, setIsModalOpen] = useState(false);//for subsidy applicaton details modal
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const handleButtonClick = (applicationId) => {
    setSelectedApplicationId(applicationId); 
    setIsModalOpen(true); 
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplicationId(null); 
  };

  const [activeTab, setActiveTab] = useState('subsidies');
  const [expanded, setExpanded] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cnicFile, setCnicFile] = useState(null); // State to hold CNIC file
  const [landFile, setLandFile] = useState(null); // State to hold land ownership file
  const [showBankDetailsPopup, setShowBankDetailsPopup] = useState(false); // Tracks the bank details modal state
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    bankName: '',
    accountHolder: '',
  });
  const [selectedSubsidyId, setSelectedSubsidyId] = useState("");
  const [subsidies, setSubsidies] = useState([]);
  const [filteredSubsidies, setFilteredSubsidies] = useState([]);
  const [regulations, setRegulations] = useState([]);
  const [filteredRegulations, setFilteredRegulations] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
 
    region: '',
    type: '',
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [applications, setApplications] = useState([]);
  const [bookmarkedRegulations, setBookmarkedRegulations] = useState([]);


  const handleBookmarkToggle = async (regulationId) => {
    const farmerId = '67520e89e097dedca2d7fa57'; // You need to get the current user's farmer ID
  
    if (bookmarkedRegulations.includes(regulationId)) {
      // Remove bookmark
      setBookmarkedRegulations(bookmarkedRegulations.filter(id => id !== regulationId));
      await removeBookmark(regulationId, farmerId); // Call backend to remove bookmark
    } else {
      // Add bookmark
      setBookmarkedRegulations([...bookmarkedRegulations, regulationId]);
      await addBookmark(regulationId, farmerId); // Call backend to add bookmark
    }
  };
  

  const [showNotifications, setShowNotifications] = useState(false);





  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveBankDetails = async () => {
    if (!bankDetails.accountNumber || !bankDetails.bankName || !bankDetails.accountHolder) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      setLoading(true); 
  
      const response = await fetch(`https://database-microservice-agrilink.onrender.com/farmerProfiles/67520e89e097dedca2d7fa57`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankDetails,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update bank details');
      }
  
      const updatedProfile = await response.json();
      console.log('Bank details updated:', updatedProfile);
      alert('Bank details updated successfully!');
      setShowBankDetailsPopup(false);
    } catch (error) {
      console.error('Error updating bank details:', error);
      alert('Failed to update bank details. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };
  
  const applyFilters = () => {
    const { region, type } = filterOptions;
   
    if (activeTab === 'subsidies') {
      const filtered = subsidies.filter((subsidy) => {
        const matchesRegion = region ? subsidy.region === region : true;
      //  console.log("region",region," subsidy.region   ",subsidy.region,matchesRegion)
        
        return matchesRegion ;
      });
      setFilteredSubsidies(filtered);
    } else if (activeTab === 'regulations') {
      const filtered = regulations.filter((regulation) => {
        const matchesType = type ? regulation.type === type : true;
        return matchesType ;
      });
      setFilteredRegulations(filtered);
    }
  };
  


  // Function to add a bookmark
const addBookmark = async (regulationId, farmerId) => {
  try {
    const response = await fetch(`https://database-microservice-agrilink.onrender.com/regulations/${regulationId}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        farmerId, // Farmer's ID to be added as a bookmark
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add bookmark');
    }

    const updatedRegulation = await response.json();
    // Handle the updated regulation object (you can update the state or UI accordingly)
    console.log(updatedRegulation);
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
};

// Function to remove a bookmark
const removeBookmark = async (regulationId, farmerId) => {
  try {
    const response = await fetch(`https://database-microservice-agrilink.onrender.com/regulations/${regulationId}/bookmarks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        farmerId, // Farmer's ID to be removed as a bookmark
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove bookmark');
    }

    const updatedRegulation = await response.json();
    // Handle the updated regulation object (you can update the state or UI accordingly)
    console.log(updatedRegulation);
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

  

 // Event handlers for dropdowns 
const handleCategoryChange = (value) => {
  setFilterOptions((prev) => ({ ...prev, category: value }));
};

const handleRegionChange = (value) => {
  setFilterOptions((prev) => ({ ...prev, region: value }));
};

const handleTypeChange = (value) => {
  setFilterOptions((prev) => ({ ...prev, type: value }));
};


  // Function to handle file selection for CNIC
  const handleCnicFileChange = (event) => {
    setCnicFile(event.target.files[0]);
  };

  // Function to handle file selection for Land Ownership
  const handleLandFileChange = (event) => {
    setLandFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'subsidies') {
          const response = await fetch('http://localhost:3000/api/subsidies');
          const data = await response.json();
          setSubsidies(data);
          setFilteredSubsidies(data);
        } else {
          const response = await fetch('http://localhost:3000/api/regulations');
          const data = await response.json();
          setRegulations(data);
          setFilteredRegulations(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      applyFilters();
    };

    fetchData();
  }, [activeTab,applyFilters]);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/subsidyapplications'); 
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(data);
        console.log("applications",applications)
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load subsidy applications');
      } finally {
        setLoading(false);
      }
   };

   fetchApplications();
  }, []);

  // Log applications when they change
useEffect(() => {
  if (applications.length > 0) {
    console.log("applications", applications);
  }
}, [applications]);
 

const handleSubmitApplication = async () => {
  console.log("Selected Subsidy ID:", selectedSubsidyId);
  if (!cnicFile || !landFile) {
    alert("Please upload both CNIC and land ownership documents.");
    return;
  }

  const uploadFile = async (file, uploadedBy) => {
    const formData = new FormData();
    formData.append("file", file); // Matches multer's field name
    formData.append("uploadedBy", uploadedBy);

    const response = await fetch('http://localhost:3000/api/upload/add', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.error || `Failed to upload document: ${file.name}`);
    }

    const data = await response.json();
    console.log(`Document uploaded: ${file.name}`, data);
    return data.documentId; // Return the document ID
};

  try {
    setLoading(true);

    // Upload CNIC and land documents
    const uploadedBy = "67520df8e097dedca2d7fa51"; // Replace with the actual user ID
    const cnicDocId = await uploadFile(cnicFile, uploadedBy);
    const landDocId = await uploadFile(landFile, uploadedBy);

    console.log("CNIC Document ID:", cnicDocId);
    console.log("Land Document ID:", landDocId);

    // Create subsidy application with dynamic subsidyId
    const applicationResponse = await fetch('http://localhost:3000/api/subsidyapplications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer: "67520e89e097dedca2d7fa57", 
        subsidy: selectedSubsidyId,
        status: "pending",
        supportingDocuments: [cnicDocId, landDocId],
        user:"674dd1c19a4dbfe260f137ed",
        
      }),
    });

    if (!applicationResponse.ok) {
      throw new Error('Failed to create subsidy application');
    }

    const applicationData = await applicationResponse.json();
    console.log('Application created:', applicationData);

    alert('Application submitted successfully!');
  } catch (err) {
    console.error(err);
    setError('Failed to submit application');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto py-8 px-4">
        {/* Notifications Button */}
        <div className="absolute top-5 right-10">
            <BellIcon 
            className="w-6 h-6 text-gray-600 cursor-pointer" 
            onClick={toggleNotifications}
          />
        
        </div>

        {/* Notifications Popup */}
        {showNotifications && <Notifications  onClose={toggleNotifications} />}


      <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab('subsidies')}
            className={`${
              activeTab === 'subsidies'
                ? 'bg-green-600 text-white'
                : 'bg-green-400'
            }`}
          >
            Subsidies
          </Button>
          <Button
            onClick={() => setActiveTab('regulations')}
            className={`${
              activeTab === 'regulations'
                ? 'bg-green-600 text-white'
                : 'bg-green-400'
            }`}
          >
            Regulations
          </Button>
        </div>
        {/* Update bank details button */}
        <div className="text-right mt-4 mb-8">
          <Button
            className="bg-green-500 text-white hover:bg-green-800"
            onClick={() => setShowBankDetailsPopup(true)}
          >
            Update Your Bank Details
          </Button>
        </div>
        {/* <div className="text-right mt-4 mb-10">
          <Button
            className="bg-green-500 text-white hover:bg-green-800 w-[190px]"
          >
            Show My BookMarks
          </Button>
        </div> */}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {activeTab === 'subsidies' ? (
            
            <>
           
            <Select
             className=''
              onValueChange={(value) => {
                setFilterOptions((prev) => ({ ...prev, region: value }));
                applyFilters(); 
              }}

              >
              <SelectTrigger className="w-full">Select Region</SelectTrigger>
              <SelectContent>
                <SelectItem value="north">Khyber Pakhtunkhwa</SelectItem>
                <SelectItem value="south">Punjab</SelectItem>
                <SelectItem value="central">Sindh</SelectItem>
              </SelectContent>
            </Select>
            </>
          ) : (
            <Select
              onValueChange={(value) => {
                setFilterOptions((prev) => ({ ...prev, type: value }));
                applyFilters(); 
              }}
            >
              <SelectTrigger className="w-full">Select Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="safety">safety</SelectItem>
                <SelectItem value=" guideline"> guideline</SelectItem>
                <SelectItem value=" regulation"> regulation</SelectItem>
            
              </SelectContent>
            </Select>
          
          )}

        </div>

      
        {activeTab === 'subsidies' ? (
          <>
            <SearchSubsidies subsidies={subsidies} onSearch={setFilteredSubsidies} />
            {filteredSubsidies.map((subsidy, index) => {
            const matchingApplication = applications.find(
              (app) => app.subsidy._id === subsidy._id
            );

            return (
              <Card key={index} className="p-6 mb-20 bg-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{subsidy.title}</h2>
                {/* <h2 className="text-xl font-bold text-gray-800 mb-2">{subsidy._id}</h2> */}
                <p className="text-gray-600 mb-4">{expanded === index ? subsidy.fullDescription : subsidy.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="text-lg">Application Deadline: {subsidy.deadline}</p>
                  <p className="text-lg">Amount: {subsidy.amount}</p>
                  <p className="text-lg">Category: {subsidy.category}</p>
                  <p className="text-lg">Region: {subsidy.region}</p>
                </div>
                <div className="mt-4">
                {matchingApplication ? (
                  <Button
                    className={`${
                      matchingApplication.status === 'rejected'
                        ? 'bg-red-600 hover:bg-red-700'
                        : matchingApplication.status === 'approved'
                        ? 'bg-green-600 hover:bg-green-700'
                        : matchingApplication.status === 'pending'
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : ''
                    }`}
                    onClick={() => handleButtonClick(matchingApplication._id)}
                 >
                    {matchingApplication.status}
                    
                  </Button>

                  ) : (
                    <>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          setShowFormIndex(showFormIndex === index ? null : index);
                          setSelectedSubsidyId(subsidy._id);
                        }}
                      >
                        {showFormIndex === index ? 'Close' : 'Apply'}
                      </Button>
                      {showFormIndex === index && (
                        <Button
                          onClick={() => {
                            setShowFormIndex(showFormIndex === index ? null : index);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled={loading}
                        >
                          {loading ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </Card>
            );
          })}

          </>
        ) : (
          <>
            <SearchRegulations regulations={regulations} onSearch={setFilteredRegulations} />
            {filteredRegulations.map((regulation, index) => (
             <Card key={index} className="p-6 mb-20 bg-gray-100">
              <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{regulation.title}</h2>
               <button
                onClick={() => handleBookmarkToggle(regulation._id)} // Trigger the bookmark toggle
                className="text-gray-600"
               >
               {bookmarkedRegulations.includes(regulation._id) ? (
               <FaBookmark className="text-yellow-500" /> // Filled bookmark icon for bookmarked regulations
              ) : (
               <FaRegBookmark className="text-gray-500" /> // Outline bookmark icon for non-bookmarked regulations
              )}
              </button>
               </div>
             <p className="text-gray-600 mb-4">{expanded === index ? regulation.fullDescription : regulation.description}</p>
             <div className="space-y-2 text-sm text-gray-500">
             <p className="text-lg">Effective Date: {regulation.effectiveDate}</p>
             <p className="text-lg">Category: {regulation.category}</p>
             <p className="text-lg">Type: {regulation.type}</p>
              </div>
            </Card>
))}
          </>
        )}

        
     
        {/* Bank Details Modal */}
        {showBankDetailsPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Update Bank Details
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <Input
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    className="w-full"
                    placeholder="Enter your account number"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <Input
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    className="w-full"
                    placeholder="Enter your bank name"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Account Holder Name
                  </label>
                  <Input
                    type="text"
                    name="accountHolder"
                    value={bankDetails.accountHolder}
                    onChange={handleBankDetailsChange}
                    className="w-full"
                    placeholder="Enter account holder name"
                  />
                </div>
                <Button
                  onClick={handleSaveBankDetails}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Save Details
                </Button>
              </form>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowBankDetailsPopup(false)} // Close modal on click
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        

        <div className="flex justify-center items-center min-h-screen">
          
          {/* Subsidy Application Form Modal */}
            {showFormIndex !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-center">Apply for Subsidy</h3>
                  <form className="space-y-4">
                    <Select>
                      <SelectTrigger className="w-full">Select Subsidy Type</SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic_farming">Organic Farming</SelectItem>
                        <SelectItem value="irrigation_system">Irrigation System</SelectItem>
                      </SelectContent>
                    </Select>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Upload CNIC Copy
                      </label>
                      <Input
                        type="file"
                        className="w-full"
                        onChange={handleCnicFileChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Upload Land Ownership Docs
                      </label>
                      <Input
                        type="file"
                        className="w-full"
                        onChange={handleLandFileChange}
                      />
                    </div>
                    <Button
                      onClick={handleSubmitApplication}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                    {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                  </form>
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    onClick={() => setShowFormIndex(null)} 
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}

            <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            applicationId={selectedApplicationId} 
          />



        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SubsidyRegulations;
