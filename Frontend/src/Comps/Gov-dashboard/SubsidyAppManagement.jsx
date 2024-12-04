'use client';
import React, { useState, useEffect } from 'react';

function SubsidyManagement() {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubsidy, setSelectedSubsidy] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchSubsidies = async () => {
      try {
        const response = await fetch('http://localhost:4000/subsidyApplications');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubsidies(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subsidies:', err); // Log to console
        setError(`Failed to fetch subsidy applications: ${err.message}`); // Set detailed error message
        setLoading(false);
      }
    };
  
    fetchSubsidies();
  }, []);
  
  const handleViewDocument = (document) => {
    console.log ('docc',document)
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };
  const handleViewDetails = (subsidy) => {
    console.log ('sub',subsidy)
    setSelectedSubsidy(subsidy);
    setIsDetailModalOpen(true);
  };

  const handleActionInitiation = (subsidy, action) => {
    setSelectedSubsidy(subsidy);
    setActionType(action);
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      console.log ('iddd is ',selectedSubsidy)
      const newStatus = actionType === 'approve' ? 'approved' : 'rejected';
      const response = await fetch(`https://database-microservice-agrilink.onrender.com/subsidyApplications/${selectedSubsidy._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          ...(actionType === 'reject' && { rejectionReason })
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update subsidy status');
      }

      const updatedSubsidies = subsidies.map(subsidy => 
        subsidy._id === selectedSubsidy._id 
          ? { ...subsidy, status: newStatus } 
          : subsidy
      );

      setSubsidies(updatedSubsidies);
      setIsConfirmationDialogOpen(false);
      setRejectionReason('');
      setSelectedSubsidy(null);
    } catch (err) {
      console.error('Failed to update subsidy status', err);
      alert('Failed to update subsidy status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Subsidy Application Management
      </h2>

      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Application Date</th>
              <th className="p-3 text-left border-b">Farmer</th>
              <th className="p-3 text-left border-b">Subsidy</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subsidies.map((subsidy) => (
              <tr key={subsidy._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  {new Date(subsidy.applicationDate).toLocaleDateString()}
                </td>
                <td className="p-3 border-b">{subsidy.farmer?.user?.username || 'Unknown Farmer'}</td>
                <td className="p-3 border-b">{subsidy.subsidy?.title || 'Unknown Subsidy'}</td>
                <td className="p-3 border-b">{subsidy.status}</td>
                <td className="p-3 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(subsidy)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                    {subsidy.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleActionInitiation(subsidy, 'approve')}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleActionInitiation(subsidy, 'reject')}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedSubsidy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Subsidy Application Details</h3>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">

                  {/* Section for supported documents */}
                  <div className="col-span-2">
                <h4 className="text-lg font-semibold mb-2">Supported Documents</h4>
                {selectedSubsidy.supportingDocuments && selectedSubsidy.supportingDocuments.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedSubsidy.supportingDocuments.map((doc) => (
                      <div 
                        key={doc._id} 
                        className="border rounded p-2 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleViewDocument(doc)}
                      >
                        <span>{doc.metadata.originalName}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No supported documents uploaded</p>
                )}
              </div>


              <div>
                <p><strong>Application Date:</strong> {new Date(selectedSubsidy.applicationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {selectedSubsidy.status}</p>
              </div>
              <div>
                <p><strong>Farmer Location:</strong> {selectedSubsidy.farmer?.farmDetails?.location || 'Unknown'}</p>
                <p><strong>Farm Size:</strong> {selectedSubsidy.farmer?.farmDetails?.size} </p>
              </div>
              <div className="col-span-2">
                <p><strong>Subsidy Title:</strong> {selectedSubsidy.subsidy?.title}</p>
                <p><strong>Subsidy Description:</strong> {selectedSubsidy.subsidy?.description}</p>
              </div>
              <div>
                <p><strong>Bank Name:</strong> {selectedSubsidy.farmer?.bankDetails?.bankName}</p>
                <p><strong>Account Holder:</strong> {selectedSubsidy.farmer?.bankDetails?.accountHolder}</p>
              </div>
              <div>
                <p><strong>Region:</strong> {selectedSubsidy.subsidy?.region}</p>
                <p><strong>Amount:</strong> ${selectedSubsidy.subsidy?.amount}</p>
              </div>
            </div>
          </div>
        </div>
      )}

 {/* Document Viewer Modal */}
 {isDocumentModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Document: {selectedDocument.metadata.originalName}</h3>
              <button 
                onClick={() => setIsDocumentModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            {['jpg', 'png' ].includes(selectedDocument.fileType) ? (
              <img 
                src={selectedDocument.fileUrl} 
                alt={selectedDocument.metadata.originalName} 
                className="max-w-full max-h-[70vh] mx-auto object-contain"
              />
            ) : (
              <iframe 
                src={selectedDocument.fileUrl} 
                className="w-full h-[70vh] border rounded"
                title={selectedDocument.metadata.originalName}
              />
            )}
          
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmationDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
            </h3>
            <p className="mb-4">
              Are you sure you want to {actionType} this subsidy application?
            </p>
            
            {actionType === 'reject' && (
              <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Provide a reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            )}
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsConfirmationDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubsidyManagement;