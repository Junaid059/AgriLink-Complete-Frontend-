

// import React, { useEffect, useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import { Camera, UploadCloud, Tag, CheckCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

// const API_BASE_URL = import.meta.env.REACT_APP_DATASET_API_BASE_URL || "http://localhost:3001";

// function ContributePage() {
//   // States for file upload and labeling process
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [cropName, setCropName] = useState('');
//   const [datasetLabel, setDatasetLabel] = useState('');
//   const [labels, setLabels] = useState({});
//   const [validatedLabels, setValidatedLabels] = useState([]);
//   const [validationData, setValidationData] = useState([]);
//   const userId = "63f5f4b5b02fda9876543210"
//   const handleImageUpload = async () => {
//     for (const file of uploadedFiles) {
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('uploadedBy', userId); // Replace with the actual user ID
//       formData.append('cropName', cropName || 'Unknown');
//       formData.append('label', JSON.stringify(Object.values(labels)));
      
//       try {
//         const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error('Upload failed', error);
//       }
//     }
//   };
  
//   // Get images for labeling
//   const getImagesForLabeling = () => {
//     axios.get(`${API_BASE_URL}/dataset/datasetItem/label`)
//       .then((response) => {
//         console.log(response.data);
//         // Handle the response data
//       })
//       .catch((error) => {
//         console.error('Error fetching data for labeling:', error);
//       });
//   };
  
//   // Get data for validation
//   const getValidationData = () => { 
//     axios.get(`${API_BASE_URL}/dataset/datasetItem/vote`)
//       .then((response) => {
//         console.log(response.data);
//         setValidationData([response.data]);
//             })
//       .catch((error) => {
//         console.error('Error fetching data for validation:', error);
//       });
//   };
  
  
//   // Download dataset
//   const downloadDataset = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/download`, {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `dataset-${Date.now()}.zip`);
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading dataset:', error);
//     }
//   };

//   const upvoteImages = async (labelId, userId, imageId) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/contribute/upvote`, {
//         labelId,
//         userId,
//         imageId,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error upvoting image:', error);
//     }
//   };
  
//   const downvoteImages = async (labelId, userId, imageId) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/contribute/downvote`, {
//         labelId,
//         userId,
//         imageId,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error downvoting image:', error);
//     }
//   };
  
//   const labelImages = async (imageId, label, userId) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/contribute/label-data`, {
//         imageId,
//         label,
//         userId,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error labeling image:', error);
//     }
//   };

