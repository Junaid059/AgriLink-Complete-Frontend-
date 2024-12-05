// Modal.jsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Modal = ({ isOpen, onClose, applicationId }) => {
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !applicationId) return;

    // Fetch subsidy application by ID when modal is opened
    const fetchApplication = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/subsidyapplications/${applicationId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch application');
        }
        const data = await response.json();
        setApplication(data);
      } catch (err) {
        setError('Error loading application details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [isOpen, applicationId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Application Details</h2>
          <Button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white">
            Close
          </Button>
        </div>

        {isLoading ? (
          <p className="text-gray-700">Loading application details...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : application ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Farmer Details</h3>
              <p><strong>Farm Details:</strong> {application.farmer?.farmDetails?.location || 'Not available'}</p>
              <p><strong>Farm Size:</strong> {application.farmer?.farmDetails?.size || 'Not available'}</p>
              <p><strong>Crop Type:</strong> {application.farmer?.farmDetails?.cropType || 'Not available'}</p>
              <p><strong>Credit Score:</strong> {application.farmer?.creditScore?.score || 'Not available'} ({application.farmer?.creditScore?.rating || 'Not available'})</p>
              <p><strong>Bank Name:</strong> {application.farmer?.bankDetails?.bankName || 'Not available'}</p>
              <p><strong>Account Number:</strong> {application.farmer?.bankDetails?.accountNumber || 'Not available'}</p>
              <p><strong>Account Holder:</strong> {application.farmer?.bankDetails?.accountHolder || 'Not available'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Subsidy Details</h3>
              <p><strong>Title:</strong> {application.subsidy?.title || 'Not available'}</p>
              <p><strong>Category:</strong> {application.subsidy?.category || 'Not available'}</p>
              <p><strong>Region:</strong> {application.subsidy?.region || 'Not available'}</p>
              <p><strong>Amount:</strong> ${application.subsidy?.amount || 'Not available'}</p>
              <p><strong>Description:</strong> {application.subsidy?.description || 'Not available'}</p>
            </div>

            {/* <div>
              <h3 className="text-lg font-semibold">Supporting Documents</h3>
              {application.supportingDocuments?.length > 0 ? (
                <ul className="list-disc pl-5">
                  {application.supportingDocuments.map((doc) => (
                    <li key={doc._id}>
                      <a
                        href={doc.fileData}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.metadata || 'Document'}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No supporting documents available.</p>
              )}
            </div> */}
          </div>
        ) : (
          <p className="text-red-600">Application not found.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
