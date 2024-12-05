//SusidyRegulations.jsx

import React, { useState, useEffect } from 'react';
import SearchSubsidies from './SearchSubsidies';
import SearchRegulations from './SearchRegulations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Footer from '../Footer';

function SubsidyRegulations() {
  const [activeTab, setActiveTab] = useState('subsidies');
  const [expanded, setExpanded] = useState(null);
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cnicFile, setCnicFile] = useState(null);
  const [landFile, setLandFile] = useState(null); 
  const [showBankDetailsPopup, setShowBankDetailsPopup] = useState(false); 
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
      setLoading(true); // Optional: Show a loading indicator
  
      const response = await fetch(`https://database-microservice-agrilink.onrender.com/farmerProfiles/63f5f4b5b02fda9876543210`, { // Replace `userId` with the actual user's ID
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
      setShowBankDetailsPopup(false); // Close the modal
    } catch (error) {
      console.error('Error updating bank details:', error);
      alert('Failed to update bank details. Please try again later.');
    } finally {
      setLoading(false); // Hide the loading indicator
    }
  };
  
  const applyFilters = () => {
    const { region, type } = filterOptions;
   
    if (activeTab === 'subsidies') {
      const filtered = subsidies.filter((subsidy) => {
        const matchesRegion = region ? subsidy.region === region : true;
        console.log("region",region," subsidy.region   ",subsidy.region,matchesRegion)
        
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
          const response = await fetch('https://database-microservice-agrilink.onrender.com/subsidies');
          const data = await response.json();
          setSubsidies(data);
          setFilteredSubsidies(data);
        } else {
          const response = await fetch('https://database-microservice-agrilink.onrender.com/regulations');
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
        const response = await fetch('http://localhost:3000/api/subsidyApplications'); 
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
 

  // Function to handle the subsidy application submission
  const handleSubmitApplication = async () => {
    console.log("Selected Subsidy ID:", selectedSubsidyId);
    if (!cnicFile || !landFile) {
      alert("Please upload both CNIC and land ownership documents.");
      return;
    }
  
    const formData = new FormData();
    formData.append("cnicDocuments", cnicFile);
    formData.append("landDocuments", landFile);
    formData.append("uploadedBy", "63f5f4b5b02fda1234567891"); 
  
    try {
      setLoading(true);
  
      // Upload documents
      const uploadResponse = await fetch('http://localhost:3000/api/upload/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload documents');
      }
  
      const uploadData = await uploadResponse.json();
      console.log('Documents uploaded:', uploadData);
  
      const cnicDocId = uploadData.cnicDocuments[0]._id;
      const landDocId = uploadData.landDocuments[0]._id;
      
      // Create subsidy application with dynamic subsidyId
      const applicationResponse = await fetch('http://localhost:3000/api/subsidyApplications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer: "63f5f4b5b02fda9876543210", 
          subsidy: selectedSubsidyId,
          status: "pending",
          supportingDocuments: [cnicDocId, landDocId],
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
        <div className="text-right mt-4 mb-10">
          <Button
            className="bg-green-500 text-white hover:bg-green-800 w-[190px]"
          >
            Show My BookMarks
          </Button>
        </div>

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

        {/* <Button onClick={applyFilters} className="bg-blue-600 text-white">
          Apply Filters
        </Button> */}


        {activeTab === 'subsidies' ? (
          <>
            <SearchSubsidies subsidies={subsidies} onSearch={setFilteredSubsidies} />
            {filteredSubsidies.map((subsidy, index) => {
            const matchingApplication = applications.find(
              (app) => app.subsidy === subsidy._id
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
                      className="bg-green-600 hover:bg-green-700"
                     // onClick={() => alert("View application details here.")} 
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
                <h2 className="text-xl font-bold text-gray-800 mb-2">{regulation.title}</h2>
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
                    onClick={() => setShowFormIndex(null)} // Close modal on click
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}



        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SubsidyRegulations;