//   // Handle file upload with react-dropzone
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => {
//       setUploadedFiles(acceptedFiles);
//     },
//   });

//   // Handle labeling of images
//   const handleLabeling = (file, label) => {
//     setLabels({ ...labels, [file.name]: label });
//   };

//   // Handle validation of labeled images
//   const handleValidation = () => {
//     setValidatedLabels(Object.keys(labels));
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-8 max-w-4xl">
//       <h1 className="text-3xl font-bold text-green-700 flex items-center">
//         <Camera className="mr-3 text-green-600" size={36} />
//         Contribute to Dataset
//       </h1>

//       <Tabs defaultValue="upload" className="space-y-4">
//         <TabsList>
//           <TabsTrigger
//             value="upload"
//             className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
//           >
//             <UploadCloud className="mr-2" size={20} /> Upload Images
//           </TabsTrigger>
//           <TabsTrigger
//             value="label"
//             className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
//           >
//             <Tag className="mr-2" size={20} /> Label Images
//           </TabsTrigger>
//           <TabsTrigger
//             value="validate"
//             className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
//           >
//             <CheckCircle className="mr-2" size={20} /> Validate Labels
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="upload" className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input 
//                 type="text"
//                 placeholder="Optional: Crop Name (e.g., Tomato)"
//                 value={cropName}
//                 onChange={(e) => setCropName(e.target.value)}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-green-300"
//               />
//               <input 
//                 type="text"
//                 placeholder="Optional: Dataset Label"
//                 value={datasetLabel}
//                 onChange={(e) => setDatasetLabel(e.target.value)}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-green-300"
//               />
//             </div>
//             <div
//               {...getRootProps()}
//               className="border-2 border-dashed border-green-300 p-6 text-center 
//                          hover:bg-green-50 transition-colors duration-300 
//                          rounded-lg cursor-pointer"
//             >
//               <input {...getInputProps()} />
//               <p className="text-lg text-gray-600 flex justify-center items-center">
//                 <UploadCloud className="mr-2 text-green-600" size={24} />
//                 Drag & drop images here, or click to select files
//               </p>
//               {uploadedFiles.length > 0 && (
//                 <div className="mt-4">
//                   <h2 className="font-bold text-green-700 mb-2">Uploaded Files:</h2>
//                   <div className="grid grid-cols-3 gap-2">
//                     {uploadedFiles.map((file, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={file.name}
//                           className="h-24 w-full object-cover rounded-md"
//                         />
//                         <p className="text-xs text-center mt-1 truncate">{file.name}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             {uploadedFiles.length > 0 && (
//               <button 
//                 onClick={handleImageUpload}
//                 className="w-full bg-green-600 text-white p-3 rounded-lg 
//                            hover:bg-green-700 transition-colors duration-300 
//                            flex items-center justify-center"
//               >
//                 <UploadCloud className="mr-2" size={20} />
//                 Upload Images
//               </button>
//             )}
//           </div>
//         </TabsContent>

             
//         <TabsContent value="label" className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <div className="space-y-4">
//             {uploadedFiles.length === 0 ? (
//               <p className="text-red-500 text-center">No images uploaded yet.</p>
//             ) : (
//               uploadedFiles.map((file, index) => (
//                 <div 
//                   key={index} 
//                   className="flex items-center space-x-4 p-3 bg-white 
//                              rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={file.name}
//                     className="h-24 w-24 object-cover rounded-md"
//                   />
//                   <div className="flex-grow">
//                   <div className="flex space-x-2">
//   <button
//     onClick={() => labelImages(file.id, 'healthy', userId)}
//     className="bg-green-600 text-white p-2 rounded-lg 
//                hover:bg-green-700 transition-colors duration-300"
//   >
//     Healthy
//   </button>
//   <button
//     onClick={() => labelImages(file.id, 'unhealthy', userId)}
//     className="bg-red-600 text-white p-2 rounded-lg 
//                hover:bg-red-700 transition-colors duration-300"
//   >
//     Unhealthy
//   </button>
// </div>
//                     <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="validate" className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <div>
//             <h3 className="font-bold text-green-700 mb-4 flex items-center">
//               <CheckCircle className="mr-2 text-green-600" size={24} />
//               Validate Images
//             </h3>
//             {validationData.length === 0 ? (
//               <p className="text-center text-gray-500">No images to validate.</p>
//             ) : (
//               validationData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center space-x-4 p-3 bg-white 
//                              rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4"
//                 >
//                   <img
//                     src={item.cropImageId.imageUrl}
//                     alt={`Image ${index}`}
//                     className="h-24 w-24 object-cover rounded-md"
//                   />
//                   <div className="flex-grow">
//                     <p className="text-lg font-semibold">{item.cropImageId.cropName}</p>
//                     <p className="text-gray-600">Label: {item.label}</p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => upvoteImages(item._id, userId, item.cropImageId._id)}
//                       className="bg-green-600 text-white p-2 rounded-lg 
//                                  hover:bg-green-700 transition-colors duration-300 flex items-center"
//                     >
//                       <ThumbsUp className="mr-1" size={16} /> Upvote
//                     </button>
//                     <button
//                       onClick={() => downvoteImages(item._id, userId, item.cropImageId._id)}
//                       className="bg-red-600 text-white p-2 rounded-lg 
//                                  hover:bg-red-700 transition-colors duration-300 flex items-center"
//                     >
//                       <ThumbsDown className="mr-1" size={16} /> Downvote
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//             <button
//               onClick={getValidationData}
//               className="mt-4 w-full bg-green-600 text-white p-3 rounded-lg 
//                          hover:bg-green-700 transition-colors duration-300 
//                          flex items-center justify-center"
//             >
//               <CheckCircle className="mr-2" size={20} />
//               Load More Images
//             </button>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default ContributePage;



import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { 
  Camera, UploadCloud, Tag, CheckCircle, 
  ThumbsUp, ThumbsDown, RefreshCw, AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.REACT_APP_DATASET_API_BASE_URL || "http://localhost:3001";

function ContributePage() {
  // Comprehensive state management
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cropName, setCropName] = useState('');
  const [datasetLabel, setDatasetLabel] = useState('');
  
  // Labeling and Validation States
  const [labelingQueue, setLabelingQueue] = useState([]);
  const [validationQueue, setValidationQueue] = useState([]);
  
  // UI and Process States
  const [currentTab, setCurrentTab] = useState('upload');
  const [isLoading, setIsLoading] = useState(false);

  // Simulated user ID (replace with actual authentication)
  const userId = "63f5f4b5b02fda9876543210";

  // Fetch Labeling Candidates
  const fetchLabelingCandidates = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/datasetItem/label`);
      setLabelingQueue(response.data);
      console.log(response.data);
      if (response.data.length === 0) {
        toast.info('No images available for labeling');
      } else {
        toast.success(`Found ${response.data.length} images for labeling`);
      }
    } catch (error) {
      toast.error('Failed to fetch labeling candidates');
      console.error('Labeling fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Fetch Validation Candidates
  const fetchValidationCandidates = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/datasetItem/vote`);
      setValidationQueue(response.data);
      console.log(response.data);
      if (!response.data.imageUrl) {
        toast.info('No images available for validation');
      } else {
        toast.success(`Found ${response.data.length} images for validation`);
      }
    } catch (error) {
      toast.error('Failed to fetch validation candidates');
      console.error('Validation fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Image Labeling Handler
  const handleImageLabeling = async (imageId, label) => {
    try {
      console.log(labelingQueue)
      console.log(imageId, label);  

      await axios.post(`${API_BASE_URL}/contribute/label-data`, {
        imageId,
        label,
        userId
      });

      // Remove labeled image from queue
      setLabelingQueue(fetchLabelingCandidates);

      toast.success(`Image labeled as ${label}`);
    } catch (error) {
      toast.error('Labeling failed');
      console.error('Labeling error:', error);
    }
  };

  // Image Validation Handler
  const handleImageValidation = async (imageId, labelId, voteType) => {
    try {
      console.log(imageId, labelId, voteType);  
      if (voteType === 'upvote') {  
      await axios.post(`${API_BASE_URL}/contribute/upvote`, {
        imageId,
        labelId,
        userId,
        voteType
      });
    } else {
      await axios.post(`${API_BASE_URL}/contribute/downvote`, {
        imageId,
        labelId,
        userId,
        voteType
      });
    }
      // Remove validated image from queue
      setValidationQueue(fetchValidationCandidates);

      toast.success(`Image ${voteType}voted successfully`);
    } catch (error) {
      toast.error('Validation failed');
      console.error('Validation error:', error);
    }
  };

  // Image Upload Handler
  const handleImageUpload = async () => {
    setIsLoading(true);
    try {
      const uploadPromises = uploadedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('uploadedBy', userId);
        formData.append('cropName', cropName || 'Unknown');
        formData.append('label', datasetLabel || 'Unspecified');
        
        return axios.post(`${API_BASE_URL}/dataset/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      });

      await Promise.all(uploadPromises);
      toast.success('Images uploaded successfully');
      
      // Reset upload states
      setUploadedFiles([]);
      setCropName('');
      setDatasetLabel('');
    } catch (error) {
      toast.error('Upload failed');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadDataset = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `dataset-${Date.now()}.zip`);
      document.body.appendChild(link);
      link.click();
    link.remove();
    window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('Failed to download dataset');
      console.error('Download error:', error);
    }
  };



  // Dropzone Configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  // Initial Data Fetching
  useEffect(() => {
    if (currentTab === 'label') {
      fetchLabelingCandidates();
    } else if (currentTab === 'validate') {
      fetchValidationCandidates();
    }
  }, [currentTab, fetchLabelingCandidates, fetchValidationCandidates]);

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700 flex items-center">
          <Camera className="mr-3 text-green-600" size={36} />
          Contribute to Dataset
        </h1>
        {isLoading && (
          <RefreshCw className="animate-spin text-green-600" size={24} />
        )}
      </header>

      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        defaultValue="upload"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <UploadCloud className="mr-2" size={20} /> Upload
          </TabsTrigger>
          <TabsTrigger
            value="label"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Tag className="mr-2" size={20} /> Label
          </TabsTrigger>
          <TabsTrigger
            value="validate"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <CheckCircle className="mr-2" size={20} /> Validate
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab Content */}
        <TabsContent
          value="upload"
          className="bg-white p-6 rounded-lg shadow-md border border-green-100"
        >
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Crop Name (e.g., Tomato)"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 transition-all"
              />
              <input
                type="text"
                placeholder="Dataset Label (Optional)"
                value={datasetLabel}
                onChange={(e) => setDatasetLabel(e.target.value)}
                className="w-full p-3 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 transition-all"
              />
            </div>

            <div
              {...getRootProps()}
              className="border-3 border-dashed border-green-300 p-8 text-center 
                         hover:bg-green-50 transition-colors duration-300 
                         rounded-xl cursor-pointer group"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-4">
                <UploadCloud
                  className="text-green-600 group-hover:scale-110 transition-transform"
                  size={48}
                />
                <p className="text-lg text-gray-600">
                  Drag & drop images here, or click to select files
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-green-700 mb-4">
                    Uploaded Files
                  </h2>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative group overflow-hidden rounded-md"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-24 w-full object-cover transition-transform group-hover:scale-110"
                        />
                        <p className="text-xs text-center mt-1 truncate bg-black/50 text-white p-1">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {uploadedFiles.length > 0 && (
              <button
                onClick={handleImageUpload}
                disabled={isLoading}
                className="w-full bg-green-600 text-white p-3 rounded-lg 
                           hover:bg-green-700 transition-colors duration-300 
                           flex items-center justify-center 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UploadCloud className="mr-2" size={20} />
                Upload Images
              </button>
            )}
          </div>
        </TabsContent>

        {/* Labeling Tab Content */}
        <TabsContent value="label" className="space-y-4">
          {!labelingQueue ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-md">
              <AlertCircle className="text-yellow-500" size={48} />
              <p className="text-lg text-gray-600">
                No images available for labeling at the moment.
              </p>
              <button
                onClick={fetchLabelingCandidates}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Refresh Candidates
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {labelingQueue && (
                <div
                  key={labelingQueue?.data?._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={labelingQueue?.data?.imageUrl}
                    alt="Labeling Candidate"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      {labelingQueue?.data?.cropName}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleImageLabeling(
                            labelingQueue?.data?._id,
                            'healthy'
                          )
                        }
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                      >
                        Healthy
                      </button>
                      <button
                        onClick={() =>
                          handleImageLabeling(
                            labelingQueue?.data?._id,
                            'unhealthy'
                          )
                        }
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                      >
                        Unhealthy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Validation Tab Content */}
        <TabsContent value="validate" className="space-y-4">
          {!validationQueue || validationQueue == null ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-md">
              <AlertCircle className="text-yellow-500" size={48} />
              <p className="text-lg text-gray-600">
                No images available for validation at the moment.
              </p>
              <button
                onClick={fetchValidationCandidates}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Refresh Candidates
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {validationQueue && (
                <div
                  key={validationQueue?.data?._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={validationQueue?.data?.imageUrl}
                    alt="Validation Candidate"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      {validationQueue.cropName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Current Label: {validationQueue?.data?.labels[0]?.label}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleImageValidation(
                            validationQueue?.data?._id,
                            validationQueue?.data?.labels[0]._id,
                            'upvote'
                          )
                        }
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
                      >
                        <ThumbsUp className="mr-2" size={16} /> Confirm
                      </button>
                      <button
                        onClick={() =>
                          handleImageValidation(
                            validationQueue?.data?._id,
                            validationQueue?.data?.labels[0]._id,
                            'downvote'
                          )
                        }
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
                      >
                        <ThumbsDown className="mr-2" size={16} /> Reject
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={downloadDataset}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                  >
                    Download Dataset
                  </button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ContributePage;